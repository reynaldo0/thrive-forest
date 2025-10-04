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
            <div
                className="absolute inset-0 bg-[url('/background/heroabout.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Background dekoratif
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200/40 rounded-full blur-3xl"></div>
            <div className="absolute top-40 -right-32 w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl"></div> */}

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
                    <button
                        onClick={() => setActiveTab("visi")}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 relative ${
                            activeTab === "visi"
                                ? "bg-[#90C444] text-white font-semibold shadow-md hover:bg-[#88A825]"
                                : "bg-green-200/50 text-green-800 hover:bg-green-300/70"
                        }`}
                    >
                        Visi
                    </button>
                    <button
                        onClick={() => setActiveTab("misi")}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 relative ${
                            activeTab === "misi"
                                ? "bg-[#90C444] text-white font-semibold shadow-md hover:bg-[#88A825]"
                                : "bg-green-200/50 text-green-800 hover:bg-green-300/70"
                        }`}
                    >
                        Misi
                    </button>
                </div>

                {/* Isi card */}
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
                        <ol
                            className={`list-decimal list-inside space-y-3 text-justify transition-all duration-700 ${
                                animateText
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                            }`}
                        >
                            <li>
                                <span className="text-[#90C444] font-semibold">
                                    Memberikan 
                                </span>{" "}
                                edukasi digital berbasis riset tentang cara menanam yang baik dan berkelanjutan.
                            </li>
                            <li>
                                <span className="text-[#90C444] font-semibold">
                                    Mengembangkan
                                </span>{" "}
                                pembelajaran interaktif untuk meningkatkan keterampilan bercocok tanam masyarakat.
                            </li>
                            <li>
                                <span className="text-[#90C444] font-semibold">
                                    Mendorong
                                </span>{" "}
                                praktik pertanian ramah lingkungan menuju kemandirian pangan.
                            </li>
                            <li>
                                <span className="text-[#90C444] font-semibold">
                                    Membangun
                                </span>{" "}
                                komunitas petani dan pembelajar yang inovatif serta peduli lingkungan.
                            </li>
                            <li>
                                <span className="text-[#90C444] font-semibold">
                                    Berkontribusi
                                </span>{" "}
                                pada tercapainya{" "}
                                <span className="text-[#90C444] font-semibold">
                                    Zero Hunger
                                </span>{" "}
                                melalui penyebaran pengetahuan dan aksi nyata.
                            </li>
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}