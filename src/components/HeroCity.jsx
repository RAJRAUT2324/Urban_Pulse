import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Note: THREE.Clock is deprecated in v183+, ideally use THREE.Timer or delta from useFrame
import { Instances, Instance } from '@react-three/drei';



const GridCity = () => {
    const count = 100;
    const grid = 10;
    const range = 20;

    const buildings = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (i % grid - grid / 2) * (range / grid) + (Math.random() - 0.5) * 2;
            const z = (Math.floor(i / grid) - grid / 2) * (range / grid) + (Math.random() - 0.5) * 2;
            const h = 1 + Math.random() * 5;
            temp.push({ position: [x, h / 2, z], scale: [0.8, h, 0.8], speed: 0.2 + Math.random() });
        }
        return temp;
    }, []);

    return (
        <group>
            <Instances range={count}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.8} />
                {buildings.map((data, i) => (
                    <Building key={i} {...data} />
                ))}
            </Instances>
            <NeuralLines buildings={buildings} />
        </group>
    );
};

const Building = ({ position, scale, speed }) => {
    const ref = useRef();
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;
        if (ref.current) {
            ref.current.scale.y = scale[1] * (1 + Math.sin(t * speed) * 0.1);
            ref.current.position.y = (scale[1] * (1 + Math.sin(t * speed) * 0.1)) / 2;
        }
    });
    return <Instance ref={ref} position={position} scale={scale} />;
};

const NeuralLines = ({ buildings }) => {
    const linesCount = 20;
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < linesCount; i++) {
            const b1 = buildings[Math.floor(Math.random() * buildings.length)];
            const b2 = buildings[Math.floor(Math.random() * buildings.length)];
            temp.push({
                points: [
                    new THREE.Vector3(b1.position[0], b1.scale[1], b1.position[2]),
                    new THREE.Vector3(b2.position[0], b2.scale[1], b2.position[2])
                ]
            });
        }
        return temp;
    }, [buildings]);

    const lineRefs = useRef([]);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;
        lineRefs.current.forEach((ref, i) => {
            if (ref) {
                ref.material.opacity = 0.2 + Math.sin(t * 2 + i) * 0.2;
            }
        });
    });

    return (
        <group>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    ref={(el) => (lineRefs.current[i] = el)}
                    points={line.points}
                    color="#22c55e"
                    lineWidth={1}
                    transparent
                    opacity={0.3}
                />
            ))}
        </group>
    );
};

// Custom Line component using THREE.Line
const Line = React.forwardRef(({ points, color, opacity, ...props }, ref) => {
    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
    return (
        <line ref={ref} geometry={geometry} {...props}>
            <lineBasicMaterial attach="material" color={color} transparent opacity={opacity} />
        </line>
    );
});

export default function HeroCity() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#22c55e" />
            <GridCity />
            <gridHelper args={[100, 50, "#22c55e", "#020617"]} position={[0, -0.1, 0]} opacity={0.1} transparent />
        </>
    );
}
