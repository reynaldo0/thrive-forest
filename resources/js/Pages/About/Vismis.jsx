import React, { useState, useEffect } from "react";

export default function VisiMisi() {
  const [activeTab, setActiveTab] = useState("visi");
  const [animateCard, setAnimateCard] = useState(false);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCard(true), 200);
    setTimeout(() => setAnimateText(true), 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafbe9] font-sans px-6 pt-16 pb-12 relative">
      {/* Judul */}
      <h1
        className={`text-5xl md:text-6xl font-extrabold text-[#3B3B0E] mb-12 tracking-wide transition-all duration-700 ease-out ${
          animateText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Visi dan <span className="text-green-600">Misi</span>
      </h1>

      {/* Card */}
      <div
        className={`bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-10 md:p-14 flex flex-col gap-10 max-w-5xl w-full transition-all duration-700 ease-out ${
          animateCard
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-90"
        }`}
      >
        {/* Tabs */}
        <div className="flex justify-center gap-8">
          <button
            onClick={() => setActiveTab("visi")}
            className={`px-8 py-2 rounded-md font-bold shadow-md transition-all text-lg ${
              activeTab === "visi"
                ? "bg-[#3B3B0E] text-white scale-105"
                : "bg-[#3B3B0E]/70 text-white/80 hover:scale-105"
            }`}
          >
            Visi
          </button>
          <button
            onClick={() => setActiveTab("misi")}
            className={`px-8 py-2 rounded-md font-bold shadow-md transition-all text-lg ${
              activeTab === "misi"
                ? "bg-[#3B3B0E] text-white scale-105"
                : "bg-[#3B3B0E]/70 text-white/80 hover:scale-105"
            }`}
          >
            Misi
          </button>
        </div>

        {/* Isi card */}
        <div className="text-[#2C2C2C] text-xl md:text-2xl leading-relaxed transition-all duration-700 ease-out">
          {activeTab === "visi" ? (
            <p
              className={`italic text-justify transition-all duration-700 ${
                animateText
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              Menjadi{" "}
              <span className="font-semibold">
                platform edukasi digital
              </span>{" "}
              yang inovatif dan terpercaya dalam memberikan pengetahuan praktis
              dan ilmiah tentang cara menanam tumbuhan yang baik, benar, dan
              berkelanjutan, guna mewujudkan masyarakat sehat, mandiri pangan,
              serta berkontribusi pada tercapainya Zero Hunger.
            </p>
          ) : (
            <ol
              className={`list-decimal list-inside space-y-3 text-justify transition-all duration-700 ${
                animateText
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <li>Menyediakan konten edukatif agar masyarakat sadar lingkungan.</li>
              <li>Memberikan informasi praktis terkait cara bercocok tanam.</li>
              <li>Membentuk komunitas peduli kelestarian hutan.</li>
              <li>Menyediakan media pembelajaran interaktif.</li>
              <li>
                Mengedukasi generasi muda tentang pentingnya SDGs Zero Hunger &
                Climate Action.
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
