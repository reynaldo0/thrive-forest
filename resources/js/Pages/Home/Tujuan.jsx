import { useEffect, useState, useRef } from "react";

export default function Tujuan() {
    const [animateText, setAnimateText] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const animationRef = useRef(null);
    const currentXRef = useRef(0);

    useEffect(() => {
        setTimeout(() => setAnimateText(true), 200);

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;

            // Parallax lebih agresif
            const isMobile = window.innerWidth < 768;
            const parallaxFactor = isMobile ? 300 : 600;

            const targetX = scrollRatio * parallaxFactor;

            const animate = () => {
                // Lerp lebih tinggi untuk respons cepat
                currentXRef.current += (targetX - currentXRef.current) * 0.25;
                setOffsetX(currentXRef.current);

                if (Math.abs(targetX - currentXRef.current) > 0.9) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            };

            cancelAnimationFrame(animationRef.current);
            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // inisialisasi posisi

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <>
            <section className="w-full min-h-[120vh] bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col md:flex-row items-center justify-center gap-12 py-16 relative overflow-visible px-4 md:px-16">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-[url('/background/heroartikel.png')] bg-cover bg-center blur-sm"
                        style={{ backgroundAttachment: "fixed" }}
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                </div>

                <div
                    className={`bg-[#FFFFFF] rounded-2xl shadow-lg max-w-7xl px-10 md:px-16 py-12 md:py-16 relative z-10 transition-all duration-700 ease-out ${
                        animateText
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                    }`}
                >
                    <h2 className="text-green-800 text-center mb-6">
                        <span className="text-3xl md:text-5xl text-secondary-200 px-6 py-2 font-bold">
                            Tujuan
                        </span>
                    </h2>
                    <p className="text-gray-700 md:text-2xl text-justify text-center md:px-10 leading-relaxed">
                        Mengingat Indonesia masih berada pada tingkat kelaparan{" "}
                        <span className="text-[#AF3E3E] font-semibold">
                            "Sedang"
                        </span>{" "}
                        dengan skor{" "}
                        <span className="text-[#AF3E3E] font-semibold">
                            17,9
                        </span>{" "}
                        berdasarkan Global Hunger Index (GHI) 2022.{""}
                        {" "}
                        Maka, Nutriverse hadir untuk mendukung pencapaian tujuan{" "}
                        {""}
                        <span className="text-[#90C444] font-semibold">
                            "Zero Hunger"
                        </span>.{" "}
                        Platform ini memberikan pengetahuan mengenai{" "}
                        <span className="text-[#90C444] font-semibold">
                            bioteknologi sintetis
                        </span>{" "}
                        kepada siswa, sehingga mereka dapat{" "}
                        <span className="text-[#90C444] font-semibold">
                            mengembangkan
                        </span>{" "}
                        berbagai jenis{" "}
                        <span className="text-[#90C444] font-semibold">
                            tanaman unggulan
                        </span>{" "}
                        melalui proses tertentu. Dengan cara ini, Nutriverse
                        berkontribusi pada peningkatan kuantitas dan kualitas
                        hasil pertanian serta pengurangan kelaparan, sekaligus 
                        memperkuat ketahanan pangan nasional.
                    </p>
                </div>
            </section>

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
