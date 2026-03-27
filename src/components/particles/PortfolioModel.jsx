/**
 * PortfolioModel.jsx
 *
 * ═══════════════════════════════════════════════════════════════
 * THE ROOT CAUSE OF ALL PLACEMENT BUGS:
 *
 * GLB files bake the scene-root transform into the file. So if
 * the artist positioned the character at [−2.3, 0.8, 0] in their
 * DCC tool and exported, that offset is hardcoded in the GLB.
 * Setting group.position.set(2.5, −0.15, 0) moves the GROUP,
 * but the model is still shifted by its baked offset inside it.
 *
 * FIX → NORMALIZE THE MODEL after cloning:
 *   1. Compute the tight bounding box of all meshes.
 *   2. Translate the root object so feet land at localY = 0
 *      and the mesh horizontally centres at localX = 0.
 *   3. Now our group transforms are predictable: group.position
 *      IS exactly where the model's feet appear in world space.
 * ═══════════════════════════════════════════════════════════════
 *
 * COORDINATE MATHS  (camera z=6, fov=50, camera y=0.5)
 *   halfH  = tan(25°) × 6         = 2.80
 *   halfW  = 2.80 × (16/9)        = 4.97
 *   World Y visible: −2.30 → +3.30
 *   World X visible: −4.97 → +4.97
 *
 * HERO layout  (RING_X=2.4, RING_Y=−1.25)
 *   group.y = RING_Y  →  feet world Y = −1.25  (screen 82 % from top ✓)
 *   head  world Y = −1.25 + height×scale ≈ +0.90  (screen 43 % ✓)
 *   group.x = RING_X  →  centred on ring ✓
 *
 * ABOUT layout
 *   Slides to right-column lower area as user scrolls into About.
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/megumi_fushiguro.glb';

// ─── Shared constants (also imported by Scene3D) ──────────────────────────────
export const RING_X = 2.4;   // right-column world X
export const RING_Y = -1.25;  // platform plane world Y (ring sits here)

// Hero pose  — feet ON the ring
const HERO_SCALE = 1.15;
const HERO_X = RING_X;
const HERO_Y = RING_Y;    // after normalisation, group.y == feet world Y

// About pose  — lower-right, "below stats"
const ABOUT_SCALE = 0.88;
const ABOUT_X = 2.1;
const ABOUT_Y = RING_Y - 0.15;   // just slightly lower than hero

// ─── Scroll-driven transition ─────────────────────────────────────────────────
const T_START = 0.14;   // start moving as hero begins to exit
const T_RANGE = 0.34;   // finish at scroll ≈ 0.48  (about section mid-view)

const FADE_START = 0.60;
const FADE_RANGE = 0.20;

// ─── Cubic ease-in-out ────────────────────────────────────────────────────────
const easeInOut = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─────────────────────────────────────────────────────────────────────────────
const PortfolioModel = ({ scrollOffset }) => {
    const group = useRef(null);
    const { scene } = useGLTF(MODEL_URL);
    const { mouse } = useThree();
    const smoothScroll = useRef(0);
    const initialized = useRef(false);

    const tPos = useMemo(() => new THREE.Vector3(), []);
    const tScale = useMemo(() => new THREE.Vector3(), []);

    // ── Clone + NORMALISE the GLB ─────────────────────────────────────────────
    // This is what makes positioning reliable regardless of baked transforms.
    const model = useMemo(() => {
        const clone = scene.clone(true);

        // Reset any baked root transform first
        clone.position.set(0, 0, 0);
        clone.rotation.set(0, 0, 0);
        clone.scale.set(1, 1, 1);
        clone.updateMatrixWorld(true);

        // Measure the actual mesh bounding box in world space
        const box = new THREE.Box3().setFromObject(clone);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Shift so:
        //   • bottom of mesh  (box.min.y) lands at localY = 0
        //   • mesh horizontally centred  at localX = 0, localZ = 0
        clone.position.set(
            -center.x,        // centre X
            -box.min.y,       // feet at Y=0
            -center.z         // centre Z
        );
        clone.updateMatrixWorld(true);

        // Log so you can verify in the console
        const box2 = new THREE.Box3().setFromObject(clone);
        const size = new THREE.Vector3();
        box2.getSize(size);
        console.log(
            '[PortfolioModel] Normalised bounds:',
            '\n  min:', box2.min.toArray().map(v => v.toFixed(3)),
            '\n  max:', box2.max.toArray().map(v => v.toFixed(3)),
            '\n  size:', size.toArray().map(v => v.toFixed(3))
        );

        return clone;
    }, [scene]);

    // ── Material upgrade ──────────────────────────────────────────────────────
    useEffect(() => {
        model.traverse((node) => {
            if (!node.isMesh) return;
            node.castShadow = true;
            node.receiveShadow = true;

            const old = node.material;
            if (!old) return;

            if (old.isMeshBasicMaterial || !old.isMeshStandardMaterial) {
                node.material = new THREE.MeshStandardMaterial({
                    color: old.color ?? new THREE.Color(0x1c1c1c),
                    map: old.map ?? null,
                    roughness: 0.55,
                    metalness: 0.20,
                    envMapIntensity: 2.5,
                    emissive: new THREE.Color('#06C167'),
                    emissiveIntensity: 0.05,
                });
            } else {
                node.material = node.material.clone();
                node.material.roughness = Math.min(node.material.roughness, 0.65);
                node.material.metalness = Math.max(node.material.metalness, 0.15);
                node.material.envMapIntensity = 2.5;
                node.material.emissive = new THREE.Color('#06C167');
                node.material.emissiveIntensity = 0.05;
                node.material.needsUpdate = true;
            }
        });
    }, [model]);

    // ── Per-frame loop ────────────────────────────────────────────────────────
    useFrame(() => {
        if (!group.current) return;

        // ── Frame 1: SNAP to hero position (avoids lerp-from-origin glitch) ──
        if (!initialized.current) {
            group.current.position.set(HERO_X, HERO_Y, 0);
            group.current.scale.setScalar(HERO_SCALE);
            group.current.rotation.set(0, Math.PI, 0);
            initialized.current = true;
            return;
        }

        // ── Smooth scroll ─────────────────────────────────────────────────────
        smoothScroll.current = THREE.MathUtils.lerp(
            smoothScroll.current, scrollOffset, 0.055
        );
        const s = smoothScroll.current;
        const t = easeInOut(THREE.MathUtils.clamp((s - T_START) / T_RANGE, 0, 1));

        // ── Position ─────────────────────────────────────────────────────────
        tPos.set(
            THREE.MathUtils.lerp(HERO_X, ABOUT_X, t),
            THREE.MathUtils.lerp(HERO_Y, ABOUT_Y, t),
            THREE.MathUtils.lerp(0, -0.25, t)
        );
        group.current.position.lerp(tPos, 0.065);

        // ── Scale + visibility ────────────────────────────────────────────────
        const vis = THREE.MathUtils.clamp(1 - (s - FADE_START) / FADE_RANGE, 0, 1);
        const scale = THREE.MathUtils.lerp(HERO_SCALE, ABOUT_SCALE, t) * vis;
        tScale.setScalar(scale);
        group.current.scale.lerp(tScale, 0.065);

        // ── Rotation: face forward + mouse parallax ───────────────────────────
        const targetRY = Math.PI
            + mouse.x * 0.12
            + THREE.MathUtils.lerp(0, -0.30, t);
        const targetRX = -mouse.y * 0.07;

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRX, 0.07);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRY, 0.07);
    });

    return (
        <group ref={group}>
            <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.20}>
                <primitive object={model} dispose={null} />
            </Float>
        </group>
    );
};

useGLTF.preload(MODEL_URL);
export default PortfolioModel;