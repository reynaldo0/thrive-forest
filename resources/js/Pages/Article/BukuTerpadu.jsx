// src/pages/BukuTerpadu.jsx
import React, { useState, useEffect, useRef } from "react";

export default function BukuTerpadu() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const sectionRef = useRef(null);
  const bookRef = useRef(null);

  const pages = ["/team/team1.png", "/team/team2.png", "/team/team3.png"];
  const totalPages = pages.length;

  const handleMouseMove = (e) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const newRotateY = (x / offsetWidth - 0.5) * 25;
    const newRotateX = (y / offsetHeight - 0.5) * -25;
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPassed = windowHeight - rect.top;
      setOffsetX(scrollPassed > 0 ? scrollPassed * 0.2 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col md:flex-row items-center justify-center gap-12 py-16 relative overflow-hidden px-6"
    >
      {/* Deskripsi */}
      <div className="relative max-w-lg bg-white shadow-lg rounded-xl p-6 border border-[#D8EBC5] z-10 mb-12 md:mb-0">
        <h3 className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#3B3B0E] text-white px-6 py-2 rounded-full text-lg font-bold">
          Buku Terpadu
        </h3>
        <p className="text-center text-[#3B3B0E] mt-6 leading-relaxed">
          Nutriverse menjawab tantangan “Zero Hunger” dengan memberikan
          pengetahuan mengenai “Sintesis” kepada siswa-siswa untuk mengembangkan
          berbagai jenis tanaman unggulan dengan proses tertentu sehingga
          menghasilkan berbagai jenis tanaman dan hewan yang memiliki kuantitas
          dan kualitas yang baik.
        </p>
      </div>

      {/* Buku */}
      <div
        className="relative w-64 h-80 perspective cursor-pointer z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setRotateX(0);
          setRotateY(0);
        }}
        ref={bookRef}
      >
        <div
          className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          {pages.map((src, index) => {
            const isFlipped = index < currentPage;
            return (
              <div
                key={index}
                className="absolute inset-0 w-full h-full shadow-xl rounded-md overflow-hidden transform-style-preserve-3d transition-transform duration-700"
                style={{
                  zIndex: totalPages - index,
                  transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                  transformOrigin: "left",
                  backfaceVisibility: "hidden",
                }}
                onClick={nextPage}
              >
                <img
                  src={src}
                  alt={`Halaman ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}

          {/* Spine */}
          <div className="absolute top-0 left-0 h-full w-3 bg-gray-200 shadow-inner rounded-l-md"></div>

          {/* Tombol balik halaman */}
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-70 px-3 py-1 rounded-full shadow-md hover:bg-opacity-100"
            >
              {"<"}
            </button>
          )}
        </div>
      </div>

      {/* Rumput Parallax */}
      <div className="absolute bottom-0 left-0 w-full overflow-visible pointer-events-none">
        <img
          src="/icon/rumput2.png"
          alt="rumput kiri"
          className="absolute bottom-0 left-0 w-1/3 object-contain"
          style={{ transform: `translateX(-${offsetX}px)` }}
        />
        <img
          src="/icon/rumput1.png"
          alt="rumput kanan"
          className="absolute bottom-0 right-0 w-1/3 object-contain"
          style={{ transform: `translateX(${offsetX}px)` }}
        />
      </div>
    </section>
  );
}