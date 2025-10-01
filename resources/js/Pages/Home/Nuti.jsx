import { useEffect, useState } from "react";

export default function NutiIntro() {
  const [animateText, setAnimateText] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateText(true), 200);
    setTimeout(() => setAnimateImage(true), 600);
  }, []);

  return (
    <>
      {/* Bagian Nuti */}
      <section className="min-h-screen items-center justify-center w-full flex flex-col items-center px-6 pt-12 pb-8 relative">
        {/* Judul */}
        <h1
          className={`text-4xl md:text-5xl font-extrabold text-[#3B3B0E] mb-6 tracking-wide transition-all duration-700 ease-out ${
            animateText
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6"
          }`}
        >
          Kenalan Yuk Sama <span className="text-green-600">Nuti</span>
        </h1>

        {/* Card */}
        <div
          className={`bg-[#F0FCD7] rounded-2xl shadow-xl border-2 border-green-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-3xl transition-all duration-700 ease-out ${
            animateText
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          {/* Teks */}
          <p
            className={`text-[#2C2C2C] text-lg md:text-xl leading-relaxed transition-all duration-700 ease-out ${
              animateText
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            Hai namaku adalah{" "}
            <span className="text-green-600 font-semibold animate-pulse">
              Nuti
            </span>
            , aku adalah{" "}
            <span className="text-green-600 font-semibold">maskot</span>{" "}
            <span className="text-green-600 font-semibold">website</span>{" "}
            Nutriverse. <br />
            <br />
            Penasaran dengan website ini? Yuk, kita pelajari bareng-bareng.
          </p>

          {/* Gambar */}
          <div className="relative group">
            <img
              src="/icon/nuti.png"
              alt="Nuti Mascot"
              className={`w-32 md:w-44 drop-shadow-xl transition-all duration-700 ease-out ${
                animateImage
                  ? "opacity-100 scale-100 rotate-0 animate-float"
                  : "opacity-0 scale-0 -rotate-12"
              } group-hover:scale-110 group-hover:rotate-6`}
            />

            {/* Emoji lucu muncul saat hover */}
            <span className="absolute -top-6 right-0 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
              ✨
            </span>
            <span className="absolute bottom-0 -left-4 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              🌸
            </span>
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

    </>
  );
}
