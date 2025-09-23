import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub, 
} from "react-icons/fa";

export default function Vismis() {
  return (
    <div className="font-sans bg-gradient-to-b from-[#f8fbe9] to-[#cde5a6] text-[#3a3a1e]">
      <style>
        {`
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>

      {/* Visi dan Misi */}
      <section className="text-center py-12">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ animation: "fadeInDown 1s ease-out" }}
        >
          Visi dan Misi EduForest
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Visi */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-72 hover:scale-105 transition-transform duration-300"
               style={{ animation: "fadeInUp 1s ease-out" }}>
            <h2 className="text-lg font-bold mb-2 bg-green-200 rounded-lg px-4 py-1 inline-block">
              VISI
            </h2>
            <p className="text-sm mt-2">
              Menjadi platform edukasi digital yang inovatif dan inspiratif dalam
              memberikan pengetahuan, keterampilan, dan kesadaran kepada
              masyarakat tentang pentingnya kelestarian lingkungan hidup,
              khususnya melalui edukasi seputar kehutanan, pertanian, dan
              pengelolaan sumber daya alam berkelanjutan.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-72 hover:scale-105 transition-transform duration-300"
               style={{ animation: "fadeInUp 1s ease-out 0.3s both" }}>
            <h2 className="text-lg font-bold mb-2 bg-green-200 rounded-lg px-4 py-1 inline-block">
              MISI
            </h2>
            <ol className="text-sm list-decimal list-inside text-left space-y-1 mt-2">
              <li>Menyediakan konten edukatif bagi masyarakat agar sadar lingkungan.</li>
              <li>Memberikan informasi praktis terkait cara bercocok tanam.</li>
              <li>Membentuk komunitas peduli kelestarian hutan.</li>
              <li>Menyediakan media pembelajaran interaktif.</li>
              <li>Mengedukasi generasi muda tentang SDGs Zero Hunger & Climate Action.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Zero Hunger */}
      <section className="text-center py-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2"
               style={{ animation: "bounce 2s infinite" }}>
            <span className="bg-yellow-200 p-2 rounded-md">🍲</span>
            <h2 className="text-2xl font-bold">Zero Hunger</h2>
          </div>
          <p className="text-sm mt-4 max-w-2xl">
            Hunger is discomfort or pain caused by a lack of food. It is
            different from food insecurity, which means lack of regular access
            to safe and nutritious food for proper development and an active and
            healthy life.
          </p>
        </div>

        {/* Hunger Stats & Definition */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 w-72"
               style={{ animation: "fadeInUp 1s ease-out" }}>
            <h3 className="font-bold text-lg mb-2">Hunger stat</h3>
            <p className="text-sm">In 2020 hunger increased worldwide</p>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div>
                <p className="text-2xl font-bold">319</p>
                <p className="text-xs">Million</p>
              </div>
              <div>
                <p className="text-2xl font-bold">67</p>
                <p className="text-xs">Regions</p>
              </div>
              <div>
                <p className="text-2xl font-bold">98</p>
                <p className="text-xs">Countries</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 w-72"
               style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}>
            <h3 className="font-bold text-lg mb-2">Definition of famine</h3>
            <p className="text-sm mb-4">
              A famine occurs when food shortage leads to widespread hunger and
              malnutrition.
            </p>
            <div className="flex justify-between text-center">
              <div>
                <p className="text-2xl font-bold">29%</p>
                <p className="text-xs">Undernourished</p>
              </div>
              <div>
                <p className="text-2xl font-bold">30%</p>
                <p className="text-xs">Children stunting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Nutriverse */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Team Nutriverse</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {[1, 2, 3].map((i, idx) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 w-60 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              style={{ animation: `fadeInUp 1s ease-out ${idx * 0.3}s both` }}
            >
              <div className="h-32 bg-green-100 rounded-lg mb-4"></div>
              <h3 className="font-bold">Lorem Ipsum</h3>
              <p className="text-sm">lorem ipsum</p>
              <div className="flex justify-center gap-3 mt-3">
                <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaGithub /></a>
                <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaInstagram /></a>
                <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaLinkedinIn /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-left py-6 bg-green-900 text-white">
        <p>EduForest .......................</p>
        <div className="flex justify-center gap-4 mt-3">
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaFacebookF /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaTwitter /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaInstagram /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaLinkedinIn /></a>
            <a href="#" className="hover:scale-125 hover:rotate-6 transition-transform duration-300"><FaYoutube /></a>        </div>
      </footer>
    </div>
  );
}
