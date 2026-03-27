/**
 * Scene3D.jsx
 *
 * RING_X / RING_Y imported from PortfolioModel so they are
 * always in sync — no more "model at X=2.5, ring at X=2.4" drift.
 *
 * LIGHT SETUP  (model hero centre ≈ world [2.4, −0.30, 0])
 *   Key:   front-left-above  → warm white, casts shadow
 *   Fill:  front-right       → cool blue, no shadow
 *   Rim:   behind model      → #06C167 to separate silhouette
 *   Glow:  platform up-light → green bouncing off feet/legs
 */

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import PortfolioModel, { RING_X, RING_Y } from './PortfolioModel';
import './Scene3D.css';

// ── Holographic Platform ──────────────────────────────────────────────────────
const HoloPlatform = ({ scrollOffset }) => {
    const outerRef = useRef(null);
    const midRef = useRef(null);
    const innerRef = useRef(null);
    const discRef = useRef(null);
    const smoothScroll = useRef(0);

    useFrame(() => {
        smoothScroll.current = THREE.MathUtils.lerp(
            smoothScroll.current, scrollOffset, 0.055
        );
        // Fade in sync with model's scroll-out
        const vis = THREE.MathUtils.clamp(
            1 - (smoothScroll.current - 0.22) / 0.22, 0, 1
        );

        if (outerRef.current) {
            outerRef.current.material.opacity = 0.75 * vis;
            outerRef.current.rotation.y += 0.007;
        }
        if (midRef.current) {
            midRef.current.material.opacity = 0.40 * vis;
            midRef.current.rotation.y -= 0.004;
        }
        if (innerRef.current) innerRef.current.material.opacity = 0.24 * vis;
        if (discRef.current) discRef.current.material.opacity = 0.13 * vis;
    });

    return (
        <group position={[RING_X, RING_Y, 0]}>
            {/* Outer ring */}
            <mesh ref={outerRef} rotation-x={-Math.PI / 2}>
                <ringGeometry args={[1.55, 1.72, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.75} side={THREE.DoubleSide} />
            </mesh>
            {/* Mid ring */}
            <mesh ref={midRef} rotation-x={-Math.PI / 2} position-y={0.012}>
                <ringGeometry args={[1.00, 1.10, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.40} side={THREE.DoubleSide} />
            </mesh>
            {/* Inner ring */}
            <mesh ref={innerRef} rotation-x={-Math.PI / 2} position-y={0.024}>
                <ringGeometry args={[0.48, 0.54, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.24} side={THREE.DoubleSide} />
            </mesh>
            {/* Disc fill */}
            <mesh ref={discRef} rotation-x={-Math.PI / 2} position-y={-0.02}>
                <circleGeometry args={[1.72, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.13} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

// ── Loader ────────────────────────────────────────────────────────────────────
const Loader = () => (
    <Html center>
        <div className="scene3d-loader">
            <div className="scene3d-loader-ring" />
        </div>
    </Html>
);

// ── Scene ─────────────────────────────────────────────────────────────────────
const Scene3D = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const raw = el.scrollTop / (el.scrollHeight - el.clientHeight);
            setScrollOffset(Number.isFinite(raw) ? raw : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="scene-3d-container">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.35,
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={50} />

                <Suspense fallback={<Loader />}>
                    {/* ── Ambient fill ── */}
                    <ambientLight intensity={1.8} color="#ffffff" />
                    <hemisphereLight intensity={0.9} color="#d8e8ff" groundColor="#06C167" />

                    {/*
                     * KEY LIGHT — front-left-above
                     * Model hero centre ≈ [2.4, −0.30, 0].
                     * Position [-0.5, 6, 8] casts a flattering top-left rim.
                     */}
                    <directionalLight
                        position={[-0.5, 6, 8]}
                        intensity={5.5}
                        color="#fff8ec"
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    {/* FILL — front-right, softer and cooler */}
                    <directionalLight
                        position={[6, 3, 5]}
                        intensity={2.5}
                        color="#c8ddff"
                    />

                    {/* RIM — behind model, green for silhouette separation */}
                    <directionalLight
                        position={[RING_X, 0, -8]}
                        intensity={2.2}
                        color="#06C167"
                    />

                    {/*
                     * PLATFORM UP-GLOW
                     * Positioned just above the ring, bounces green light
                     * upward onto the model's lower body.
                     */}
                    <pointLight
                        position={[RING_X, RING_Y + 0.9, 2.5]}
                        intensity={70}
                        color="#06C167"
                        distance={9}
                        decay={2}
                    />
                    <pointLight
                        position={[RING_X - 1.0, RING_Y + 1.0, 1]}
                        intensity={40}
                        color="#06C167"
                        distance={7}
                        decay={2}
                    />

                    {/* Overhead white for head / shoulders */}
                    <pointLight
                        position={[RING_X, 4.5, 4]}
                        intensity={50}
                        color="#ffffff"
                        distance={14}
                        decay={2}
                    />

                    <Environment preset="city" environmentIntensity={1.4} />

                    <PortfolioModel scrollOffset={scrollOffset} />
                    <HoloPlatform scrollOffset={scrollOffset} />
                </Suspense>

                <EffectComposer>
                    <Bloom
                        intensity={0.85}
                        luminanceThreshold={0.45}
                        luminanceSmoothing={0.85}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Scene3D;