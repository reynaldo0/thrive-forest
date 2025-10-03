import React, { useState, useEffect } from "react";

export default function ProdukUnggul() {
    const products = [
        {
            icon: "https://img.icons8.com/color/96/dna-helix.png",
            alt: "DNA",
            label: "Rekayasa Genetik",
        },
        {
            icon: "https://img.icons8.com/color/96/organic-food.png",
            alt: "Botol",
            label: "Nutrisi Organik",
        },
        {
            icon: "https://img.icons8.com/color/96/broccoli.png",
            alt: "Tanaman",
            label: "Tanaman Sehat",
        },
        {
            icon: "https://img.icons8.com/color/96/plant-under-sun.png",
            alt: "Plant",
            label: "Energi Hijau",
        },
        {
            icon: "https://img.icons8.com/color/96/corn.png",
            alt: "Jagung",
            label: "Pangan Unggul",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setAnimate(true);
        setShowDetail(false); // reset detail ketika geser produk
        setSelectedProduct(null);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < products.length - 1)
            setCurrentIndex(currentIndex + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 bg-[#FCFFEC] relative">
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Judul */}
            <h2 className="text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide transition-all duration-700 ease-out">
                Produk Unggul
            </h2>

            {/* Garis indikator */}
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
                            onClick={() => setCurrentIndex(i)}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Carousel Produk */}
            <div className="relative w-full max-w-5xl overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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
                                {/* Lingkaran Icon */}
                                <div className="w-56 h-56 rounded-full bg-white shadow-2xl border-2 border-[#E0EBD2] flex items-center justify-center hover:scale-110 transition-transform duration-500">
                                    <img
                                        src={p.icon}
                                        alt={p.alt}
                                        className="w-24 h-24"
                                    />
                                </div>
                                {/* Label */}
                                <p className="mt-6 text-2xl md:text-3xl font-semibold text-[#3B3B0E]">
                                    {p.label}
                                </p>

                                {/* Tombol Jelajahi (semua produk ada) */}
                                <button
                                    onClick={() => {
                                        setSelectedProduct(p);
                                        setShowDetail(true);
                                    }}
                                    className="mt-6 px-6 py-2 rounded-full bg-[#88A825] text-white font-semibold shadow-md hover:bg-[#6e881f] transition"
                                >
                                    Jelajahi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tombol Navigasi */}
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

            {/* Konten Detail (dinamis sesuai produk dipilih) */}
            {showDetail && selectedProduct && (
                <div className="mt-12 max-w-3xl w-full bg-[#F6FFE5] rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-left">
                        <h3 className="text-2xl font-bold text-[#3B3B0E] mb-4">
                            {selectedProduct.label}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Hunger is discomfort or pain caused by a lack of
                            food. It is different from food insecurity, which
                            means lack of regular access to safe and nutritious
                            food for proper development and an active and
                            healthy life.
                        </p>
                        {/* Tombol kembali */}
                        <button
                            onClick={() => setShowDetail(false)}
                            className="px-6 py-2 bg-[#3B3B0E] text-white rounded-full font-semibold shadow-md hover:bg-[#2e2e0a] transition"
                        >
                            Kembali
                        </button>
                    </div>
                    <div className="flex-shrink-0">
                        <img
                            src={selectedProduct.icon}
                            alt={selectedProduct.alt}
                            className="w-28 h-28 md:w-36 md:h-36"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
