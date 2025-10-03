import React, { useEffect, useState } from "react";

export default function RulesLeaderboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-[#F7FDEB]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-5xl w-full">
        {/* Bagian Peraturan */}
        <div
          className={`bg-[#F4FFE2] rounded-3xl shadow-2xl border-2 border-green-200 p-12 md:p-16 transition-all duration-700 ease-out ${
            animate
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3A2E17] mb-6 text-center tracking-wide">
            Peraturan
          </h2>
          <p className="text-[#3A2E17] text-lg md:text-xl leading-relaxed text-justify">
            Nutriverse menjawab tantangan{" "}
            <em className="font-semibold">“Zero Hunger”</em> dengan memberikan
            pengetahuan mengenai “Sintesis” kepada siswa-siswa untuk
            mengembangkan berbagai jenis tanaman unggulan dengan proses tertentu
            sehingga menghasilkan berbagai jenis tanaman dan hewan yang memiliki
            kuantitas dan kualitas yang baik.
          </p>
        </div>

        {/* Bagian Leaderboard */}
        <div
          className={`bg-[#F4FFE2] rounded-3xl shadow-2xl border-2 border-green-200 p-12 md:p-16 transition-all duration-700 ease-out delay-200 ${
            animate
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#3A2E17] mb-8 text-center tracking-wide">
            Leaderboard
          </h2>
          {/* Chart Bar */}
          <div className="flex items-end justify-center gap-10">
            {/* Bar 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3A5217] text-white font-bold flex flex-col items-center justify-center h-48 w-24 rounded-xl shadow-lg hover:scale-110 transition duration-500">
                <span className="text-2xl">319</span>
                <span className="text-sm">Million</span>
                <span className="text-sm">People</span>
              </div>
              <p className="mt-3 text-sm text-center">in acute hunger</p>
            </div>

            {/* Bar 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#A7E48C] flex items-center justify-center h-24 w-20 rounded-xl shadow-lg hover:scale-110 transition duration-500">
                <span className="text-sm text-[#3A2E17] font-bold">
                  Countries
                </span>
              </div>
              <p className="mt-3 text-sm text-center">where these people live</p>
            </div>

            {/* Bar 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3A2E17] text-white flex flex-col items-center justify-center h-36 w-24 rounded-xl shadow-lg hover:scale-110 transition duration-500">
                <span className="text-sm">Million</span>
                <span className="text-sm">People</span>
              </div>
              <p className="mt-3 text-sm text-center">
                WFP aims to reach in 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
