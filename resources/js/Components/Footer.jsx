import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundColor: "#F0FCD7",
        backgroundImage: "url('/background/footerr.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // biar full ke bawah
        backgroundPosition: "top center", // gambar lebih ke atas
      }}
    >
      {/* Konten Footer */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-40 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Hubungi Kami */}
        <div className="flex flex-col space-y-4">
          <img src="/icon/logo-t.png" alt="NutriVerse" className="w-32 mb-2" />
          <h3 className="text-lg font-semibold">Hubungi kami</h3>
          <p className="flex items-center gap-2">
            <span className="text-xl">📍</span> Universitas Negeri Jakarta (UNJ)
          </p>
          <p className="flex items-center gap-2">
            <span className="text-xl">✉️</span> Nutinutriverse@gmail.com
          </p>

          {/* Sosial Media */}
          <div className="flex space-x-3 mt-3">
            {[
              { icon: <FaTwitter />, href: "#" },
              { icon: <FaFacebookF />, href: "#" },
              { icon: <FaInstagram />, href: "#" },
              { icon: <FaLinkedinIn />, href: "#" },
              { icon: <FaPinterestP />, href: "#" },
              { icon: <FaYoutube />, href: "#" },
              { icon: <FaTiktok />, href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="p-2 text-[#4C7C18] rounded-full hover:bg-yellow-200 transition transform hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Akses Konten */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Akses konten</h3>
          <a href="#" className="hover:text-yellow-200 transition">Beranda</a>
          <a href="#" className="hover:text-yellow-200 transition">Tentang</a>
          <a href="#" className="hover:text-yellow-200 transition">Artikel</a>
          <a href="#" className="hover:text-yellow-200 transition">Komunitas</a>
          <a href="#" className="hover:text-yellow-200 transition">Games</a>
        </div>

        {/* Sumber Data */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Sumber data</h3>
          <a href="#" className="hover:text-yellow-200 transition">Kemendikbud.go.id</a>
          <a href="#" className="hover:text-yellow-200 transition">IPB University</a>
          <a href="#" className="hover:text-yellow-200 transition">PGpradjeka</a>
          <a href="#" className="hover:text-yellow-200 transition">Univ. Brawijaya</a>
          <a href="#" className="hover:text-yellow-200 transition">UGM</a>
          <a href="#" className="hover:text-yellow-200 transition">BBC</a>
        </div>

        {/* Credit */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Credit</h3>
          <p>Pinterest</p>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="relative z-10 text-center text-sm py-4 bg-[#2F4F12] -mt-4">
        © 2025 NutriVerse. All rights reserved.
      </div>
    </footer>
  );
}
