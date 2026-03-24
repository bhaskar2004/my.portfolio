import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, SpotLight, ContactShadows } from '@react-three/drei';
import PortfolioModel from './PortfolioModel';
import './Scene3D.css';

const Scene3D = () => {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
            setScrollOffset(percent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scene-3d-container">
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <Environment preset="city" />
                    
                    <SpotLight
                        position={[10, 15, 10]}
                        angle={0.2}
                        penumbra={1}
                        intensity={400} // Three.js intensities are high in recent versions
                        castShadow
                    />
                    
                    <PortfolioModel scrollOffset={scrollOffset} />
                    
                    <ContactShadows 
                        position={[0, -2, 0]} 
                        opacity={0.3} 
                        scale={15} 
                        blur={2.5} 
                        far={5} 
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene3D;
