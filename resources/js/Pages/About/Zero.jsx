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
          <div className="bg-[#f5d77f] w-10 h-10 flex items-center justify-center rounded">
            <span className="text-[#3B3B0E] font-bold">2</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3B3B0E]">
            Zero Hunger
          </h2>
        </div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm md:text-base leading-relaxed">
          Hunger is discomfort or pain caused by a lack of food. It is different
          from food insecurity, which means lack of regular access to safe and
          nutritious food for proper development and an active and healthy life.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
        {/* Hunger stat */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-2 rounded-t-xl absolute -top-6 left-1/2 -translate-x-1/2 font-semibold">
            Hunger Stat
          </h3>

          <div className="grid grid-cols-3 text-center gap-4 mt-6">
            <div>
              <p className="text-3xl font-extrabold text-green-700">319</p>
              <p className="text-xs mt-1 text-gray-600">Million People</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">67</p>
              <p className="text-xs mt-1 text-gray-600">Countries</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">98</p>
              <p className="text-xs mt-1 text-gray-600">Million Children</p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="mt-8 w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={hungerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {hungerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Definition of famine */}
        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <h3 className="bg-[#3B3B0E] text-white px-6 py-2 rounded-t-xl absolute -top-6 left-1/2 -translate-x-1/2 font-semibold">
            Definition of Famine
          </h3>

          <div className="mt-8 w-full h-64">
            <ResponsiveContainer>
              <BarChart
                data={famineData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
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
