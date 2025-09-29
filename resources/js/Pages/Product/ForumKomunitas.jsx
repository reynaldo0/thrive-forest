import React from "react";

export default function ForumKomunitas() {
  return (
    <section id="forum-komunitas" className="min-h-screen w-full bg-[#f9fce9] relative px-6 py-12">
      {/* Judul */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3B3B0E] mb-12 animate-bounce">
        Forum Komunitas
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Form Posting */}
        <div className="bg-[#EDFFCD] border border-green-200 rounded-xl p-4 shadow hover:shadow-lg transition duration-300">
          <textarea
            placeholder="Tulis sesuatu..."
            className="w-full h-20 resize-none border-none rounded-lg bg-white focus:ring-2 focus:ring-green-400 p-3 outline-none text-sm"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button className="px-5 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 active:scale-95 transition">
              Kirim
            </button>
          </div>
        </div>

        {/* Postingan */}
        <div className="bg-[#EDFFCD] border border-green-200 rounded-xl p-4 shadow hover:shadow-lg transition duration-300">
          {/* Header user */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-4 rounded-full bg-green-600 animate-pulse"></span>
            <p className="font-semibold text-sm text-gray-800">Andi</p>
          </div>

          {/* Isi postingan */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Menciptakan generasi yang lebih baik dengan tujuan Zero Hunger
          </p>

          {/* Balasan */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Balas
            </label>
            <textarea
              placeholder="Tulis balasan..."
              className="w-full h-20 resize-none border-none rounded-lg bg-white focus:ring-2 focus:ring-green-400 p-3 outline-none text-sm"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Maskot di luar card, pojok kanan bawah layar */}
      <div className="fixed bottom-4 right-4 animate-bounce">
        <img
          src="/icon/maskot.png"
          alt="maskot"
          className="w-20 md:w-24 drop-shadow-xl"
        />
      </div>
    </section>
  );
}
