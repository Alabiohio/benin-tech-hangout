"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const particlePositions: Array<{ speed: number; position: [number, number, number] }> = [
    { speed: 1.1, position: [-4.2, -3.1, 0.5] },
    { speed: 1.3, position: [-3.5, 2.4, -0.8] },
    { speed: 1.5, position: [-2.7, 0.8, 1.2] },
    { speed: 1.2, position: [-1.9, -1.6, -0.6] },
    { speed: 1.4, position: [-1.1, 3.2, 0.4] },
    { speed: 1.6, position: [-0.4, -2.8, 1.6] },
    { speed: 1.2, position: [0.3, 1.2, -1.2] },
    { speed: 1.4, position: [1.2, -0.6, 0.9] },
    { speed: 1.3, position: [2.1, 2.7, -0.3] },
    { speed: 1.5, position: [3.4, -2.2, 1.1] },
    { speed: 1.2, position: [4.0, 0.5, -0.9] },
    { speed: 1.6, position: [4.4, 3.1, 0.2] },
];

function TechShape() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Icosahedron args={[1, 1]} ref={meshRef}>
                <meshBasicMaterial color="#1c39bb" wireframe wireframeLinewidth={2} transparent opacity={0.3} />
            </Icosahedron>
            <Icosahedron args={[1, 1]} scale={0.9}>
      <meshBasicMaterial color="#b91c1c" wireframe wireframeLinewidth={1} transparent opacity={0.1} />
            </Icosahedron>
        </Float>
    );
}

function Particles() {
    return (
        <group>
            {particlePositions.map((particle, i) => (
                <Float key={i} speed={particle.speed} floatIntensity={2} position={particle.position}>
                    <mesh>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#1c39bb" : "#b91c1c"} />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <fog attach="fog" args={["white", 5, 15]} />
                <ambientLight intensity={0.5} />
                <TechShape />
                <Particles />
                <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
