import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function EarthModel({ url }) {
    const { scene } = useGLTF(url);
    const earthRef = useRef();

    // Rotasi otomatis
    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <primitive
            ref={earthRef}
            object={scene}
            scale={12}
            position={[0, 0, 0]}
        />
    );
}

export default function Earth() {
    return (
        <div className="w-full h-96 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <Suspense fallback={null}>
                    <EarthModel url="/models/earth.glb" />
                </Suspense>

                <Stars radius={300} depth={60} count={20000} factor={7} fade />
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}
