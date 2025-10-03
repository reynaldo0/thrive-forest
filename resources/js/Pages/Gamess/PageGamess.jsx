import React, { useState, useEffect, useRef } from "react";

const items = [
  {
    id: "tomato",
    name: "Tomat",
    img: "/gamesicon/tomatt.png",
    questions: [
      {
        question: "Tomat kaya akan zat apa yang baik untuk kesehatan mata?",
        options: ["Vitamin A", "Vitamin D", "Protein", "Zat Besi"],
        answer: "Vitamin A",
      },
      {
        question: "Tomat adalah sumber utama dari zat apa yang memberi warna merah?",
        options: ["Likopen", "Kalsium", "Zat Besi", "Vitamin B12"],
        answer: "Likopen",
      },
      {
        question: "Manfaat lain tomat bagi tubuh adalah ...",
        options: [
          "Menurunkan risiko kanker",
          "Meningkatkan kolesterol jahat",
          "Meningkatkan gula darah",
          "Menyebabkan dehidrasi",
        ],
        answer: "Menurunkan risiko kanker",
      },
    ],
  },
  {
    id: "kedelai",
    name: "Kedelai",
    img: "/gamesicon/ubi.png",
    questions: [
      {
        question: "Kedelai merupakan sumber utama dari zat gizi apa?",
        options: ["Protein Nabati", "Karbohidrat", "Vitamin C", "Air"],
        answer: "Protein Nabati",
      },
      {
        question: "Salah satu manfaat kedelai ialah ...",
        options: [
          "Membantu pembentukan otot",
          "Menambah gula darah cepat",
          "Mengurangi serat",
          "Meningkatkan lemak jahat",
        ],
        answer: "Membantu pembentukan otot",
      },
      {
        question: "Produk olahan dari kedelai adalah ...",
        options: ["Tahu & Tempe", "Roti & Keju", "Susu Sapi", "Minyak Zaitun"],
        answer: "Tahu & Tempe",
      },
    ],
  },
  {
    id: "kacang_panjang",
    name: "Kacang Panjang",
    img: "/gamesicon/buncis.png",
    questions: [
      {
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
        question: "Vitamin apa yang banyak terdapat pada kacang panjang?",
        options: ["Vitamin C", "Vitamin D", "Vitamin B12", "Vitamin K"],
        answer: "Vitamin C",
      },
      {
        question: "Kacang panjang sering dikonsumsi sebagai ...",
        options: ["Sayur lalapan", "Minuman energi", "Buah segar", "Makanan instan"],
        answer: "Sayur lalapan",
      },
    ],
  },
  {
    id: "corn",
    name: "Jagung",
    img: "/gamesicon/jagung.png",
    questions: [
      {
        question:
          "Zat apa yang ada pada jagung yang membantu menjaga rasa kenyang lebih lama?",
        options: ["Karbohidrat", "Vitamin C", "Protein", "Serat"],
        answer: "Karbohidrat",
      },
      {
        question: "Jagung sering jadi sumber energi karena ...",
        options: [
          "Kandungan karbohidratnya",
          "Kandungan vitamin D",
          "Kandungan protein tinggi",
          "Kaya kalsium",
        ],
        answer: "Kandungan karbohidratnya",
      },
      {
        question: "Vitamin yang ada di jagung adalah ...",
        options: ["Vitamin B kompleks", "Vitamin K", "Vitamin D", "Vitamin A"],
        answer: "Vitamin B kompleks",
      },
    ],
  },
  {
    id: "banana",
    name: "Pisang",
    img: "/gamesicon/pisang.png",
    questions: [
      {
        question: "Zat apa yang ada pada pisang yang membuatnya kaya energi?",
        options: ["Karbohidrat", "Protein", "Lemak", "Vitamin D"],
        answer: "Karbohidrat",
      },
      {
        question: "Pisang juga kaya mineral apa yang membantu fungsi otot?",
        options: ["Kalium", "Zat Besi", "Selenium", "Yodium"],
        answer: "Kalium",
      },
      {
        question: "Pisang dapat membantu pencernaan karena mengandung ...",
        options: ["Serat", "Protein", "Vitamin D", "Lemak"],
        answer: "Serat",
      },
    ],
  },
  {
    id: "watermelon",
    name: "Semangka",
    img: "/gamesicon/semangka.png",
    questions: [
      {
        question: "Apa kandungan utama dalam semangka yang membuatnya menyegarkan?",
        options: ["Air", "Protein", "Vitamin B12", "Lemak"],
        answer: "Air",
      },
      {
        question: "Vitamin apa yang ada dalam semangka?",
        options: ["Vitamin C", "Vitamin D", "Vitamin K2", "Vitamin B12"],
        answer: "Vitamin C",
      },
      {
        question: "Semangka baik dikonsumsi di musim ...",
        options: ["Panas", "Dingin", "Hujan", "Gugur"],
        answer: "Panas",
      },
    ],
  },
  {
    id: "broccoli",
    name: "Sawi",
    img: "/gamesicon/sawi.png",
    questions: [
      {
        question: "Zat apa yang membuat sawi baik untuk sistem imun?",
        options: ["Vitamin C", "Zat Besi", "Karbohidrat", "Protein"],
        answer: "Vitamin C",
      },
      {
        question: "Sawi termasuk kelompok sayur ...",
        options: ["Cruciferous", "Umbi-umbian", "Buah", "Legum"],
        answer: "Cruciferous",
      },
      {
        question: "Sawi juga mengandung ...",
        options: ["Antioksidan", "Kolesterol tinggi", "Asam urat", "Lemak trans"],
        answer: "Antioksidan",
      },
    ],
  },
  {
    id: "jeruk",
    name: "Jeruk",
    img: "/gamesicon/jerukk.png",
    questions: [
      {
        question: "Buah jeruk dikenal kaya akan vitamin apa?",
        options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"],
        answer: "Vitamin C",
      },
      {
        question: "Selain vitamin C, jeruk memiliki antioksidan bernama ...",
        options: ["Flavonoid", "Lemak jenuh", "Kolesterol", "Asam urat"],
        answer: "Flavonoid",
      },
      {
        question: "Jeruk biasanya dikonsumsi dalam bentuk ...",
        options: ["Jus", "Gorengan", "Roti", "Bubur"],
        answer: "Jus",
      },
    ],
  },
];

