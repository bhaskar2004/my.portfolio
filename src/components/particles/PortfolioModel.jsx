import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const PortfolioModel = ({ scrollOffset }) => {
    const meshRef = useRef();
    const { viewport, mouse } = useThree();

    // Use smooth lerping for the scroll value to avoid jitters
    const smoothedScroll = useRef(0);
    const targetPosition = useMemo(() => new THREE.Vector3(), []);
    const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Smoothly interpolate the scroll offset
        smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollOffset, 0.1);
        
        // ── HERO -> ABOUT TRANSITION ──
        // We assume 'About' is roughly the first 25% of the page
        // Transition completes by 20% scroll
        const t = Math.min(smoothedScroll.current / 0.2, 1);
        
        // INTERPOLATION PATH:
        // Hero (t=0): Center-Right, Large
        // About (t=1): Center-Left, Medium, Tilted
        
        const posX = THREE.MathUtils.lerp(viewport.width * 0.3, viewport.width * 0.2, t);
        const posY = THREE.MathUtils.lerp(0, -viewport.height * 0.35, t);
        const posZ = THREE.MathUtils.lerp(0, -1, t);
        
        targetPosition.set(posX, posY, posZ);
        meshRef.current.position.lerp(targetPosition, 0.1);

        // Visibility/Scale factor: 1.0 until 0.4 scroll, then fade to 0 by 0.5
        const visibility = smoothedScroll.current < 0.4 
            ? 1 
            : Math.max(0, 1 - (smoothedScroll.current - 0.4) * 10);

        const s = THREE.MathUtils.lerp(1.2, 0.8, t) * visibility;
        targetScale.set(s, s, s);
        meshRef.current.scale.lerp(targetScale, 0.1);

        // ── MOUSE FOLLOW ──
        const mouseX = (mouse.x * viewport.width) / 15;
        const mouseY = (mouse.y * viewport.height) / 15;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY + (t * 0.5), 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX + (state.clock.elapsedTime * 0.2), 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 128, 128]} />
                <MeshDistortMaterial
                    color="#06C167"
                    speed={3}
                    distort={0.45}
                    radius={1}
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

export default PortfolioModel;
