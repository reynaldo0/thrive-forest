import { useState } from "react";

export default function ArtikelCarousel() {
  const articles = [
    { id: 1, title: "Padi Toleran Garam", desc: "Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik.", img: "/images/article/article1.png", tag: "India" },
    { id: 2, title: "Beras Daging", desc: "Inovasi peneliti Korea Selatan yang menumbuhkan sel daging sapi dan lemak ikan di dalam butiran beras.", img: "/images/article/article2.png", tag: "Korea" },
    { id: 3, title: "Melon Hitam", desc: "Mahasiswi UB berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan sinar gamma.", img: "/images/article/article3.png", tag: "Univ. Brawijaya" },
    { id: 4, title: "Jagung Super", desc: "Jagung rekayasa genetika yang tahan iklim kering dengan kandungan gizi tinggi.", img: "/images/article/article1.png", tag: "Indonesia" },
    { id: 5, title: "Tomat Biru", desc: "Tomat biru kaya antioksidan anthocyanin hasil rekayasa genetik dengan sinar matahari.", img: "/images/article/article2.png", tag: "Jepang" },
    { id: 6, title: "Padi Toleran Garam", desc: "Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik.", img: "/images/article/article3.png", tag: "India" },
    { id: 7, title: "Beras Daging", desc: "Inovasi peneliti Korea Selatan yang menumbuhkan sel daging sapi dan lemak ikan di dalam butiran beras.", img: "/images/article/article1.png", tag: "Korea" },
    { id: 8, title: "Melon Hitam", desc: "Mahasiswi UB berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan sinar gamma.", img: "/images/article/article2.png", tag: "Univ. Brawijaya" },
  ];

  const [current, setCurrent] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current < totalPages - 1) setCurrent(current + 1);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 py-16 bg-[#f9fbe7]">
      <h2 className="text-5xl md:text-6xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide">
        Artikel Berita
      </h2>

      <div className="relative w-full max-w-6xl overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out gap-6 px-4"
          style={{
            transform: `translateX(-${current * (100)}%)`,
            width: `${(articles.length / itemsPerPage) * 100}%`
          }}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all w-80 md:w-96 flex-shrink-0"
            >
              <div className="relative">
                <img src={article.img} alt={article.title} className="rounded-t-3xl h-52 w-full object-cover" />
                <span className="absolute bottom-3 right-3 bg-[#3B3B0E] text-white text-sm px-4 py-1 rounded-full">
                  {article.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-lg font-bold text-[#33691e] mb-3 bg-[#dcedc8] inline-block px-3 py-1 rounded-xl">
                  {article.title}
                </h3>
                <p className="text-base text-gray-700 flex-grow leading-relaxed">
                  {article.desc}
                </p>
                <button className="mt-6 bg-[#3B3B0E] text-white text-base py-3 rounded-xl hover:bg-[#2C2C0E] transition-all">
                  Baca Selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol navigasi */}
        <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 z-20 
                    bg-[#4b830d]/90 text-white p-3 rounded-full shadow-lg 
                    hover:bg-[#33691e] hover:scale-110 transition transform"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        </button>

        <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 z-20 
                    bg-[#4b830d]/90 text-white p-3 rounded-full shadow-lg 
                    hover:bg-[#33691e] hover:scale-110 transition transform"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex mt-8 gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all ${i === current ? "bg-[#4b830d]" : "bg-gray-300"}`}
          />
        ))}
      </div>

      <button className="mt-12 bg-[#4b830d] text-white font-semibold py-3 px-8 rounded-3xl hover:bg-[#33691e] transition-all">
        Lihat Selengkapnya
      </button>
    </section>
  );
}
