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
    const sectionRef = useRef(null);
    const animationRef = useRef(null);
    const currentXRef = useRef(0);
    const [offsetX, setOffsetX] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;

            const isMobile = window.innerWidth < 768;
            const parallaxFactor = isMobile ? 300 : 600;
            const targetX = scrollRatio * parallaxFactor;

            const animate = () => {
                currentXRef.current += (targetX - currentXRef.current) * 0.25;
                setOffsetX(currentXRef.current);

                if (Math.abs(targetX - currentXRef.current) > 0.5) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            };

            cancelAnimationFrame(animationRef.current);
            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationRef.current);
        };
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
        if (windowWidth < 640)
            return { width: "100%", height: "50vh", posX: -0.1 };
        if (windowWidth < 1024)
            return { width: "100%", height: "45vh", posX: -0.05 };
        return { width: "900px", height: "550px", posX: 0 };
    }, [windowWidth]);

    return (
        <>
            <section
                ref={sectionRef}
                className="w-full min-h-[100vh] bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col items-center justify-start gap-4 py-12 relative overflow-visible px-4 md:px-16"
            >
                {/* Background blur layer */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[url('/background/heroartikel.png')] bg-cover bg-center blur-sm"
                        style={{ backgroundAttachment: "fixed" }}
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                </div>

                {/* 3D Canvas Section */}
                <div className="flex justify-center relative w-full mb-6 md:mb-8">
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

                {/* Nutibook Card */}
                <div className="relative w-full max-w-6xl bg-white shadow-xl rounded-2xl p-10 md:p-14 border border-[#D8EBC5] z-10 text-center mt-4 md:mt-8">
                    <h3 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3B3B0E] text-white px-10 py-3 rounded-full text-2xl font-bold shadow-md">
                        Nutibook
                    </h3>
                    <p className="mt-6 text-[#3B3B0E] text-xl md:text-2xl leading-relaxed md:leading-loose">
                        Nutibook adalah sebuah buku mengenai produk-produk dari
                        tanaman yang menjelaskan{" "}
                        <span className="text-green-700 font-semibold">
                            khasiatnya
                        </span>
                        ,{" "}
                        <span className="text-green-700 font-semibold">
                            nilai gizi
                        </span>
                        , dan lainnya sebagai wadah untuk literasi semua pihak.
                    </p>
                </div>
            </section>

            {/* Parallax Grass Decoration */}
            <div className="relative w-full overflow-visible pointer-events-none">
                <img
                    src="/icon/rumput-kiri.png"
                    alt="rumput kiri"
                    className="absolute bottom-0 left-0 w-2/3 md:w-1/2 object-contain"
                    style={{ transform: `translateX(-${offsetX}px)` }}
                />
                <img
                    src="/icon/rumput-kanan.png"
                    alt="rumput kanan"
                    className="absolute bottom-0 right-0 w-2/3 md:w-1/2 object-contain"
                    style={{ transform: `translateX(${offsetX}px)` }}
                />
            </div>
        </>
    );
}
