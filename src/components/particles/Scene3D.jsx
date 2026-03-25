/**
 * Scene3D.jsx — ring already works correctly at RING_X=2.5
 * Only PortfolioModel needed fixing.
 */

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import PortfolioModel from './PortfolioModel';
import './Scene3D.css';

// Must match HERO_X in PortfolioModel.jsx
const RING_X = 2.5;
const RING_Y = -2.05;

// ── Holographic Platform ───────────────────────────────────────────────────────
const HoloPlatform = ({ scrollOffset }) => {
    const outerRef = useRef(null);
    const midRef = useRef(null);
    const innerRef = useRef(null);
    const discRef = useRef(null);
    const smoothScroll = useRef(0);

    useFrame(() => {
        smoothScroll.current = THREE.MathUtils.lerp(smoothScroll.current, scrollOffset, 0.055);
        const vis = THREE.MathUtils.clamp(1 - (smoothScroll.current - 0.28) / 0.18, 0, 1);

        if (outerRef.current) { outerRef.current.material.opacity = 0.72 * vis; outerRef.current.rotation.y += 0.007; }
        if (midRef.current) { midRef.current.material.opacity = 0.38 * vis; midRef.current.rotation.y -= 0.004; }
        if (innerRef.current) { innerRef.current.material.opacity = 0.22 * vis; }
        if (discRef.current) { discRef.current.material.opacity = 0.12 * vis; }
    });

    return (
        <group position={[RING_X, RING_Y, 0]}>
            <mesh ref={outerRef} rotation-x={-Math.PI / 2}>
                <ringGeometry args={[1.55, 1.72, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.72} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={midRef} rotation-x={-Math.PI / 2} position-y={0.012}>
                <ringGeometry args={[1.00, 1.10, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.38} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={innerRef} rotation-x={-Math.PI / 2} position-y={0.024}>
                <ringGeometry args={[0.48, 0.54, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.22} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={discRef} rotation-x={-Math.PI / 2} position-y={-0.02}>
                <circleGeometry args={[1.72, 80]} />
                <meshBasicMaterial color="#06C167" transparent opacity={0.12} side={THREE.DoubleSide} />
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
                    antialias: true, alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={50} />
                <fog attach="fog" args={['#000000', 9, 22]} />

                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={1.2} color="#ffffff" />
                    <hemisphereLight intensity={0.8} color="#c8d8ff" groundColor="#06C167" />
                    <directionalLight position={[10, 20, 10]} intensity={4.5} color="#fff4df" castShadow shadow-mapSize={[2048, 2048]} />
                    <directionalLight position={[-10, 10, -5]} intensity={2.0} color="#aabfff" />
                    <pointLight position={[RING_X, RING_Y - 1, -4]} intensity={120} color="#06C167" distance={14} decay={2} />
                    <pointLight position={[RING_X, RING_Y, 3]} intensity={80} color="#06C167" distance={10} decay={2} />
                    <pointLight position={[0, 10, 5]} intensity={50} color="#ffffff" distance={20} decay={2} />
                    <Environment preset="city" environmentIntensity={1.2} />

                    <PortfolioModel scrollOffset={scrollOffset} />
                    <HoloPlatform scrollOffset={scrollOffset} />
                </Suspense>

                <EffectComposer>
                    <Bloom intensity={0.75} luminanceThreshold={0.55} luminanceSmoothing={0.85} mipmapBlur />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Scene3D;