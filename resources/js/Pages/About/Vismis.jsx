import React, { useState } from "react";

export default function VisiMisi() {
  const [activeTab, setActiveTab] = useState("visi");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafbe9] font-sans px-4">
      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#3B3B0E] mb-10">
        Visi dan Misi
      </h1>

      {/* Card */}
      <div className="relative w-[90%] max-w-2xl">
        {/* Tabs */}
        <div className="absolute -top-5 left-0 right-0 flex justify-left gap-16">
          <button
            onClick={() => setActiveTab("visi")}
            className={`px-6 py-1 rounded-md font-bold shadow-md transition ${
              activeTab === "visi"
                ? "bg-[#3B3B0E] text-white"
                : "bg-[#3B3B0E]/70 text-white/80"
            }`}
          >
            Visi
          </button>
          <button
            onClick={() => setActiveTab("misi")}
            className={`px-6 py-1 rounded-md font-bold shadow-md transition ${
              activeTab === "misi"
                ? "bg-[#3B3B0E] text-white"
                : "bg-[#3B3B0E]/70 text-white/80"
            }`}
          >
            Misi
          </button>
        </div>

        {/* Isi card */}
        <div className="bg-[#f3fbdc] rounded-xl shadow-[6px_6px_0px_#d9e3c1] p-6 min-h-[220px]">
          {activeTab === "visi" ? (
            <p className="italic text-sm md:text-base text-justify leading-relaxed">
              Menjadi <span className="font-semibold">platform edukasi digital</span> yang
              inovatif dan terpercaya dalam memberikan pengetahuan praktis dan
              ilmiah tentang cara menanam tumbuhan yang baik, benar, dan
              berkelanjutan, guna mewujudkan masyarakat sehat, mandiri pangan,
              serta berkontribusi pada tercapainya Zero Hunger.
            </p>
          ) : (
            <ol className="list-decimal list-inside text-sm md:text-base text-justify space-y-2">
              <li>Menyediakan konten edukatif agar masyarakat sadar lingkungan.</li>
              <li>Memberikan informasi praktis terkait cara bercocok tanam.</li>
              <li>Membentuk komunitas peduli kelestarian hutan.</li>
              <li>Menyediakan media pembelajaran interaktif.</li>
              <li>
                Mengedukasi generasi muda tentang pentingnya SDGs Zero Hunger & Climate Action.
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
