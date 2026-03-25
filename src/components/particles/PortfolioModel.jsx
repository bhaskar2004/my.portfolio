/**
 * PortfolioModel.jsx
 *
 * GLB: centred X/Z, feet Y=-1.0, head Y=1.944, no animations.
 * Camera: z=6, fov=50 → halfW≈4.97 (16:9)
 *
 * Key fix: useEffect sets position/scale/rotation imperatively after mount.
 * JSX position props do NOT reliably initialise before the first useFrame call
 * in R3F, causing the "snap to centre then lerp right" bug seen in all
 * previous versions. useEffect fires after the component tree is committed
 * and group.current is guaranteed non-null.
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/megumi_fushiguro.glb';

const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ── Absolute world coordinates (camera z=6, fov=50°) ─────────────────────────
//   halfW ≈ 4.97  so X=2.5 ≈ right 75% of screen
//   HERO_Y = RING_PLANE(-2.05) + FEET_OFFSET(1.0)*SCALE(1.15) = -0.90
const HERO_X = 2.5;
const HERO_Y = -0.90;
const HERO_SCALE = 1.15;

const ABOUT_X = 0.9;
const ABOUT_Y = -1.60;
const ABOUT_SCALE = 0.95;

const PortfolioModel = ({ scrollOffset }) => {
    const group = useRef(null);
    const { scene } = useGLTF(MODEL_URL);
    const { mouse } = useThree();
    const smoothScroll = useRef(0);
    const tPos = useMemo(() => new THREE.Vector3(HERO_X, HERO_Y, 0), []);
    const tScale = useMemo(() => new THREE.Vector3(HERO_SCALE, HERO_SCALE, HERO_SCALE), []);
    const model = useMemo(() => scene.clone(true), [scene]);

    // ── Imperatively initialise position AFTER mount ──────────────────────────
    // This is the only reliable way — JSX position/scale/rotation props are
    // overwritten by R3F's reconciler before the first useFrame in some versions.
    useEffect(() => {
        if (!group.current) return;
        group.current.position.set(HERO_X, HERO_Y, 0);
        group.current.scale.setScalar(HERO_SCALE);
        group.current.rotation.set(0, Math.PI, 0);

        // Fix materials to be receptive to lights and envMap
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                if (node.material) {
                    node.material.envMapIntensity = 1.0;
                    node.material.needsUpdate = true;
                    // If it's pure black, standard materials might need a boost or check for emissive
                }
            }
        });
    }, [model]); // empty deps → runs once after first render

    useFrame(() => {
        if (!group.current) return;

        // Smooth scroll → t
        smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, scrollOffset, 0.055);
        const t = ease(THREE.MathUtils.clamp(smoothScroll.current / 0.25, 0, 1));

        // Target position
        tPos.set(
            THREE.MathUtils.lerp(HERO_X, ABOUT_X, t),
            THREE.MathUtils.lerp(HERO_Y, ABOUT_Y, t),
            THREE.MathUtils.lerp(0, -0.4, t)
        );
        group.current.position.lerp(tPos, 0.07);

        // Scale + fade past About
        const vis = THREE.MathUtils.clamp(1 - (smoothScroll.current - 0.70) / 0.20, 0, 1);
        const s = THREE.MathUtils.lerp(HERO_SCALE, ABOUT_SCALE, t) * vis;
        tScale.setScalar(s);
        group.current.scale.lerp(tScale, 0.07);

        // Rotation: face camera + mouse parallax + lean inward
        const ry = Math.PI + mouse.x * 0.10 + THREE.MathUtils.lerp(0, -0.30, t);
        const rx = -mouse.y * 0.07;
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rx, 0.07);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, ry, 0.07);
    });

    return (
        <group ref={group}>
            <Float speed={1.4} rotationIntensity={0.03} floatIntensity={0.18}>
                <primitive object={model} dispose={null} />
            </Float>
        </group>
    );
};

useGLTF.preload(MODEL_URL);
export default PortfolioModel;