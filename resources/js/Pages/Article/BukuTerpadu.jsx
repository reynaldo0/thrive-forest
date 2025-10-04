// src/pages/BukuTerpadu.jsx
import { Experience } from "@/Components/Models/Experience";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";

function Loader() {
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 border-4 border-t-transparent border-secondary-300 rounded-full animate-spin mb-4"></div>
                <span className="text-sm text-primary-200 animate-pulse">
                    Loading
                </span>
            </div>
        </Html>
    );
}

export default function BukuTerpadu() {
    const [offsetX, setOffsetX] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollPassed = windowHeight - rect.top;
            setOffsetX(scrollPassed > 0 ? scrollPassed * 0.2 : 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const canvasSize = useMemo(() => {
        if (windowWidth < 640) {
            return { width: "100%", height: "40vh", posX: -0.1 };
        } else if (windowWidth < 1024) {
            return { width: "100%", height: "50vh", posX: -0.05 };
        } else {
            return { width: "800px", height: "500px", posX: 0 };
        }
    }, [windowWidth]);

    return (
        <>
            <section
                ref={sectionRef}
                className="w-full min-h-[120vh] bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col items-center justify-start gap-12 py-12 relative overflow-visible px-6"
            >
                {/* Background */}
                <div className="absolute inset-0">
                {/* Gambar background */}
                <div
                    className="absolute inset-0 bg-[url('/background/heroartikel.png')] bg-cover bg-center blur-sm"
                    style={{ backgroundAttachment: "fixed" }}
                />
                {/* Overlay hitam transparan */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                </div>

                {/* 3D Object */}
                <div className="flex-1 flex justify-center relative w-full">
                    <div
                        className="relative w-full flex justify-center"
                        style={{ maxWidth: canvasSize.width }}
                    >
                        <Canvas
                            shadows={false}
                            camera={{ position: [0, 1, 3], fov: 45 }}
                            style={{ height: canvasSize.height }}
                            dpr={[1, 1.5]}
                        >
                            <Suspense fallback={<Loader />}>
                                <group position={[canvasSize.posX, 0, 0]}>
                                    <Experience />
                                </group>
                            </Suspense>
                        </Canvas>
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="relative w-full max-w-5xl bg-white shadow-xl rounded-2xl p-12 border border-[#D8EBC5] z-10 text-center -top-12">
                    <h3 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3B3B0E] text-white px-10 py-3 rounded-full text-2xl font-bold shadow-md">
                        Nutibook
                    </h3>
                    <p className="mt-10 text-[#3B3B0E] text-lg md:text-xl leading-relaxed">
                        Nutibook adalah sebuah buku mengenai produk produk dari tanaman yang menjelaskan
                        khasiatnya, nilai gizi, dan lainnya sebagai wadah untuk literasi semua pihak.
                    </p>
                </div>
            </section>

            {/* Rumput Parallax di bawah section */}
            <div className="relative w-full h-[40px] overflow-visible pointer-events-none">
                <div className="absolute bottom-0 w-full flex justify-between px-0">
                    <img
                        src="/icon/rumput-kiri.png"
                        alt="rumput kiri"
                        className="w-1/3 object-contain"
                        style={{ transform: `translateX(-${offsetX}px)` }}
                    />
                    <img
                        src="/icon/rumput-kanan.png"
                        alt="rumput kanan"
                        className="w-1/3 object-contain"
                        style={{ transform: `translateX(${offsetX}px)` }}
                    />
                </div>
            </div>
        </>
    );
}
