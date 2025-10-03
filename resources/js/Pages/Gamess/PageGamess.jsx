import React, { useState, useEffect, useRef } from "react";

const items = [
  {
    id: "tomato",
    name: "Tomat",
    img: "/gamesicon/tomatt.png",
    question: "Tomat kaya akan zat apa yang baik untuk kesehatan mata?",
    options: ["Vitamin A", "Vitamin D", "Protein", "Zat Besi"],
    answer: "Vitamin A",
  },
  {
    id: "kedelai",
    name: "Kedelai",
    img: "/gamesicon/ubi.png",
    question: "Kedelai merupakan sumber utama dari zat gizi apa?",
    options: ["Protein Nabati", "Karbohidrat", "Vitamin C", "Air"],
    answer: "Protein Nabati",
  },
  {
    id: "kacang_panjang",
    name: "Kacang Panjang",
    img: "/gamesicon/buncis.png",
    question: "Kacang panjang kaya akan serat, bermanfaat untuk apa?",
    options: [
      "Melancarkan pencernaan",
      "Membentuk otot",
      "Meningkatkan penglihatan",
      "Menambah energi",
    ],
    answer: "Melancarkan pencernaan",
  },
  {
    id: "corn",
    name: "Jagung",
    img: "/gamesicon/jagung.png",
    question:
      "Zat apa yang ada pada jagung yang membantu menjaga rasa kenyang lebih lama?",
    options: ["Karbohidrat", "Vitamin C", "Protein", "Serat"],
    answer: "Karbohidrat",
  },
  {
    id: "banana",
    name: "Pisang",
    img: "/gamesicon/pisang.png",
    question: "Zat apa yang ada pada pisang yang membuatnya kaya energi?",
    options: ["Karbohidrat", "Protein", "Lemak", "Vitamin D"],
    answer: "Karbohidrat",
  },
  {
    id: "watermelon",
    name: "Semangka",
    img: "/gamesicon/semangka.png",
    question: "Apa kandungan utama dalam semangka yang membuatnya menyegarkan?",
    options: ["Air", "Protein", "Vitamin B12", "Lemak"],
    answer: "Air",
  },
  {
    id: "broccoli",
    name: "Sawi",
    img: "/gamesicon/sawi.png",
    question: "Zat apa yang membuat sawi baik untuk sistem imun?",
    options: ["Vitamin C", "Zat Besi", "Karbohidrat", "Protein"],
    answer: "Vitamin C",
  },
  {
    id: "jeruk",
    name: "Jeruk",
    img: "/gamesicon/jerukk.png",
    question: "Buah jeruk dikenal kaya akan vitamin apa?",
    options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"],
    answer: "Vitamin C",
  },
];

export default function PageGamess() {
  const [plateItem, setPlateItem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [points, setPoints] = useState(0);

  // --- Parallax State ---
  const [offsetX, setOffsetX] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let currentX = 0;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollPassed = windowHeight - rect.top;
      const targetX = scrollPassed > 0 ? scrollPassed * 0.2 : 0;

      const animate = () => {
        currentX += (targetX - currentX) * 0.15;
        setOffsetX(currentX);

        if (Math.abs(targetX - currentX) > 0.5) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData("itemId");
    const foundItem = items.find((i) => i.id === itemId);
    setPlateItem(foundItem);
    setSelectedAnswer(null);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("itemId", id);
  };

  const handleAnswer = (opt) => {
    setSelectedAnswer(opt);
    if (opt === plateItem.answer) {
      setPoints(points + 10);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] overflow-hidden"
    >
      {/* Judul */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-green-800 mb-6 tracking-wide drop-shadow transition-all duration-700">
        Games <span className="text-green-600">Edukasi</span>
      </h1>
      <p className="text-xl text-green-700 mb-12 text-center max-w-2xl">
        Pilih buah/sayur, lalu jawab kuisnya 🍎🥦
      </p>

      {/* Card Game */}
      <div className="bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl w-full transition-all duration-700">
        {/* Piring - Kiri */}
        <div
          className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <img
            src="/gamesicon/piring.png"
            alt="Piring"
            className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
          />
          {plateItem ? (
            <img
              src={plateItem.img}
              alt={plateItem.name}
              className="w-24 h-24 object-contain z-10 animate-[pop_0.6s_ease]"
            />
          ) : (
            <p className="absolute text-gray-500 text-center px-4 text-sm font-medium z-10">
              Tarik buah/sayur ke sini
            </p>
          )}
        </div>

        {/* Pertanyaan - Kanan */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          {plateItem && (
            <div className="bg-white p-6 rounded-2xl shadow-md w-full transition-all duration-500 ease-in-out animate-fadeIn">
              <p className="text-gray-800 font-medium mb-6 text-center md:text-left text-lg md:text-xl">
                {plateItem.question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plateItem.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className={`px-4 py-3 rounded-lg border font-medium transition-all duration-300 text-lg ${
                      selectedAnswer
                        ? opt === plateItem.answer
                          ? "bg-green-200 border-green-500 text-green-800"
                          : opt === selectedAnswer
                          ? "bg-red-200 border-red-500 text-red-700"
                          : "bg-gray-100 border-gray-300 text-gray-600"
                        : "bg-gray-100 border-gray-300 hover:bg-green-100 hover:scale-[1.02]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tombol */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => {
                setPlateItem(null);
                setSelectedAnswer(null);
              }}
              className="px-6 py-3 bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-400 active:scale-95 transition"
            >
              🔄 Ganti tanaman
            </button>
            <button
              onClick={() => {
                setPlateItem(null);
                setSelectedAnswer(null);
              }}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 active:scale-95 transition"
            >
              ➡️ Pertanyaan berikut
            </button>
          </div>
        </div>
      </div>

      {/* List buah/sayur */}
      <div className="bg-[#F0FCD7] border-2 border-green-200 rounded-2xl shadow-lg mt-12 px-6 py-4 flex items-center justify-center">
        <div className="flex gap-8 flex-wrap justify-center max-w-5xl">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="w-20 h-20 bg-white rounded-xl shadow-md hover:shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:rotate-3 active:scale-95 border border-green-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 object-contain select-none pointer-events-none animate-[bounce_2s_infinite]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Poin */}
      <div className="flex flex-wrap gap-6 mt-12 justify-center">
        <div className="bg-green-600 text-white px-8 py-4 rounded-xl shadow-md font-bold text-xl">
          ⭐ Poin Kamu: {points}
        </div>
      </div>

      {/* Rumput Parallax */}
      <div className="absolute bottom-0 left-0 w-full overflow-visible pointer-events-none">
        <img
          src="/icon/rumput2.png"
          alt="rumput kiri"
          className="absolute bottom-0 left-0 w-1/3 object-contain"
          style={{ transform: `translateX(-${offsetX}px)` }}
        />
        <img
          src="/icon/rumput1.png"
          alt="rumput kanan"
          className="absolute bottom-0 right-0 w-1/3 object-contain"
          style={{ transform: `translateX(${offsetX}px)` }}
        />
      </div>
    </section>
  );
}