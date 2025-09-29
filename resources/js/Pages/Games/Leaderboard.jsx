import React, { useEffect, useState } from "react";

export default function RulesLeaderboard() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animasi setelah komponen muncul
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FDEB] flex flex-col items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Bagian Peraturan */}
        <div
          className={`bg-[#F4FFE2] p-6 rounded-xl shadow-md transition-all duration-700 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-[#3A2E17] mb-4 text-center">
            Peraturan
          </h2>
          <p className="text-[#3A2E17] leading-relaxed text-justify">
            Nutriverse menjawab tantangan <em>“Zero Hunger”</em> dengan
            memberikan pengetahuan mengenai “Sintesis” kepada siswa-siswa untuk
            mengembangkan berbagai jenis tanaman unggulan dengan proses tertentu
            sehingga menghasilkan berbagai jenis tanaman dan hewan yang memiliki
            kuantitas dan kualitas yang baik.
          </p>
        </div>

        {/* Bagian Leaderboard */}
        <div
          className={`bg-[#F4FFE2] p-6 rounded-xl shadow-md transition-all duration-700 delay-200 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-[#3A2E17] mb-6 text-center">
            Leaderboard
          </h2>
          {/* Chart Bar */}
          <div className="flex items-end justify-center gap-6">
            {/* Bar 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3A5217] text-white font-bold flex flex-col items-center justify-center h-40 w-20 rounded-md shadow-md hover:scale-105 transition duration-500">
                <span className="text-xl">319</span>
                <span className="text-sm">Million</span>
                <span className="text-sm">People</span>
              </div>
              <p className="mt-2 text-xs text-center">in acute hunger</p>
            </div>

            {/* Bar 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#A7E48C] flex items-center justify-center h-20 w-16 rounded-md shadow-md hover:scale-105 transition duration-500">
                <span className="text-xs text-[#3A2E17] font-bold">
                  Countries
                </span>
              </div>
              <p className="mt-2 text-xs text-center">where these people live</p>
            </div>

            {/* Bar 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#3A2E17] text-white flex flex-col items-center justify-center h-28 w-20 rounded-md shadow-md hover:scale-105 transition duration-500">
                <span className="text-sm">Million</span>
                <span className="text-sm">People</span>
              </div>
              <p className="mt-2 text-xs text-center">
                WFP aims to reach in 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
