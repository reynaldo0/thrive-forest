import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function NutiIntro() {
  const [animateText, setAnimateText] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateText(true), 200);
    setTimeout(() => setAnimateImage(true), 400);
    setTimeout(() => setAnimateForm(true), 600);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center px-6 py-12">
      <h1
        className={`text-3xl font-bold text-green-800 bg-green-100 px-6 py-2 rounded-xl shadow-md mb-8 transform transition-all duration-700 ease-out ${
          animateText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        Nuti
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl text-center md:text-left mb-16">
        <p
          className={`text-gray-700 text-lg leading-relaxed transform transition-all duration-700 ease-out ${
            animateText
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-6"
          }`}
        >
          Hai namaku adalah <span className="font-semibold">Nuti</span>, Aku adalah
          maskot website <span className="font-semibold">Nutriverse</span>. Penasaran
          dengan website ini? Yuk, kita pelajari!
        </p>

        <img
          src="/icon/nuti.png"
          alt="Nuti Mascot"
          className={`w-40 md:w-56 drop-shadow-lg transition-all duration-700 ease-out ${
            animateImage
              ? "opacity-100 scale-100 rotate-0 animate-bounce"
              : "opacity-0 scale-0 -rotate-12"
          }`}
        />
      </div>

      {/* ================= TUJUAN ================= */}
      <div
        className={`bg-green-100 rounded-2xl shadow-lg max-w-3xl px-8 py-10 mb-20 transform transition-all duration-700 ease-out ${
          animateText ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h2 className="text-2xl font-bold text-green-800 text-center mb-4 bg-green-200 inline-block px-6 py-2 rounded-xl shadow animate-pulse">
          Tujuan
        </h2>
        <p className="text-gray-700 text-center leading-relaxed">
          Nutriverse menjawab tantangan <b>“Zero Hunger”</b> dengan memberikan
          pengetahuan mengenai <b>“Sintesis”</b> kepada siswa-siswa untuk
          mengembangkan berbagai jenis tanaman unggulan dengan proses tertentu
          sehingga menghasilkan berbagai jenis tanaman dan hewan yang memiliki
          kuantitas dan kualitas yang baik.
        </p>
      </div>

      {/* ================= FITUR WEBSITE ================= */}
      <div className="w-full max-w-4xl mb-20">
        <h2 className="text-3xl font-bold text-green-800 text-center bg-green-100 px-8 py-3 rounded-xl shadow-md mb-12 animate-bounce">
          Fitur Website
        </h2>

        <div className="grid grid-cols-2 gap-8 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>

          {/* Kiri */}
          <div className="flex flex-col items-end gap-20">
            <div className="flex flex-col items-center text-center transition transform hover:scale-110">
              <img
                src="/icon/nuti1.png"
                alt="Buku Terpadu"
                className="w-28 transition-transform duration-500 hover:rotate-6"
              />
              <span className="mt-3 bg-green-100 text-green-800 px-5 py-2 rounded-full shadow font-medium hover:bg-green-200 transition">
                Buku Terpadu
              </span>
            </div>
            <div className="flex flex-col items-center text-center transition transform hover:scale-110">
              <img
                src="/icon/nuti3.png"
                alt="Produk Unggul"
                className="w-28 transition-transform duration-500 hover:rotate-6"
              />
              <span className="mt-3 bg-green-100 text-green-800 px-5 py-2 rounded-full shadow font-medium hover:bg-green-200 transition">
                Produk Unggul
              </span>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex flex-col items-start gap-20">
            <div className="flex flex-col items-center text-center transition transform hover:scale-110">
              <span className="mt-3 bg-green-100 text-green-800 px-5 py-2 rounded-full shadow font-medium hover:bg-green-200 transition">
                AI Interaktif
              </span>
            </div>
            <div className="flex flex-col items-center text-center transition transform hover:scale-110">
              <img
                src="/icon/nuti2.png"
                alt="Komunitas"
                className="w-28 transition-transform duration-500 hover:rotate-6"
              />
              <span className="mt-3 bg-green-100 text-green-800 px-5 py-2 rounded-full shadow font-medium hover:bg-green-200 transition">
                Komunitas
              </span>
            </div>
            <div className="flex flex-col items-center text-center transition transform hover:scale-110">
              <img
                src="/icon/nuti4.png"
                alt="Games"
                className="w-28 transition-transform duration-500 hover:rotate-6"
              />
              <span className="mt-3 bg-green-100 text-green-800 px-5 py-2 rounded-full shadow font-medium hover:bg-green-200 transition">
                Games
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div
        className={`w-full bg-gradient-to-b from-green-200 to-green-500 py-16 px-6 rounded-t-3xl transform transition-all duration-700 ease-out ${
          animateForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10 animate-pulse">
          Dari kamu untuk <span className="bg-white px-2 rounded">Indonesia</span>
        </h2>

        <form className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition duration-300 focus:scale-105"
            />
            <input
              type="text"
              placeholder="Asal Daerah"
              className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition duration-300 focus:scale-105"
            />
          </div>

          <input
            type="text"
            placeholder="Fitur yang ingin ditambahkan"
            className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition duration-300 focus:scale-105"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="file"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-400 outline-none transition duration-300 hover:scale-105"
            />
            <textarea
              rows="3"
              placeholder="Ceritakan Pengalamanmu"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition duration-300 focus:scale-105"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-full transition transform hover:scale-105 hover:from-green-700 hover:to-green-800 duration-300"
          >
            Kirim
          </button>
        </form>

        {/* Footer */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-white">
          <p className="font-bold">EduForest .......................</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaFacebookF /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaTwitter /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaInstagram /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaLinkedinIn /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
