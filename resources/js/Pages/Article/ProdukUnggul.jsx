import React, { useState, useEffect } from "react";

export default function ProdukUnggul() {
    const products = [
        {
            icon: "/produk-unggul/kultur.png",
            alt: "Kultur",
            label: "Kultur Jaringan",
            desc: "Kultur jaringan adalah teknik bioteknologi untuk memperbanyak tanaman dengan mengambil bagian kecil dari tanaman (sel, jaringan, atau organ) dan menumbuhkannya di lingkungan laboratorium yang steril dan terkontrol (in vitro).",
        },
        {
            icon: "/produk-unggul/rekayasa.png",
            alt: "DNA",
            label: "Rekayasa Genetika",
            desc: "Rekayasa Genetika adalah proses memodifikasi DNA untuk menghasilkan sifat baru yang diinginkan, seperti ketahanan terhadap hama atau peningkatan nilai gizi. Proses ini melibatkan ekstraksi DNA, contohnya penggunaan bakteri Agrobacterium.",
        },
        {
            icon: "/produk-unggul/botol.png",
            alt: "Botol",
            label: "Bioteknologi",
            desc: "Bioteknologi adalah ilmu dan teknologi yang memanfaatkan sistem biologis, organisme hidup, atau bagian-bagiannya untuk mengembangkan atau menciptakan produk dan proses yang bermanfaat bagi manusia dan lingkungan.",
        },
        {
            icon: "/produk-unggul/seleksi.png",
            alt: "Seleksi",
            label: "Seleksi Masal",
            desc: "Seleksi massa adalah metode yang bertujuan meningkatkan populasi campuran dengan memilih individu berdasarkan penampilan fenotipik, kemudian benihnya dikumpulkan dan ditanam pada generasi berikutnya untuk meningkatkan frekuensi gen.",
        },
        {
            icon: "/produk-unggul/okulasi.png",
            alt: "Okulasi",
            label: "Okulasi Tanaman",
            desc: "Okulasi adalah teknik menggabungkan sifat unggul dari kedua bagian tanaman, seperti sistem perakaran yang kuat dari batang bawah dan kualitas buah atau bunga yang baik dari batang atas, untuk menghasilkan varietas tanaman yang lebih baik dan unggul.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showSimulation, setShowSimulation] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [simulationResult, setSimulationResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const simulationData = {
        "Kultur Jaringan": {
            impact: "+45% hasil panen, +30% efisiensi bibit, ramah lingkungan.",
            desc: "Kultur jaringan mempercepat perbanyakan tanaman unggul dan mendorong ketahanan pangan dengan efisiensi tinggi.",
        },
        "Rekayasa Genetika": {
            impact: "+60% ketahanan terhadap hama, +25% nilai gizi.",
            desc: "Rekayasa genetika memungkinkan tanaman lebih tahan terhadap penyakit dan meningkatkan kandungan nutrisi.",
        },
        "Bioteknologi": {
            impact: "+40% produktivitas, +35% efisiensi sumber daya, -20% limbah pertanian.",
            desc: "Bioteknologi membantu menciptakan tanaman yang adaptif terhadap perubahan iklim dan mengurangi ketergantungan pada bahan kimia.",
        },
        "Seleksi Masal": {
            impact: "+30% kualitas hasil panen, +20% keragaman genetik.",
            desc: "Seleksi masal menjaga keberagaman genetik tanaman, menghasilkan varietas yang tahan terhadap kondisi ekstrem dan memperkuat ketahanan pangan.",
        },
        "Okulasi Tanaman": {
            impact: "+50% ketahanan tanaman, +40% kualitas buah.",
            desc: "Okulasi tanaman menggabungkan keunggulan dua varietas untuk menciptakan tanaman yang lebih produktif dan tahan lama, mendukung pertanian berkelanjutan.",
        },
    };

    useEffect(() => {
        setAnimate(true);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < products.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowDetail(false);
            setSelectedProduct(null);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowDetail(false);
            setSelectedProduct(null);
        }
    };

    const startSimulation = () => {
        if (!selectedMethod) return;
        setProgress(0);
        setSimulationResult(null);

        let prog = 0;
        const interval = setInterval(() => {
            prog += 10;
            if (prog >= 100) {
                clearInterval(interval);
                setProgress(100);
                setSimulationResult(simulationData[selectedMethod]);
            } else {
                setProgress(prog);
            }
        }, 200);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center w-full px-6 pt-24 pb-16 bg-[#FCFFEC] overflow-hidden">
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] opacity-50 bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />

            <div className="relative z-10 flex flex-col items-center w-full">
                <h2 className="text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide">
                    Produk Unggul
                </h2>

                <div className="relative flex items-center justify-center w-full max-w-3xl mb-12">
                    <div className="absolute w-full h-1 bg-[#3B3B0E] rounded"></div>
                    <div className="flex w-full justify-between relative z-10 px-4">
                        {products.map((_, i) => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                                    i === currentIndex
                                        ? "bg-[#88A825] scale-125 shadow-lg"
                                        : "bg-[#3B3B0E]"
                                }`}
                                onClick={() => {
                                    setCurrentIndex(i);
                                    setShowDetail(false);
                                    setSelectedProduct(null);
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="relative w-full max-w-5xl overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {products.map((p, i) => (
                            <div
                                key={i}
                                className="w-full flex justify-center items-center flex-shrink-0"
                            >
                                <div
                                    className={`flex flex-col items-center transition-all duration-700 ease-out ${
                                        animate
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 -translate-y-8"
                                    }`}
                                >
                                    <div className="w-56 h-56 rounded-full bg-white shadow-2xl border-2 border-[#E0EBD2] flex items-center justify-center hover:scale-110 transition-transform duration-500 overflow-hidden">
                                        <img
                                            src={p.icon}
                                            alt={p.alt}
                                            className="max-w-[80%] max-h-[80%] object-contain"
                                        />
                                    </div>

                                    <p className="mt-6 text-2xl md:text-3xl font-semibold text-[#3B3B0E]">
                                        {p.label}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setShowDetail(true);
                                            setShowSimulation(false);
                                        }}
                                        className="mt-6 px-8 py-5 rounded-full bg-[#88A825] text-white font-semibold shadow-md hover:bg-[#6e881f] transition"
                                    >
                                        Jelajahi
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="absolute top-1/2 left-1 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#88A825] bg-white text-[#3B3B0E] shadow-lg z-20 disabled:opacity-40 hover:bg-[#88A825] hover:text-white hover:shadow-xl transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === products.length - 1}
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#88A825] bg-white text-[#3B3B0E] shadow-lg z-20 disabled:opacity-40 hover:bg-[#88A825] hover:text-white hover:shadow-xl transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>

                {showDetail && selectedProduct && (
                    <div className="mt-12 max-w-4xl w-full bg-[#F6FFE5] rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-left">
                            <h3 className="text-3xl font-bold text-[#3B3B0E] mb-4">
                                {selectedProduct.label}
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {selectedProduct.desc}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setShowDetail(false)}
                                    className="px-6 py-3 bg-[#A6E272] text-[#224C14] font-semibold rounded-full shadow-md hover:bg-[#94D45E] transition"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={() => {
                                        setShowSimulation(true);
                                        setShowDetail(false);
                                    }}
                                    className="px-6 py-3 bg-[#88A825] text-white font-semibold rounded-full shadow-md hover:bg-[#6e881f] transition"
                                >
                                    Simulasi Pangan
                                </button>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src={selectedProduct.icon}
                                alt={selectedProduct.alt}
                                className="max-w-[150px] md:max-w-[180px] object-contain"
                            />
                        </div>
                    </div>
                )}

                {showSimulation && (
                    <div className="mt-16 w-full max-w-3xl bg-[#F5FFE8] rounded-3xl shadow-xl p-10 text-center border border-[#BFE3A2]">
                        <h3 className="text-3xl font-bold text-[#3B3B0E] mb-6">
                            Simulasi Pangan Berkelanjutan
                        </h3>
                        <p className="text-gray-700 mb-8">
                            Pilih metode pertanian dan lihat bagaimana
                            kontribusinya terhadap ketahanan pangan global.
                        </p>

                        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center mb-8">
                            {Object.keys(simulationData).map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setSelectedMethod(method)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                                        selectedMethod === method
                                            ? "bg-[#88A825] text-white shadow-lg"
                                            : "bg-white border-2 border-[#88A825] text-[#3B3B0E] hover:bg-[#f3fbe3]"
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={startSimulation}
                            disabled={!selectedMethod}
                            className="px-10 py-4 bg-[#A6E272] text-[#224C14] font-bold rounded-full shadow-md hover:bg-[#8FD04E] transition disabled:opacity-40"
                        >
                            Mulai Simulasi
                        </button>

                        {progress > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-6 mt-8">
                                <div
                                    className="h-6 bg-[#88A825] rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}

                        {simulationResult && (
                            <div className="mt-10 bg-white p-6 rounded-2xl shadow-inner text-left">
                                <h4 className="text-2xl font-bold text-[#3B3B0E] mb-3">
                                    Dampak dari {selectedMethod}
                                </h4>
                                <p className="text-lg text-gray-700 mb-3">
                                    {simulationResult.desc}
                                </p>
                                <p className="text-[#507A1C] font-semibold text-xl">
                                    {simulationResult.impact}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowSimulation(false);
                                setSelectedMethod("");
                                setSimulationResult(null);
                                setProgress(0);
                            }}
                            className="mt-8 px-8 py-3 bg-[#94D45E] text-[#224C14] font-semibold rounded-full shadow-md hover:bg-[#7AC84E] transition"
                        >
                            Kembali ke Produk
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
