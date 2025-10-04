import { useEffect, useState, useRef } from "react";

export default function Tujuan() {
    const [animateText, setAnimateText] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setAnimateText(true), 200);

        let animationFrameId;
        let currentX = 0;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const scrollPassed = windowHeight - rect.top;
            const targetX = scrollPassed > 0 ? scrollPassed * 0.2 : 0;

            const animate = () => {
                currentX += (targetX - currentX) * 0.15;
                setOffsetX(currentX);

                if (Math.abs(targetX - currentX) > 0.5) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            };

            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col md:flex-row items-center justify-center gap-12 py-16 relative overflow-hidden px-6"
        >
            <div
                className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Card Tujuan */}
            <div
                className={`bg-[#FFFFFF] rounded-2xl shadow-lg max-w-6xl px-8 py-10 relative z-10 transition-all duration-700 ease-out ${
                    animateText ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                <h2 className="text-green-800 text-center mb-6">
                    <span className="text-3xl md:text-5xl text-secondary-200 px-6 py-2 font-bold">
                        Tujuan
                    </span>
                </h2>
                <p className="text-gray-700 md:text-2xl text-justify text-center md:px-10 leading-relaxed">
                    Nutriverse menjawab tantangan{" "}
                    <span className="text-[#90C444] font-semibold">"Zero Hunger"</span>{" "}
                    dengan memberikan pengetahuan mengenai{" "}
                    <span className="text-[#90C444] font-semibold">"Sintetis"</span>{" "}
                    kepada siswa-siswa untuk{" "}
                    <span className="text-[#90C444] font-semibold">mengembangkan</span>{" "}
                    berbagai jenis tanaman{" "}
                    <span className="text-[#90C444] font-semibold">unggulan</span>{" "}
                    dengan proses tertentu sehingga menghasilkan berbagai jenis tanaman dan hewan yang memiliki kuantitas dan kualitas yang unggulan.
        
                </p>
            </div>

            {/* Rumput Parallax */}
            <div className="absolute bottom-0 left-0 w-full overflow-visible pointer-events-none">
                <img
                    src="/icon/rumput-kiri.png"
                    alt="rumput kiri"
                    className="absolute bottom-0 left-0 w-1/3 object-contain"
                    style={{ transform: `translateX(-${offsetX}px)` }}
                />
                <img
                    src="/icon/rumput-kanan.png"
                    alt="rumput kanan"
                    className="absolute bottom-0 right-0 w-1/3 object-contain"
                    style={{ transform: `translateX(${offsetX}px)` }}
                />
            </div>
        </section>
    );
}
