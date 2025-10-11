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
import { motion } from "framer-motion";

export default function GlobalHunger() {
  const [progress, setProgress] = useState({
    ghiTrend: [],
    ghiASEAN: [],
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress({
        ghiTrend: [
          { year: "2000", value: 26.1 },
          { year: "2007", value: 29.1 },
          { year: "2014", value: 22.2 },
          { year: "2022", value: 17.9 },
        ],
        ghiASEAN: [
          { country: "Laos", value: 19.2 },
          { country: "Indonesia", value: 17.9 },
          { country: "Kamboja", value: 17.1 },
          { country: "Myanmar", value: 15.6 },
          { country: "Malaysia", value: 12.5 },
          { country: "Thailand", value: 12.0 },
          { country: "Vietnam", value: 11.9 },
        ],
      });
    }, 800);
  }, []);

  const COLORS = ["#166534", "#84cc16", "#a3e635", "#65a30d", "#3f6212", "#bef264", "#d9f99d"];
  const latestGHI = progress.ghiTrend.length > 0 ? progress.ghiTrend[progress.ghiTrend.length - 1].value : 0;

  const indonesiaGHI =
    progress.ghiASEAN.length > 0
      ? progress.ghiASEAN.find((c) => c.country === "Indonesia")?.value
      : 0;

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-2 text-sm md:text-base">
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                backgroundColor: entry.color,
              }}
              className="rounded-sm"
            />
            {entry.payload.country}: {entry.payload.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen relative py-24 px-6 font-sans overflow-hidden bg-[#FCFFEC] pb-11"
    >
      <div
        className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
        style={{ backgroundAttachment: "fixed" }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#3B3B0E] inline-block relative">
            Tingkat Kelaparan di Indonesia
            <span className="block w-24 h-1 bg-[#DDA73A] mx-auto mt-3 rounded-full" />
          </h2>
          <p className="max-w-4xl mx-auto mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
            Berdasarkan laporan{" "}
            <span className="text-[#DDA73A] font-semibold">Global Hunger Index (GHI) 2022</span>,
            Indonesia menempati peringkat{" "}
            <span className="font-bold text-[#166534]">77 dari 121 negara</span> dengan skor{" "}
            <span className="text-[#DDA73A] font-semibold">{indonesiaGHI}</span>, menunjukkan tingkat kelaparan{" "}
            <span className="italic">“moderate”</span>. Meskipun ada kemajuan signifikan, langkah
            menuju{" "}
            <span className="text-[#DDA73A] font-semibold">Zero Hunger (SDG 2)</span> masih
            membutuhkan komitmen berkelanjutan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#84cc16] to-[#166534]" />
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3B3B0E] mb-6 text-center">
              Tren Skor GHI Indonesia (2000–2022)
            </h3>

            <div className="w-full h-72 md:h-96">
              <ResponsiveContainer>
                <BarChart data={progress.ghiTrend} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tick={{ fontSize: 14 }} />
                  <YAxis
                    tick={{ fontSize: 14 }}
                    label={{
                      value: "Skor GHI",
                      angle: -90,
                      position: "insideLeft",
                      fontSize: 14,
                    }}
                  />
                  <Tooltip contentStyle={{ fontSize: "14px" }} />
                  <Legend wrapperStyle={{ fontSize: "14px" }} />
                  <Bar dataKey="value" barSize={45} radius={[8, 8, 0, 0]}>
                    {progress.ghiTrend.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center italic">
              Sumber: Global Hunger Index – Data per tahun 2000–2022.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#84cc16] to-[#166534]" />
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3B3B0E] mb-6 text-center">
              Perbandingan GHI Negara ASEAN (2022)
            </h3>

            <div className="w-full h-72 md:h-96">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={progress.ghiASEAN}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    label={({ country, value }) => `${country}: ${value}`}
                    labelLine={true}
                  >
                    {progress.ghiASEAN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "14px" }} />
                  <Legend content={renderCustomLegend} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center italic">
              Sumber: Global Hunger Index 2022 – Perbandingan antar negara ASEAN.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <p className="text-gray-800 text-lg leading-relaxed">
            Dengan skor{" "}
            <span className="text-[#166534] font-semibold">{latestGHI}</span>, Indonesia berada di level{" "}
            <strong>kelaparan sedang</strong>, namun menunjukkan peningkatan yang nyata dibandingkan
            dua dekade terakhir. Tantangan seperti <strong>stunting</strong> dan{" "}
            <strong>kekurangan gizi</strong> masih perlu diatasi untuk mewujudkan{" "}
            <span className="text-[#DDA73A] font-semibold">Zero Hunger 2030</span>.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
