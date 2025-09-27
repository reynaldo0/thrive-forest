import { useState } from "react";

export default function ArtikelCarousel() {
  const articles = [
    {
      id: 1,
      title: "Padi Toleran Garam",
      desc: "Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik.",
      img: "/images/article/article1.png",
      tag: "India",
    },
    {
      id: 2,
      title: "Beras Daging",
      desc: "Inovasi peneliti Korea Selatan yang menumbuhkan sel daging sapi dan lemak ikan di dalam butiran beras.",
      img: "/images/article/article2.png",
      tag: "Korea",
    },
    {
      id: 3,
      title: "Melon Hitam",
      desc: "Mahasiswi UB berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan sinar gamma.",
      img: "/images/article/article3.png",
      tag: "Univ. Brawijaya",
    },
    {
      id: 4,
      title: "Jagung Super",
      desc: "Jagung rekayasa genetika yang tahan iklim kering dengan kandungan gizi tinggi.",
      img: "/images/article/article1.png",
      tag: "Indonesia",
    },
    {
      id: 5,
      title: "Tomat Biru",
      desc: "Tomat biru kaya antioksidan anthocyanin hasil rekayasa genetik dengan sinar matahari.",
      img: "/images/article/article2.png",
      tag: "Jepang",
    },
    {
      id: 6,
      title: "Padi Toleran Garam",
      desc: "Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik.",
      img: "/images/article/article3.png",
      tag: "India",
    },
    {
      id: 7,
      title: "Beras Daging",
      desc: "Inovasi peneliti Korea Selatan yang menumbuhkan sel daging sapi dan lemak ikan di dalam butiran beras.",
      img: "/images/article/article1.png",
      tag: "Korea",
    },
    {
      id: 8,
      title: "Melon Hitam",
      desc: "Mahasiswi UB berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan sinar gamma.",
      img: "/images/article/article2.png",
      tag: "Univ. Brawijaya",
    },
  ];

  const [current, setCurrent] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };


  return (
    <div className="relative flex flex-col items-center justify-center py-12 bg-[#f9fbe7]">
      <h2 className="text-3xl font-bold text-[#3d2b1f] mb-10">Artikel Berita</h2>

      <div className="relative max-w-6xl w-full overflow-hidden">
        {/* Wrapper carousel */}
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4 px-4"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${(articles.length / itemsPerPage) * 100}%`
          }}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 w-72 flex-shrink-0"
            >
              {/* Gambar + Tag */}
              <div className="relative">
                <img
                  src={article.img}
                  alt={article.title}
                  className="rounded-t-xl h-44 w-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-[#3d2b1f] text-white text-xs px-3 py-1 rounded">
                  {article.tag}
                </span>
              </div>

              {/* Konten */}
              <div className="p-4 flex flex-col">
                <h3 className="text-base font-bold text-[#33691e] mb-2 bg-[#dcedc8] inline-block px-2 py-1 rounded">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-700 flex-grow leading-relaxed">
                  {article.desc}
                </p>
                <button className="mt-4 bg-[#3d2b1f] text-white text-sm py-2 rounded-md hover:bg-[#2c1e14] transition">
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

     {/* Indicator */}
        <div className="flex mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
            <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-[#4b830d]" : "bg-gray-300"
            }`}
            />
        ))}
        </div>

      {/* Lihat Selengkapnya */}
      <button className="mt-8 bg-[#4b830d] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#33691e] transition">
        Lihat Selengkapnya
      </button>
    </div>
  );
}
