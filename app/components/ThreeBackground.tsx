"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

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
                <meshBasicMaterial color="#ffd700" wireframe wireframeLinewidth={1} transparent opacity={0.1} />
            </Icosahedron>
        </Float>
    );
}

function Particles() {
    const count = 50;
    return (
        <group>
            {Array.from({ length: count }).map((_, i) => (
                <Float key={i} speed={1 + Math.random()} floatIntensity={2} position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5
                ]}>
                    <mesh>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#1c39bb" : "#ffd700"} />
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
