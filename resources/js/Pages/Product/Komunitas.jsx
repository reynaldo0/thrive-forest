import { useEffect, useState } from "react";

export default function KomuIntro() {
    const [animateText, setAnimateText] = useState(false);
    const [animateImage, setAnimateImage] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimateText(true), 200);
        setTimeout(() => setAnimateImage(true), 600);
    }, []);

    // ✅ Fungsi scroll halus ke bagian forum komunitas
    const handleScrollToForum = () => {
        setClicked(true);
        const forumSection = document.getElementById("forum-komunitas");
        if (forumSection) {
            setTimeout(() => {
                forumSection.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    };

    return (
        <>
            {/* Bagian Komunitas */}
            <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-[#FCFFEC] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    {/* Gambar background */}
                    <div
                        className="absolute inset-0 bg-[url('/background/herokomunitas.png')] bg-cover bg-center blur-sm pointer-events-none"
                        style={{ backgroundAttachment: "fixed" }}
                    />
                    {/* Overlay putih transparan */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none" />
                </div>

                {/* Judul */}
                <h1
                    className={`text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide transition-all duration-700 ease-out relative z-10 ${
                        animateText
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-8"
                    }`}
                >
                    Bangun relasi baik melalui{" "}
                    <span className="text-[#90C444]">komunitas</span>
                </h1>

                {/* Card */}
                <div
                    className={`bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-12 md:p-16 flex flex-col md:flex-row items-center gap-14 max-w-5xl transition-all duration-700 ease-out relative z-10 ${
                        animateText
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-90"
                    }`}
                >
                    {/* Teks */}
                    <p
                        className={`text-[#2C2C2C] text-2xl md:text-3xl leading-relaxed transition-all duration-700 ease-out ${
                            animateText
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-8"
                        }`}
                    >
                        Website Nutriverse membantu antarsiswa untuk{" "}
                        <span className="text-[#90C444] font-semibold animate-pulse">
                            membangun relasi{" "}
                        </span>
                        dengan berbagai acara seperti{" "}
                        <span className="text-[#90C444] font-bold">seminar</span>{" "}
                        produk-produk tanaman dan forum{" "}
                        <span className="text-[#90C444] font-bold">komunitas</span>{" "}
                        Nutriverse sebagai tempat diskusi antarsiswa.
                    </p>

                    {/* Gambar + dekorasi */}
                    <div className="relative group">
                        <img
                            src="/icon/nuti5.png"
                            alt="Nuti Mascot"
                            className={`w-82 md:w-[1200px] drop-shadow-2xl transition-all duration-700 ease-out ${
                                animateImage
                                    ? "opacity-100 scale-100 rotate-0 animate-float"
                                    : "opacity-0 scale-0 -rotate-12"
                            } group-hover:scale-110 group-hover:rotate-6`}
                        />

                        {/* Dekorasi animasi: lingkaran glowing */}
                        <span className="absolute -top-6 -left-6 w-8 h-8 rounded-full bg-green-300 opacity-70 animate-ping"></span>
                        <span className="absolute top-10 -right-8 w-6 h-6 rounded-full bg-yellow-300 opacity-70 animate-bounce"></span>
                        <span className="absolute -bottom-6 left-12 w-10 h-10 rounded-full bg-green-500 opacity-60 animate-pulse"></span>
                    </div>
                </div>

                {/* Tombol menuju forum */}
                <button
                    onClick={handleScrollToForum}
                    className={`mt-10 py-4 px-10 md:py-5 md:px-16 text-xl md:text-2xl rounded-full font-semibold transition relative z-10
                        ${
                            clicked
                                ? "bg-[#90C444] text-white scale-95"
                                : "bg-[#A6E272] text-[#224C14] hover:bg-[#94D45E]"
                        }`}
                >
                    Menuju Komunitas
                </button>

                {/* Style Animasi Custom */}
                <style jsx>{`
                    @keyframes float {
                        0% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                        100% {
                            transform: translateY(0px);
                        }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}</style>
            </section>
        </>
    );
}
