import React, { useEffect, useState } from "react";

export default function HeroGames() {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Efek parallax
    const sunTranslate = offsetY * 0.5; // matahari turun
    const textTranslate = offsetY * 0.3; // teks & tombol ikut turun tapi lebih lambat
    const blackOverlay = Math.min(offsetY / 600, 1); // background memudar ke hitam

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#EDFFCD]">
            {/* Matahari */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <img
                    src="/background/matahari.png"
                    alt="Sun"
                    className="w-40 h-40 md:w-[600px] md:h-[600px] object-contain"
                    style={{
                        transform: `translateY(${sunTranslate}px)`,
                        transition: "transform 0.1s linear",
                    }}
                />
            </div>

            {/* Gunung */}
            <img
                src="/background/komunitas.png"
                alt="Gunung"
                className="absolute inset-x-0 bottom-[-200px] w-full object-cover z-10"
            />

            {/* Overlay hitam */}
            <div
                className="absolute inset-0 bg-black z-20"
                style={{
                    opacity: blackOverlay,
                    transition: "opacity 0.2s linear",
                }}
            />

            {/* Text & Button (tetap terlihat, tidak ikut pudar) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 text-white"
                style={{
                    transform: `translateY(${textTranslate}px)`,
                    transition: "transform 0.1s linear",
                }}
            >
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    GAMES
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md">
                    Permainan yang seru yang pasti dinantikan kamu 
                </p>
                <button className="mt-6 px-6 py-3 bg-[#EDFFCD] hover:bg-[#EDFFCD]/90 rounded-lg font-semibold shadow-lg text-black">
                    Mulai 
                </button>
            </div>
        </section>
    );
}
