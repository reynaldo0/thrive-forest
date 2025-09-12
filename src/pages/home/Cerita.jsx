import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const stories = [
  {
    id: 1,
    title: "Kebun Sekolah Harapan",
    description:
      "Anak-anak di sebuah desa berhasil menanam kebun sekolah, kini mereka bisa makan sayur segar setiap hari.",
    img: "/comic/kebun.png",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    id: 2,
    title: "Petani Lokal Inspiratif",
    description:
      "Seorang petani lokal membantu komunitas menanam padi organik yang lebih sehat dan ramah lingkungan.",
    img: "/comic/petani.png",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
];

export default function Cerita() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-300 p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 drop-shadow-lg mb-8 text-center">
        📚 Cerita Inspirasi & Komik Digital
      </h1>
      <p className="text-lg md:text-xl text-emerald-800 font-medium mb-10 text-center max-w-2xl">
        Baca cerita inspiratif dan lihat komik digital tentang perjuangan anak-anak dan petani lokal dalam mendukung{" "}
        <span className="font-bold">Zero Hunger</span>.
      </p>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => setSelected(story)}
          >
            <img
              src={story.img}
              alt={story.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                {story.title}
              </h2>
              <p className="text-gray-700 text-base">{story.description}</p>
              <button className="mt-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-semibold transition">
                <FaPlayCircle className="text-xl" /> Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl max-w-3xl w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">{selected.title}</h2>
            <p className="text-gray-700 mb-6">{selected.description}</p>
            {/* Video Embed */}
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={selected.video}
                title="Inspirasi Video"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}