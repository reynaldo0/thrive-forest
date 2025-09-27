// src/pages/ProdukUnggul.jsx
import React, { useState } from "react";

export default function ProdukUnggul() {
  const products = [
    {
      icon: "https://img.icons8.com/color/96/dna-helix.png",
      alt: "DNA",
      label: "Rekayasa Genetik",
      size: "w-28 h-28",
    },
    {
      icon: "https://img.icons8.com/color/96/organic-food.png",
      alt: "Botol",
      label: "Nutrisi Organik",
      size: "w-40 h-40",
    },
    {
      icon: "https://img.icons8.com/color/96/broccoli.png",
      alt: "Tanaman",
      label: "Tanaman Sehat",
      size: "w-28 h-28",
    },
    {
      icon: "https://img.icons8.com/color/96/plant-under-sun.png",
      alt: "Plant",
      label: "Energi Hijau",
      size: "w-28 h-28",
    },
    {
      icon: "https://img.icons8.com/color/96/corn.png",
      alt: "Jagung",
      label: "Pangan Unggul",
      size: "w-28 h-28",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFBE9] flex flex-col items-center py-12">
      {/* Judul */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#3B3B0E] mb-8">
        Produk Unggul
      </h2>

      {/* Garis dengan titik indikator */}
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
      <div className="relative w-full max-w-3xl overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {products.map((p, i) => (
            <div
              key={i}
              className="w-full flex justify-center items-center flex-shrink-0"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`${p.size} rounded-full bg-white shadow-xl border-2 border-[#E0EBD2] flex items-center justify-center hover:scale-110 transition-transform duration-500`}
                >
                  <img src={p.icon} alt={p.alt} className="w-14 h-14" />
                </div>
                <p className="mt-4 text-lg font-semibold text-[#3B3B0E]">
                  {p.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Navigasi */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute top-1/2 left-1 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#88A825] bg-white text-[#3B3B0E] shadow-lg z-20 disabled:opacity-40 hover:bg-[#88A825] hover:text-white hover:shadow-xl transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
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
          className="absolute top-1/2 right-1 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#88A825] bg-white text-[#3B3B0E] shadow-lg z-20 disabled:opacity-40 hover:bg-[#88A825] hover:text-white hover:shadow-xl transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
