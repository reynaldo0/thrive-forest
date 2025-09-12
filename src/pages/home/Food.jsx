import { useState } from "react";
import { FaTrash, FaHandHoldingHeart, FaRecycle, FaTree } from "react-icons/fa";

const foodItems = [
  { 
    id: 1, 
    name: "🍞 Roti Sisa", 
    correct: ["donate", "compost"], 
    fact: "Roti masih bisa dimakan, lebih baik donasikan daripada dibuang." 
  },
  { 
    id: 2, 
    name: "🍎 Apel Setengah", 
    correct: ["donate", "compost"], 
    fact: "Buah segar bisa disumbangkan ke orang yang membutuhkan." 
  },
  { 
    id: 3, 
    name: "🍚 Nasi Sisa", 
    correct: ["donate", "compost"], 
    fact: "Nasi bisa diolah jadi menu lain atau disumbangkan." 
  },
  { 
    id: 4, 
    name: "🥦 Sayur Layu", 
    correct: ["compost"], 
    fact: "Sayuran yang sudah layu sebaiknya dijadikan kompos." 
  },
];

export default function Food() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [treeLevel, setTreeLevel] = useState(0); // 0 = bibit, 1 = kecil, 2 = besar

  const handleChoice = (choice) => {
    const item = foodItems[current];
    if (item.correct.includes(choice)) {
      setScore(score + 1);
      setFeedback("✅ Bagus! " + item.fact);
      if ((score + 1) % 2 === 0) {
        setTreeLevel(treeLevel + 1); // pohon tumbuh setiap 2 jawaban benar
      }
    } else {
      setFeedback("❌ Kurang tepat. " + item.fact);
    }

    setTimeout(() => {
      setFeedback("");
      if (current < foodItems.length - 1) {
        setCurrent(current + 1);
      } else {
        setFeedback("🎉 Misi selesai! Skor akhir: " + (score + 1));
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-yellow-100 p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow mb-4">
        ♻️ Food Rescue Mission
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mb-6 shadow-inner">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / foodItems.length) * 100}%` }}
        ></div>
      </div>

      {/* Tree Avatar */}
      <div className="flex items-center gap-3 mb-6">
        <FaTree className="text-green-700 text-5xl" />
        <p className="text-lg font-bold text-green-800">
          Pohonmu: {treeLevel === 0 ? "🌱 Bibit" : treeLevel === 1 ? "🌿 Kecil" : "🌳 Besar"}
        </p>
      </div>

      {/* Food Card */}
      {current < foodItems.length ? (
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-[320px] md:w-[420px] mb-8 transform transition hover:scale-105">
          <h2 className="text-3xl font-bold mb-4">{foodItems[current].name}</h2>
          <p className="text-gray-700">Apa yang harus dilakukan?</p>
        </div>
      ) : (
        <div className="bg-green-200 p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-green-800">🎉 Misi Selesai!</h2>
          <p className="mt-3 text-lg">Skor kamu: {score}/{foodItems.length}</p>
        </div>
      )}

      {/* Choices */}
      {current < foodItems.length && (
        <div className="flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => handleChoice("trash")}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition active:scale-95"
          >
            <FaTrash /> Buang
          </button>

          <button
            onClick={() => handleChoice("donate")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition active:scale-95"
          >
            <FaHandHoldingHeart /> Donasikan
          </button>

          <button
            onClick={() => handleChoice("compost")}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition active:scale-95"
          >
            <FaRecycle /> Kompos
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="mt-6 px-6 py-3 rounded-xl text-center font-semibold shadow-lg bg-white max-w-md">
          {feedback}
        </div>
      )}

      {/* Score */}
      <div className="mt-10 text-lg font-bold text-green-800">
        Skor: {score}
      </div>
    </div>
  );
}
