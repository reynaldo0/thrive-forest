import React, { useEffect, useState } from "react";

export default function RulesLeaderboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-[#F7FDEB]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl w-full">
        {/* Bagian Cara Main */}
        <div
          className={`bg-[#F4FFE2] rounded-3xl shadow-lg p-8 md:p-10 transition-all duration-700 ease-out ${
            animate
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3A2E17] mb-6 text-center">
            Cara main
          </h2>
          <ol className="list-decimal pl-5 space-y-4 text-[#3A2E17] text-lg md:text-xl leading-relaxed">
            <li>
              Pengguna dapat memilih produk tanaman yang tersedia untuk menanam{" "}
              <span className="text-green-600 font-semibold">(Maksimal 4)</span>
            </li>
            <li>
              Setelah dipilih, akan diberikan bibit dari tanaman tersebut. Bibit
              tersebut{" "}
              <span className="text-green-600 font-semibold">harus disirami</span>{" "}
              agar menjadi sebuah pohon dan menghasilkan produk tanaman.
            </li>
            <li>
              Ketika sudah menjadi produk, pengguna dapat menekan{" "}
              <span className="text-green-600 font-semibold">tombol donasi</span>{" "}
              untuk mendonasikan buah dan mendapatkan{" "}
              <span className="text-green-600 font-semibold">poin</span>.
            </li>
          </ol>
        </div>

        {/* Bagian Leaderboard */}
        <div
          className={`bg-[#F4FFE2] rounded-3xl shadow-lg p-8 md:p-10 transition-all duration-700 ease-out delay-200 ${
            animate
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3A2E17] mb-10 text-center">
            Leaderboard
          </h2>
          {/* Chart Bar */}
          <div className="flex items-end justify-center gap-12">
            {/* Bar #1 */}
            <div className="flex flex-col items-center">
              <p className="text-base md:text-lg font-medium text-[#3A2E17] mb-2 text-center">
                SMKN 24 <br /> Jakarta
              </p>
              <div className="bg-[#557A1F] flex flex-col items-center justify-end h-48 w-24 rounded-md shadow-md">
                <span className="text-white font-bold text-2xl">#1</span>
              </div>
              <p className="mt-2 text-green-800 font-bold text-xl md:text-2xl">
                1000
              </p>
            </div>

            {/* Bar #2 */}
            <div className="flex flex-col items-center">
              <p className="text-base md:text-lg font-medium text-[#3A2E17] mb-2 text-center">
                SMKN 24 <br /> Jakarta
              </p>
              <div className="bg-[#3A2E17] flex flex-col items-center justify-end h-36 w-24 rounded-md shadow-md">
                <span className="text-white font-bold text-2xl">#2</span>
              </div>
              <p className="mt-2 text-green-800 font-bold text-xl md:text-2xl">
                500
              </p>
            </div>

            {/* Bar #3 */}
            <div className="flex flex-col items-center">
              <p className="text-base md:text-lg font-medium text-[#3A2E17] mb-2 text-center">
                SMKN 24 <br /> Jakarta
              </p>
              <div className="bg-[#A7E48C] flex flex-col items-center justify-end h-24 w-24 rounded-md shadow-md">
                <span className="text-[#3A2E17] font-bold text-2xl">#3</span>
              </div>
              <p className="mt-2 text-green-800 font-bold text-xl md:text-2xl">
                300
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
