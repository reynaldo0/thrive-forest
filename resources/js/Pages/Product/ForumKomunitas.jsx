import { useState, useEffect } from "react";

export default function ForumKomunitas() {
  const [animateForm, setAnimateForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateForm(true), 200);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center w-full px-6 pt-16 pb-12 bg-[#FCFFEC] relative pb-60">
        <div
                className="absolute inset-0 bg-[url('/background/herokomunitas.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

      {/* Judul */}
      <h2
        className={`text-6xl md:text-7xl font-bold text-center text-[#3B3B0E] mb-12 tracking-wide transition-all duration-700 ease-out ${
          animateForm ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Forum Komunitas
      </h2>

      <div className="max-w-5xl w-full space-y-6">
        {/* Form Posting */}
        <div
          className={`bg-[#EDFFCD] border border-green-200 rounded-3xl p-8 shadow-2xl transition-all duration-700 ease-out ${
            animateForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <textarea
            placeholder="Tulis sesuatu..."
            className="w-full h-28 resize-none border-none rounded-xl bg-white focus:ring-2 focus:ring-green-400 p-4 outline-none text-base"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button className="px-6 py-3 rounded-xl bg-[#A6E272] text-[#224C14] text-base hover:bg-[#94D45E] active:scale-95 transition">
              Kirim
            </button>
          </div>
        </div>

        {/* Postingan */}
        <div
          className={`bg-[#EDFFCD] border border-green-200 rounded-3xl p-8 shadow-2xl transition-all duration-700 ease-out ${
            animateForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header user */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-5 rounded-full bg-green-600 animate-pulse"></span>
            <p className="font-semibold text-lg text-gray-800">Andi</p>
          </div>

          {/* Isi postingan */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Menciptakan generasi yang lebih baik dengan tujuan Zero Hunger
          </p>

          {/* Balasan */}
          <div>
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Balas
            </label>
            <textarea
              placeholder="Tulis balasan..."
              className="w-full h-28 resize-none border-none rounded-xl bg-white focus:ring-2 focus:ring-green-400 p-4 outline-none text-base"
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  );
}
