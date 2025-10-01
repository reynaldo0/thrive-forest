import React from "react";

export default function Hero() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#90C444] to-[#FCFFEC]">
            <div
                className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Hero Section */}
            <div className="flex-1 flex flex-col justify-center md:pb-20 items-center px-6 text-center relative">
                <h1 className="text-3xl md:text-7xl font-extrabold text-white leading-snug z-20 font-nunito">
                    NUTRIVERS
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl z-20 font-nunito font-bold pt-5 text-4xl text-white pb-10">
                    TIngkatkan literasi kamu dengan pemanfaatan tumbuhan
                </p>
                <button className="mt-6 px-14 py-6 bg-[#EDFFCD] text-secondary rounded-lg shadow-md hover:bg-blue-700 transition z-20 text-4xl font-nunito font-extrabold">
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
