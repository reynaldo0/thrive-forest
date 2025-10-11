import { useEffect, useState, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function ZeroHunger() {
  const [progress, setProgress] = useState({
    kerawanan: 0,
    undernourishment: 0,
    fies: 0,
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    // Animasikan progres statistik
    setTimeout(() => {
      setProgress({
        kerawanan: 21.5,
        undernourishment: 8.53,
        fies: 4.5,
      });
    }, 800);
  }, []);

  // Data produksi pangan berdasarkan artikel Badan Pangan Nasional
  const stockData = [
    { name: "Beras", value: 8398 },
    { name: "Jagung Pakan", value: 3665 },
    { name: "Gula", value: 1478 },
    { name: "Daging Ayam", value: 283 },
    { name: "Telur Ayam", value: 177 },
    { name: "Daging Sapi & Kerbau", value: 68 },
  ];

  // Data indikator ketahanan pangan
  const foodSecurityData = [
    { name: "Kerawanan Pangan Akut (%)", value: progress.kerawanan },
    { name: "Prevalensi Undernourishment (%)", value: progress.undernourishment },
    { name: "Prevalensi FIES (Sedang/Berat) (%)", value: progress.fies },
  ];

  const COLORS = ["#16a34a", "#65a30d", "#166534", "#3f6212", "#84cc16", "#a3e635"];

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-6 font-sans relative overflow-hidden bg-gradient-to-b from-[#fafbe9] via-[#ffe7b3] to-[#f5c16c]"
    >
      {/* Background tangan */}
      <div
        className="absolute bottom-0 left-0 w-full z-0"
        style={{
          backgroundImage: `url(/background/bg-tangan.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          height: "480px",
        }}
      />

      {/* Judul */}
      <div className="relative text-center mb-12 z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <img
            src="/icon/zerohunger.png"
            alt="SDG 2 Icon"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3B3B0E]">
            Zero Hunger
          </h2>
        </div>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed">
          Pemerintah Indonesia melalui{" "}
          <span className="text-[#DDA73A] font-semibold">Badan Pangan Nasional (NFA)</span> terus
          memperkuat ketahanan pangan nasional dalam rangka mewujudkan{" "}
          <span className="text-[#DDA73A] font-semibold">Zero Hunger</span> pada tahun 2030. Data
          terbaru menunjukkan tren positif dalam penyediaan pangan pokok dan penurunan prevalensi
          kerawanan pangan di Indonesia.
        </p>
      </div>

      {/* Grid utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto relative z-10">
        {/* Produksi dan stok pangan nasional */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-3 rounded-t-xl absolute -top-7 left-1/2 -translate-x-1/2 font-semibold text-xl md:text-2xl">
            Proyeksi Stok Pangan Pokok Nasional 2024
          </h3>

          <div className="mt-10 w-full h-72 md:h-96">
            <ResponsiveContainer>
              <BarChart
                data={stockData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis
                  tick={{ fontSize: 14 }}
                  label={{
                    value: "Juta Ton",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: 14,
                  }}
                />
                <Tooltip wrapperStyle={{ fontSize: "14px" }} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Bar dataKey="value" fill="#65a30d" barSize={40}>
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center italic">
            Sumber: Badan Pangan Nasional, 2024 – Stok akhir pangan pokok strategis Indonesia.
          </p>
        </div>

        {/* Indikator ketahanan pangan */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-3 rounded-t-xl absolute -top-7 left-1/2 -translate-x-1/2 font-semibold text-xl md:text-2xl">
            Indikator Ketahanan & Kerawanan Pangan 2023
          </h3>

          <div className="mt-10 w-full h-72 md:h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={foodSecurityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={true}
                >
                  {foodSecurityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip wrapperStyle={{ fontSize: "14px" }} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center italic">
            Sumber: NFA & FAO, 2023 – Penurunan prevalensi kerawanan pangan di Indonesia.
          </p>
        </div>
      </div>

      {/* Penjelasan & Link Artikel */}
      <div className="max-w-5xl mx-auto mt-14 text-center z-10 relative">
        <p className="text-gray-800 text-lg leading-relaxed">
          Pada tahun 2023, Indonesia berhasil menurunkan{" "}
          <strong>Prevalence of Undernourishment (PoU)</strong> menjadi{" "}
          <span className="text-[#166534] font-semibold">8,53%</span> dan{" "}
          <strong>Prevalence of Food Insecurity (FIES)</strong> menjadi{" "}
          <span className="text-[#166534] font-semibold">4,5%</span>, turun hampir setengahnya dari
          tahun 2017 yang masih 8,66%. Selain itu, daerah dengan status{" "}
          <strong>rawan pangan</strong> juga menurun dari 74 menjadi 62 kabupaten/kota.
        </p>

        <a
          href="https://badanpangan.go.id/blog/post/dukung-atasi-zero-hunger-badan-pangan-nasional-perkuat-ketersediaan-pangan-pokok-strategis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-8 py-4 bg-[#88A825] text-white font-semibold rounded-full shadow-md hover:bg-[#6e881f] transition-all duration-300"
        >
          Baca Artikel Lengkap di Situs Resmi NFA →
        </a>
      </div>
    </section>
  );
}
