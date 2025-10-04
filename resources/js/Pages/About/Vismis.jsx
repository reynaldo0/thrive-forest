import React, { useState, useEffect } from "react";

export default function VisiMisi() {
    const [activeTab, setActiveTab] = useState("visi");
    const [animateCard, setAnimateCard] = useState(false);
    const [animateText, setAnimateText] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimateCard(true), 200);
        setTimeout(() => setAnimateText(true), 500);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#FCFFEC] font-sans px-6 pt-20 pb-16 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-[url('/background/heroabout.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Judul */}
            <h1
                className={`text-4xl md:text-6xl font-extrabold text-[#2F3E1E] mb-12 tracking-wide transition-all duration-700 ease-out z-10 ${
                    animateText
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8"
                }`}
            >
                Visi dan Misi
            </h1>

            {/* Card */}
            <div
                className={`relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-200/50 p-10 md:p-14 flex flex-col gap-10 max-w-5xl w-full transition-all duration-700 ease-out z-10 ${
                    animateCard
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                }`}
            >
                {/* Tabs */}
                <div className="flex justify-center gap-6 relative">
                    {["visi", "misi"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                                activeTab === tab
                                    ? "bg-[#90C444] text-white font-semibold shadow-md hover:bg-[#88A825]"
                                    : "bg-green-200/50 text-green-800 hover:bg-green-300/70"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Isi Card */}
                <div className="text-[#2C2C2C] text-lg md:text-2xl leading-relaxed transition-all duration-700 ease-out">
                    {activeTab === "visi" ? (
                        <p
                            className={`italic text-justify transition-all duration-700 ${
                                animateText
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-8"
                            }`}
                        >
                            Menjadi{" "}
                            <span className="text-[#90C444] font-semibold">
                                platform edukasi digital
                            </span>{" "}
                            yang inovatif dan terpercaya dalam memberikan
                            pengetahuan praktis dan ilmiah tentang cara menanam
                            tumbuhan yang baik, benar, dan berkelanjutan, guna
                            mewujudkan masyarakat sehat, mandiri pangan, serta
                            berkontribusi pada tercapainya{" "}
                            <span className="text-[#90C444] font-semibold">
                                Zero Hunger
                            </span>
                            .
                        </p>
                    ) : (
                        <ul
                            className={`space-y-6 text-justify list-none transition-all duration-700 ${
                                animateText
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                            }`}
                        >
                            <li className="flex items-start gap-4">
                                <span className="text-[#90C444] font-bold text-xl">1.</span>
                                <p>
                                    <span className="text-[#90C444] font-semibold">
                                        Memberikan
                                    </span>{" "}
                                    edukasi digital berbasis riset tentang cara
                                    menanam yang baik dan berkelanjutan.
                                </p>
                            </li>

                            <li className="flex items-start gap-4">
                                <span className="text-[#90C444] font-bold text-xl">2.</span>
                                <p>
                                    <span className="text-[#90C444] font-semibold">
                                        Mengembangkan
                                    </span>{" "}
                                    pembelajaran interaktif untuk meningkatkan
                                    keterampilan bercocok tanam masyarakat.
                                </p>
                            </li>

                            <li className="flex items-start gap-4">
                                <span className="text-[#90C444] font-bold text-xl">3.</span>
                                <p>
                                    <span className="text-[#90C444] font-semibold">
                                        Mendorong
                                    </span>{" "}
                                    praktik pertanian ramah lingkungan menuju
                                    kemandirian pangan.
                                </p>
                            </li>

                            <li className="flex items-start gap-4">
                                <span className="text-[#90C444] font-bold text-xl">4.</span>
                                <p>
                                    <span className="text-[#90C444] font-semibold">
                                        Membangun
                                    </span>{" "}
                                    komunitas petani dan pembelajar yang
                                    inovatif serta peduli lingkungan.
                                </p>
                            </li>

                            <li className="flex items-start gap-4">
                                <span className="text-[#90C444] font-bold text-xl">5.</span>
                                <p>
                                    <span className="text-[#90C444] font-semibold">
                                        Berkontribusi
                                    </span>{" "}
                                    pada tercapainya{" "}
                                    <span className="text-[#90C444] font-semibold">
                                        Zero Hunger
                                    </span>{" "}
                                    melalui penyebaran pengetahuan dan aksi
                                    nyata.
                                </p>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}