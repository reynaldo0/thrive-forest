import { useState, useEffect } from "react";
import { FaTint, FaAppleAlt, FaCarrot, FaLeaf, FaGift } from "react-icons/fa";

const plantsData = [
  {
    id: "apple",
    name: "Pohon Apel",
    icon: <FaAppleAlt className="text-red-500 text-2xl" />,
    stages: [
      "/plants/seed.png",
      "/plants/sprout.png",
      "/plants/tree-small.png",
      "/plants/tree-fruit.png",
    ],
  },
  {
    id: "carrot",
    name: "Wortel",
    icon: <FaCarrot className="text-orange-500 text-2xl" />,
    stages: [
      "/plants/seed.png",
      "/plants/sprout.png",
      "/plants/carrot-mid.png",
      "/plants/carrot-ready.png",
    ],
  },
  {
    id: "spinach",
    name: "Bayam",
    icon: <FaLeaf className="text-green-500 text-2xl" />,
    stages: [
      "/plants/seed.png",
      "/plants/sprout.png",
      "/plants/spinach-mid.png",
      "/plants/spinach-ready.png",
    ],
  },
];

export default function FarmBuilder() {
  const [plots, setPlots] = useState(Array(4).fill(null));
  const [growth, setGrowth] = useState({});
  const [inventory, setInventory] = useState({});
  const [donations, setDonations] = useState({});
  const [energy, setEnergy] = useState(5);

  // recharge energi setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => (prev < 5 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const plantSeed = (plotIndex, plant) => {
    if (!plots[plotIndex]) {
      const newPlots = [...plots];
      newPlots[plotIndex] = plant;
      setPlots(newPlots);
      setGrowth((prev) => ({ ...prev, [plant.id + plotIndex]: 0 }));
    }
  };

  const waterPlant = (plotIndex, plant) => {
    if (energy === 0) return alert("⚡ Energi habis, tunggu recharge!");
    const key = plant.id + plotIndex;
    setGrowth((prev) => {
      const current = prev[key] || 0;
      if (current < 3) {
        setEnergy((e) => e - 1);
        return { ...prev, [key]: current + 1 };
      }
      return prev;
    });
  };

  const harvestPlant = (plotIndex, plant) => {
    const key = plant.id + plotIndex;
    if (growth[key] === 3) {
      setInventory((prev) => ({
        ...prev,
        [plant.id]: (prev[plant.id] || 0) + 1,
      }));
      const newPlots = [...plots];
      newPlots[plotIndex] = null;
      setPlots(newPlots);
    }
  };

  const donate = (plantId) => {
    if (inventory[plantId] > 0) {
      setInventory((prev) => ({ ...prev, [plantId]: prev[plantId] - 1 }));
      setDonations((prev) => ({
        ...prev,
        [plantId]: (prev[plantId] || 0) + 1,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow mb-8">
        🌾 Farm Builder
      </h1>

      <p className="mb-10 text-green-900 font-medium bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full shadow">
        ⚡ Energi: <span className="font-bold">{energy}</span>/5
      </p>

      <div className="grid lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* KIRI: Farm & Plant Selector */}
        <div className="flex flex-col items-center gap-8 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          {/* Plant Selector */}
          <div className="flex gap-6 flex-wrap justify-center">
            {plantsData.map((plant) => (
              <button
                key={plant.id}
                className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl shadow-md bg-white border-2 border-green-300 hover:bg-green-100 transition"
                onClick={() => plantSeed(plots.indexOf(null), plant)}
                disabled={!plots.includes(null)}
              >
                {plant.icon}
                <span className="font-semibold">{plant.name}</span>
              </button>
            ))}
          </div>

          {/* Farm Plots */}
          <div className="grid grid-cols-2 gap-6">
            {plots.map((plant, i) => {
              if (!plant)
                return (
                  <div
                    key={i}
                    className="w-40 h-40 bg-yellow-100 border-4 border-yellow-700 rounded-xl flex items-center justify-center shadow font-medium text-yellow-800"
                  >
                    🌱 Kosong
                  </div>
                );
              const key = plant.id + i;
              const stage = growth[key] || 0;
              return (
                <div
                  key={i}
                  className="w-40 h-40 bg-yellow-50 border-4 border-yellow-700 rounded-xl flex flex-col items-center justify-center shadow p-2"
                >
                  <img
                    src={plant.stages[stage]}
                    alt={plant.name}
                    className="w-20 h-20"
                  />
                  <div className="flex gap-2 mt-2">
                    {stage < 3 ? (
                      <button
                        onClick={() => waterPlant(i, plant)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        <FaTint />
                      </button>
                    ) : (
                      <button
                        onClick={() => harvestPlant(i, plant)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Panen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KANAN: Inventori & Donasi */}
        <div className="flex flex-col gap-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              📦 Inventori
            </h2>
            {Object.keys(inventory).length === 0 ? (
              <p className="text-gray-500">Belum ada hasil panen</p>
            ) : (
              <div className="flex gap-4 flex-wrap">
                {Object.entries(inventory).map(([id, count]) => {
                  const plant = plantsData.find((p) => p.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg shadow"
                    >
                      {plant.icon}
                      <span className="font-medium">{count}</span>
                      <button
                        onClick={() => donate(id)}
                        className="ml-2 bg-yellow-400 px-2 py-1 rounded text-sm hover:bg-yellow-500 flex items-center gap-1"
                      >
                        <FaGift /> Donasi
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-green-700 text-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🎁 Donasi Terkumpul</h2>
            {Object.keys(donations).length === 0 ? (
              <p>Belum ada donasi</p>
            ) : (
              <ul className="space-y-2">
                {Object.entries(donations).map(([id, count]) => {
                  const plant = plantsData.find((p) => p.id === id);
                  return (
                    <li
                      key={id}
                      className="flex items-center gap-3 bg-green-800/70 px-4 py-2 rounded-lg"
                    >
                      {plant.icon}
                      <span>
                        {plant.name} : {count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
