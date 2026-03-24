import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, Float } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb';

const PortfolioModel = ({ scrollOffset }) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(MODEL_URL);
    const { actions } = useAnimations(animations, group);
    const { viewport, mouse } = useThree();

    // Smoothly interpolate the scroll offset
    const smoothedScroll = useRef(0);
    const targetPosition = useMemo(() => new THREE.Vector3(), []);
    const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

    // Play Idle animation on mount
    useEffect(() => {
        if (actions['Idle']) {
            actions['Idle'].fadeIn(0.5).play();
        }
        return () => {
            if (actions['Idle']) actions['Idle'].fadeOut(0.5);
        };
    }, [actions]);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Smoothly interpolate the scroll offset
        smoothedScroll.current = THREE.MathUtils.lerp(smoothedScroll.current, scrollOffset, 0.1);
        
        // ── HERO -> ABOUT TRANSITION ──
        // Transition completes by 20% scroll
        const t = Math.min(smoothedScroll.current / 0.2, 1);
        
        // INTERPOLATION PATH:
        // Hero (t=0): Center-Right, Standing
        // About (t=1): Center-Right (below stats), Smaller
        
        const posX = THREE.MathUtils.lerp(viewport.width * 0.28, viewport.width * 0.2, t);
        const posY = THREE.MathUtils.lerp(-1.2, -viewport.height * 0.25, t);
        const posZ = THREE.MathUtils.lerp(0, -1, t);
        
        targetPosition.set(posX, posY, posZ);
        group.current.position.lerp(targetPosition, 0.1);

        // Visibility/Scale factor: 1.0 until 0.3 scroll, then fade to 0 by 0.4
        const visibility = smoothedScroll.current < 0.3 
            ? 1 
            : Math.max(0, 1 - (smoothedScroll.current - 0.3) * 10);

        const s = THREE.MathUtils.lerp(0.65, 0.45, t) * visibility;
        targetScale.set(s, s, s);
        group.current.scale.lerp(targetScale, 0.1);

        // ── MOUSE FOLLOW (Subtle body tilt) ──
        const mouseX = (mouse.x * viewport.width) / 20;
        const mouseY = (mouse.y * viewport.height) / 20;

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouseY * 0.2, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX + (t * -0.5) - 0.3, 0.1);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group ref={group} dispose={null}>
                <primitive object={nodes.Scene} />
            </group>
        </Float>
    );
};

// Pre-load the model to avoid pop-in as much as possible
useGLTF.preload(MODEL_URL);

export default PortfolioModel;
