import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

function EarthSphere() {
    const earthRef = useRef();

    // Rotasi otomatis
    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
}

export default function Earth() {
    return (
        <div className="w-full h-96 bg-black rounded-xl shadow-lg">
            <Canvas camera={{ position: [0, 0, 5] }}>
                {/* Cahaya */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                {/* Objek Bumi */}
                <EarthSphere />

                {/* Bintang-bintang */}
                <Stars radius={300} depth={60} count={20000} factor={7} fade />

                {/* Kontrol */}
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}