// --- Komponen Game ---
export default function PageGamess() {
  const [plateItem, setPlateItem] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionLocked, setQuestionLocked] = useState(false);
  const [points, setPoints] = useState(0);

  const [offsetX, setOffsetX] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuestionLocked(false);
  }, [plateItem]);

  // Parallax
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
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const foundItem = items.find((i) => i.id === itemId);
    if (foundItem) setPlateItem(foundItem);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("itemId", id);
  };

  const handleAnswer = (opt) => {
    if (questionLocked) return;
    setSelectedAnswer(opt);
    setQuestionLocked(true);

    const currentQuestion = plateItem?.questions?.[currentQuestionIndex];
    if (currentQuestion && opt === currentQuestion.answer) {
      setPoints((p) => p + 10);
    }
  };

  const handleNextQuestion = () => {
    if (!plateItem) return;
    const total = plateItem.questions.length;
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setQuestionLocked(false);
    } else {
      setPlateItem(null);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setQuestionLocked(false);
    }
  };

  const handleClearPlate = () => {
    setPlateItem(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuestionLocked(false);
  };

  const currentQuestion = plateItem?.questions?.[currentQuestionIndex] ?? null;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-32 relative bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] overflow-hidden pb-60"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4">
        Games <span className="text-green-600">Edukasi</span>
      </h1>
      <p className="text-lg text-green-700 mb-8 text-center max-w-2xl">
        Tarik buah/sayur ke piring → jawab 3 pertanyaan per item.
      </p>

      {/* Card Game */}
      <div className="bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full">
        {/* Piring */}
        <div
          className="relative w-56 h-56 flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <img src="/gamesicon/piring.png" alt="Piring" className="absolute inset-0 w-full h-full object-contain" />

          {plateItem ? (
            <div className="flex flex-col items-center z-10">
              <img src={plateItem.img} alt={plateItem.name} className="w-28 h-28 object-contain" />
              <div className="mt-2 text-center text-sm font-semibold text-green-800">
                {plateItem.name} ({currentQuestionIndex + 1}/{plateItem.questions.length})
              </div>
            </div>
          ) : (
            <p className="absolute text-gray-500 text-center px-4 text-sm font-medium z-10">
              Tarik buah/sayur ke sini
            </p>
          )}
        </div>

        {/* Soal */}
        <div className="flex-1 w-full">
          {plateItem && currentQuestion ? (
            <div className="bg-white p-6 rounded-2xl shadow-md w-full">
              <p className="text-gray-800 mb-4 text-lg">{currentQuestion.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === currentQuestion.answer;

                  let btnClass =
                    "px-4 py-3 rounded-lg border font-medium transition-all duration-200 text-md ";

                  if (!questionLocked) {
                    btnClass += "bg-gray-100 border-gray-300 hover:bg-green-50 cursor-pointer";
                  } else {
                    if (isSelected) {
                      btnClass += isCorrect
                        ? "bg-green-200 border-green-500 text-green-800"
                        : "bg-red-200 border-red-500 text-red-700";
                    } else {
                      btnClass += isCorrect
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-gray-100 border-gray-300 text-gray-600 opacity-80";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      disabled={questionLocked}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={handleClearPlate}
                  className="px-5 py-2 bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-400"
                >
                  🔄 Ganti tanaman
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600"
                >
                  ➡️ Pertanyaan berikut
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 p-6 rounded-2xl shadow-md text-center text-gray-600">
              Tarik buah/sayur dari daftar ke piring, lalu jawab pertanyaan.
            </div>
          )}
        </div>
      </div>

      {/* List buah */}
      <div className="bg-[#F0FCD7] border-2 border-green-200 rounded-2xl shadow-lg mt-8 px-4 py-4">
        <div className="flex gap-4 flex-wrap justify-center">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="w-20 h-20 bg-white rounded-xl shadow-md hover:scale-110 flex items-center justify-center cursor-pointer border border-green-200"
            >
              <img src={item.img} alt={item.name} className="w-12 h-12 object-contain pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Poin */}
      <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md font-bold text-lg mt-8">
        ⭐ Poin Kamu: {points}
      </div>

      {/* Rumput parallax */}
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
