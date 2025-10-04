import React, { useState, useEffect } from "react";

export default function ProdukUnggul() {
    const products = [
        { 
            icon: "/produk-unggul/kultur.png", 
            alt: "Kultur", 
            label: "Kultur Jaringan", 
            desc: "Kultur jaringan adalah teknik bioteknologi untuk memperbanyak tanaman dengan mengambil bagian kecil dari tanaman (sel, jaringan, atau organ) dan menumbuhkannya di lingkungan laboratorium yang steril dan terkontrol (in vitro)." 
        },
        { 
            icon: "/produk-unggul/rekayasa.png", 
            alt: "DNA", 
            label: "Rekayasa Genetika", 
            desc: "Rekayasa Genetika adalah proses memodifikasi DNA untuk menghasilkan sifat baru yang diinginkan, seperti ketahanan terhadap hama atau peningkatan nilai gizi. Proses ini melibatkan ekstraksi DNA, contoh nya penggunaan bakteri Agrobacterium." 
        },
        { 
            icon: "/produk-unggul/botol.png", 
            alt: "Botol", 
            label: "Bioteknologi", 
            desc: "Bioteknologi adalah ilmu dan teknologi yang memanfaatkan sistem biologis, organisme hidup, atau bagian-bagiannya untuk mengembangkan atau menciptakan produk dan proses yang bermanfaat bagi manusia dan lingkungan." 
        },
        { 
            icon: "/produk-unggul/seleksi.png", 
            alt: "Seleksi", 
            label: "Seleksi Masal", 
            desc: "Seleksi massa adalah metode yang bertujuan meningkatkan populasi campuran dengan memilih individu berdasarkan penampilan fenotipik, kemudian benihnya dikumpulkan dan ditanam pada generasi berikutnya untuk meningkatkan frekuensi gen." 
        },
        { 
            icon: "/produk-unggul/okulasi.png", 
            alt: "Okulasi", 
            label: "Okulasi Tanaman", 
            desc: "Okulasi adalah teknik menggabungkan sifat unggul dari kedua bagian tanaman, seperti sistem perakaran yang kuat dari batang bawah dan kualitas buah atau bunga yang baik dari batang atas, untuk menghasilkan varietas tanaman yang lebih baik dan unggul" 
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setAnimate(true);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < products.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowDetail(false);      // otomatis tutup konten detail
            setSelectedProduct(null);  // reset produk yang dipilih
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowDetail(false);      // otomatis tutup konten detail
            setSelectedProduct(null);  // reset produk yang dipilih
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center w-full px-6 pt-24 pb-16 bg-[#FCFFEC] overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Judul */}
                <h2 className="text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide">
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
                                onClick={() => {
                                    setCurrentIndex(i);
                                    setShowDetail(false);      // tutup detail saat klik indikator
                                    setSelectedProduct(null);
                                }}
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
                            <div key={i} className="w-full flex justify-center items-center flex-shrink-0">
                                <div
                                    className={`flex flex-col items-center transition-all duration-700 ease-out ${
                                        animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                                    }`}
                                >
                                    {/* Lingkaran Icon */}
                                    <div className="w-56 h-56 rounded-full bg-white shadow-2xl border-2 border-[#E0EBD2] flex items-center justify-center hover:scale-110 transition-transform duration-500">
                                        <img src={p.icon} alt={p.alt} className="w-24 h-24" />
                                    </div>

                                    {/* Label */}
                                    <p className="mt-6 text-2xl md:text-3xl font-semibold text-[#3B3B0E]">
                                        {p.label}
                                    </p>

                                    {/* Tombol Jelajahi */}
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(p);
                                            setShowDetail(true);
                                        }}
                                        className="mt-6 px-8 py-5 rounded-full bg-[#88A825] text-white font-semibold shadow-md hover:bg-[#6e881f] transition"
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === products.length - 1}
                        className="absolute top-1/2 right-1 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#88A825] bg-white text-[#3B3B0E] shadow-lg z-20 disabled:opacity-40 hover:bg-[#88A825] hover:text-white hover:shadow-xl transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Konten Detail */}
                {showDetail && selectedProduct && (
                    <div className="mt-12 max-w-4xl w-full bg-[#F6FFE5] rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-left">
                            <h3 className="text-3xl font-bold text-[#3B3B0E] mb-4">{selectedProduct.label}</h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {selectedProduct.desc}
                            </p>
                            <button
                                onClick={() => setShowDetail(false)}
                                className="px-6 py-3 bg-[#A6E272] text-[#224C14] font-semibold rounded-full shadow-md hover:bg-[#94D45E] transition"
                            >
                                Kembali
                            </button>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={selectedProduct.icon} alt={selectedProduct.alt} className="w-32 h-32 md:w-40 md:h-40" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
