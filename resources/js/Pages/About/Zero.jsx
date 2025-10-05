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
  const [progress, setProgress] = useState({ households: 0, children: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress({ households: 20, children: 30 });
    }, 500);
  }, []);

  // Data untuk chart
  const hungerData = [
    { name: "Million People", value: 319 },
    { name: "Countries", value: 67 },
    { name: "Affected Children", value: 98 },
  ];

  const famineData = [
    { name: "Households", value: progress.households },
    { name: "Children", value: progress.children },
  ];

  const COLORS = ["#16a34a", "#65a30d", "#166534"];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-6 font-sans relative overflow-hidden bg-gradient-to-b from-[#fafbe9] via-[#ffe7b3] to-[#f5c16c]"
    >
      {/* Background tangan */}
      <div
        className="absolute bottom-0 left-0 w-full z-0"
        style={{
          backgroundImage: `url(/background/bg-tangan.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          height: "450px",
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
        <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed">
          Tujuan Pembangunan berkelanjutan (SDGs) kedua dari PBB yang bertujuan untuk{" "}
          <span style={{ color: "#DDA73A" }}>mengakhiri kelaparan global</span> pada tahun 2030,{" "}
          <span style={{ color: "#DDA73A" }}>mencapai ketahanan pangan</span>,{" "}
          <span style={{ color: "#DDA73A" }}>memperbaiki gizi</span>, dan{" "}
          <span style={{ color: "#DDA73A" }}>pertanian yang berkelanjutan</span>.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
        {/* Hunger stat */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-3 rounded-t-xl absolute -top-7 left-1/2 -translate-x-1/2 font-semibold text-lg md:text-xl lg:text-2xl">
            Statistik Kelaparan
          </h3>

          <div className="grid grid-cols-3 text-center gap-4 mt-8">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-green-700">{hungerData[0].value}</p>
              <p className="text-sm md:text-base mt-1 text-gray-600">{hungerData[0].name}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-600">{hungerData[1].value}</p>
              <p className="text-sm md:text-base mt-1 text-gray-600">{hungerData[1].name}</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-green-800">{hungerData[2].value}</p>
              <p className="text-sm md:text-base mt-1 text-gray-600">{hungerData[2].name}</p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="mt-10 w-full h-64 md:h-80 lg:h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={hungerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={{ fontSize: 14, fill: "#3B3B0E" }}
                >
                  {hungerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip wrapperStyle={{ fontSize: "14px" }} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Definition of famine */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-3 rounded-t-xl absolute -top-7 left-1/2 -translate-x-1/2 font-semibold text-lg md:text-xl lg:text-2xl">
            Definisi Kelaparan
          </h3>

          <div className="mt-10 w-full h-64 md:h-80 lg:h-96">
            <ResponsiveContainer>
              <BarChart
                data={famineData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 14 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 14 }} />
                <Tooltip wrapperStyle={{ fontSize: "14px" }} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Bar dataKey="value" fill="#16a34a" barSize={30}>
                  <Cell fill="#16a34a" />
                  <Cell fill="#166534" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
