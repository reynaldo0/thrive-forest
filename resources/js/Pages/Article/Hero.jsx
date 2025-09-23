import React, { useEffect, useState } from "react";

export default function HeroArticle() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sunTranslate = offsetY * 0.3; // matahari turun lebih smooth
  const textTranslate = offsetY * 0.2; // teks turun lebih lambat
  const blackOverlay = Math.min(offsetY / 600, 0.6); // overlay tidak full gelap

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#EDFFCD]">
      {/* Matahari */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0">
        <img
          src="/background/matahari.png"
          alt="Sun"
          className="w-40 h-40 md:w-96 md:h-96 object-contain"
          style={{
            transform: `translateY(${sunTranslate}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* Gunung */}
      <img
        src="/background/artikel.png"
        alt="Gunung"
        className="absolute inset-x-0 bottom-0 md:bottom-[-650px] w-full object-contain z-10"
      />


      {/* Overlay hitam */}
      <div
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{
          opacity: blackOverlay,
          transition: "opacity 0.2s linear",
        }}
      />

      {/* Text & Button */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4 md:px-0"
        style={{
          transform: `translateY(${textTranslate}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          NEBULARIA JAYA JAYA
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl drop-shadow-md">
          Ingin juara 1? Nebularia solusinya!
        </p>
        <button className="mt-6 px-6 py-3 bg-[#EDFFCD] hover:bg-[#EDFFCD]/90 rounded-lg font-semibold shadow-lg text-black">
          Jelajahi
        </button>
      </div>
    </section>
  );
}
