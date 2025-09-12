import { useState, useEffect } from "react";
import { FaTint, FaAppleAlt, FaCarrot, FaLeaf } from "react-icons/fa";

const plantsData = [
  {
    id: "apple",
    name: "Pohon Apel",
    icon: <FaAppleAlt className="text-red-500 text-3xl" />,
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
    icon: <FaCarrot className="text-orange-500 text-3xl" />,
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
    icon: <FaLeaf className="text-green-500 text-3xl" />,
    stages: [
      "/plants/seed.png",
      "/plants/sprout.png",
      "/plants/spinach-mid.png",
      "/plants/spinach-ready.png",
    ],
  },
];

export default function FarmBuilder() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [growth, setGrowth] = useState({}); // simpan growth per tanaman
  const [message, setMessage] = useState(
    "Pilih tanamanmu untuk mulai menanam!"
  );

  // Update pesan tiap kali growth berubah
  useEffect(() => {
    if (!selectedPlant) return;
    const g = growth[selectedPlant.id] || 0;
    if (g === 0) setMessage("Tanam bibitmu 🌱 mulai petualanganmu!");
    if (g === 1) setMessage("Bibit mulai tumbuh, jangan lupa disiram 💧");
    if (g === 2) setMessage("Tanaman semakin besar 🌿 hampir siap panen!");
    if (g === 3) setMessage(`🎉 Selamat, ${selectedPlant.name} siap dipanen!`);
  }, [growth, selectedPlant]);

  const growPlant = () => {
    if (!selectedPlant) return;
    setGrowth((prev) => {
      const current = prev[selectedPlant.id] || 0;
      if (current < 3) return { ...prev, [selectedPlant.id]: current + 1 };
      return prev;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-200 p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow mb-6">
        🌾 Farm Builder
      </h1>

      {/* Message */}
      <p className="text-lg md:text-xl text-green-900 font-medium mb-8 text-center max-w-lg">
        {message}
      </p>

      {/* Plant Selector */}
      <div className="flex gap-6 mb-10 flex-wrap justify-center">
        {plantsData.map((plant) => (
          <button
            key={plant.id}
            onClick={() => setSelectedPlant(plant)}
            className={`flex flex-col items-center gap-2 px-5 py-4 rounded-xl shadow-lg border-2 transition transform hover:scale-105 ${
              selectedPlant?.id === plant.id
                ? "bg-green-600 text-white border-green-700"
                : "bg-white border-green-300 hover:bg-green-100"
            }`}
          >
            {plant.icon}
            <span className="font-semibold">{plant.name}</span>
          </button>
        ))}
      </div>

      {/* Farm Plot */}
      <div className="relative bg-yellow-100 border-4 border-yellow-700 rounded-xl w-[320px] h-[320px] flex items-center justify-center shadow-xl">
        {selectedPlant ? (
          <img
            src={selectedPlant.stages[growth[selectedPlant.id] || 0]}
            alt={selectedPlant.name}
            className="w-40 h-40 animate-pulse"
          />
        ) : (
          <p className="text-green-700 font-medium">🌱 Pilih tanaman dulu</p>
        )}
      </div>

      {/* Controls */}
      {selectedPlant && (
        <div className="mt-10 flex gap-6 flex-wrap justify-center">
          <button
            onClick={growPlant}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition active:scale-95"
          >
            <FaTint /> Siram Tanaman
          </button>

          {(growth[selectedPlant.id] || 0) === 3 && (
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition active:scale-95">
              <FaAppleAlt /> Panen & Donasi
            </button>
          )}
        </div>
      )}
    </div>
  );
}
