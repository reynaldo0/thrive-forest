// Pages/Home/Nuti.jsx
import { useEffect, useState } from "react";

export default function NutiIntro() {
  const [animateText, setAnimateText] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateText(true), 200);
    setTimeout(() => setAnimateImage(true), 600);
  }, []);

  return (
      <section
        id="nuti-section"  // ✅ tambahkan id ini
        className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-[#FCFFEC]"
      >
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
        style={{ backgroundAttachment: "fixed" }}
      />

      {/* Judul */}
      <h1
        className={`text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide transition-all duration-700 ease-out ${
          animateText
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        }`}
      >
        Kenalan Yuk Sama <span className="text-[#90C444]">Nuti</span>
      </h1>

      {/* Card */}
      <div
        className={`bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-12 md:p-16 flex flex-col md:flex-row items-center gap-14 max-w-5xl transition-all duration-700 ease-out ${
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
          Hai namaku adalah{" "}
          <span className="text-green-600 font-bold animate-pulse">
            Nuti
          </span>
          , aku adalah{" "}
          <span className="text-green-600 font-bold">maskot</span>{" "}
          <span className="text-green-600 font-bold">website</span>{" "}
          Nutriverse. <br />
          <br />
          Penasaran dengan website ini? Yuk, kita pelajari bersama.
        </p>

        {/* Gambar + dekorasi */}
        <div className="relative group">
          <img
            src="/icon/nuti.png"
            alt="Nuti Mascot"
            className={`w-56 md:w-full drop-shadow-2xl transition-all duration-700 ease-out ${
              animateImage
                ? "opacity-100 scale-100 rotate-0 animate-float"
                : "opacity-0 scale-0 -rotate-12"
            } group-hover:scale-110 group-hover:rotate-6`}
          />

          {/* Dekorasi animasi */}
          <span className="absolute -top-6 -left-6 w-8 h-8 rounded-full bg-green-300 opacity-70 animate-ping"></span>
          <span className="absolute top-10 -right-8 w-6 h-6 rounded-full bg-yellow-300 opacity-70 animate-bounce"></span>
          <span className="absolute -bottom-6 left-12 w-10 h-10 rounded-full bg-green-500 opacity-60 animate-pulse"></span>
        </div>
      </div>

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
  );
}
