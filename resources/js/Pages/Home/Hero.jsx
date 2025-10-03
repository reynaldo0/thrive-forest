import React, { useEffect, useState } from "react";

export default function HeroHome() {
    const [offsetY, setOffsetY] = useState(0);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const sunTranslate = offsetY * 0.5;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#90C444] to-[#FCFFEC]">
            <div
                className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            <div className="absolute inset-0 flex top-0 justify-center -translate-y-52 z-0 ">
                <img
                    src="/illustrasi/matahari.png"
                    alt="Sun"
                    className="w-40 h-40 md:w-[600px] md:h-[600px] object-contain"
                    style={{
                        transform: `translateY(${sunTranslate}px)`,
                        transition: "transform 0.1s linear",
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col justify-center md:pb-20 items-center px-6 text-center relative">
                <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-snug z-20 font-nunito">
                    NUTRIVERS
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl z-20 font-nunito font-bold pt-2 md:pt-5 text-xl md:text-4xl text-white md:pb-10">
                    TIngkatkan literasi kamu dengan pemanfaatan tumbuhan
                </p>
                <button
                    onClick={() => setClicked(true)}
                    className={`mt-6 px-8 md:px-14 py-4 md:py-6 rounded-full shadow-md transition z-20 text-2xl md:text-4xl font-nunito font-extrabold 
                        ${
                            clicked
                                ? "bg-[#90C444] text-white"
                                : "bg-[#EDFFCD] text-[#3F3313] hover:bg-[#90C444] hover:text-white"
                        }
                    `}
                >
                    Mulai
                </button>

                {/* Ilustrasi utama */}
                <div className="mt-10 absolute bottom-0 ">
                    <img
                        src="/illustrasi/herohome.png"
                        alt="ASN"
                        className="w-72 md:w-full mx-auto opacity-70 -z-10"
                    />
                </div>
            </div>
        </div>
    );
}
