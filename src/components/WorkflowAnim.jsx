import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, MeshWobbleMaterial } from '@react-three/drei';

export default function WorkflowAnim() {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(t / 2) / 4;
            meshRef.current.rotation.y = Math.cos(t / 3) / 4;
        }
    });

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#22c55e" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.1}
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={2}
                    />
                </mesh>

                {/* Glow effect */}
                <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[3.2, 2.2]} />
                    <meshBasicMaterial color="#22c55e" transparent opacity={0.1} />
                </mesh>
            </Float>
        </group>
    );
}
