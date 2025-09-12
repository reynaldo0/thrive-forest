import { useState } from "react";

const foods = [
  {
    id: 1,
    name: "🍚 Nasi",
    type: "karbo",
    color: "from-yellow-200 to-yellow-400",
  },
  {
    id: 2,
    name: "🥦 Brokoli",
    type: "sayur",
    color: "from-green-200 to-green-400",
  },
  { id: 3, name: "🍎 Apel", type: "buah", color: "from-red-200 to-red-400" },
  {
    id: 4,
    name: "🍗 Ayam",
    type: "protein",
    color: "from-orange-200 to-orange-400",
  },
  {
    id: 5,
    name: "🥕 Wortel",
    type: "sayur",
    color: "from-pink-200 to-pink-400",
  },
];

export default function BalancedPlate() {
  const [plate, setPlate] = useState([]);
  const [message, setMessage] = useState("Tarik makanan ke piringmu!");
  const [score, setScore] = useState(0);

  const handleDrop = (food) => {
    if (plate.find((f) => f.id === food.id)) return;
    setPlate([...plate, food]);

    // Rules edukasi
    if (food.type === "sayur") {
      setMessage("🥦 Bagus! Sayur kaya vitamin.");
      setScore(score + 20);
    } else if (food.type === "buah") {
      setMessage("🍎 Mantap! Buah menambah energi sehat.");
      setScore(score + 15);
    } else if (food.type === "karbo") {
      setMessage("🍚 Karbo untuk tenaga, jangan berlebihan ya.");
      setScore(score + 10);
    } else if (food.type === "protein") {
      setMessage("🍗 Protein bantu tumbuh kembang.");
      setScore(score + 15);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow-lg tracking-wide text-center">
        🍽️ Piring Seimbang Digital
      </h1>
      <p className="mt-2 text-lg text-green-700/80 text-center">
        Susun makanan sehatmu & lihat pohonmu tumbuh 🌱
      </p>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl mt-10 items-center justify-center">
        {/* Food List */}
        <div className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-xl p-6 w-full md:w-1/3">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            Pilih Makanan
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {foods.map((food) => (
              <div
                key={food.id}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("food", JSON.stringify(food))
                }
                className={`cursor-grab rounded-2xl p-4 text-center text-xl font-bold shadow-md 
                  bg-gradient-to-br ${food.color} 
                  hover:scale-105 hover:shadow-lg transition transform`}
              >
                {food.name}
              </div>
            ))}
          </div>
        </div>

        {/* Plate Drop Zone */}
        <div
          className="relative w-80 h-80 rounded-full border-8 border-white/60 bg-white/40 backdrop-blur-lg shadow-2xl flex items-center justify-center transition-all"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const data = e.dataTransfer.getData("food");
            if (data) handleDrop(JSON.parse(data));
          }}
        >
          {plate.length === 0 ? (
            <p className="text-gray-400 font-medium">
              Tarik makanan ke sini 🍴
            </p>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-3 p-4">
              {plate.map((food) => (
                <span
                  key={food.id}
                  className="text-3xl animate-bounce"
                  style={{ animationDuration: "1s" }}
                >
                  {food.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feedback */}
      <div className="mt-8 text-lg font-semibold text-green-900 text-center">
        {message}
      </div>

      {/* Score + Tree Avatar */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-2xl font-bold text-green-800 drop-shadow">
          Skor: <span className="text-yellow-600">{score}</span>
        </p>
        <img
          src={
            score >= 60
              ? "/trees/tree-big.png"
              : score >= 30
              ? "/trees/tree-medium.png"
              : "/trees/tree-small.png"
          }
          alt="Tree Avatar"
          className="w-44 h-auto mt-4 transition-all duration-700 ease-in-out"
        />
      </div>
    </div>
  );
}
