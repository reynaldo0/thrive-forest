import React, { useState, useEffect, useRef } from "react";
import { FaUtensils, FaRedo, FaArrowRight, FaStar } from "react-icons/fa";

// --- Data Buah & Sayur ---
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
        question:
          "Tomat adalah sumber utama dari zat apa yang memberi warna merah?",
        options: ["Kalsium", "Likopen", "Vitamin B12", "Zat Besi"],
        answer: "Likopen",
      },
      {
        question: "Manfaat lain tomat bagi tubuh adalah ...",
        options: [
          "Meningkatkan gula darah",
          "Menurunkan risiko kanker",
          "Menyebabkan dehidrasi",
          "Meningkatkan kolesterol jahat",
        ],
        answer: "Menurunkan risiko kanker",
      },
    ],
  },
  {
    id: "ubi",
    name: "Ubi",
    img: "/gamesicon/ubi.png",
    questions: [
      {
        question: "Ubi termasuk dalam kelompok sumber gizi apa?",
        options: ["Protein", "Karbohidrat", "Lemak", "Vitamin D"],
        answer: "Karbohidrat",
      },
      {
        question: "Kandungan apa pada ubi yang bermanfaat untuk kesehatan mata?",
        options: ["Beta-karoten", "Vitamin K", "Zat Besi", "Omega-3"],
        answer: "Beta-karoten",
      },
      {
        question: "Olahan makanan populer dari ubi adalah ...",
        options: ["Tempe & Tahu", "Singkong goreng", "Kolak ubi", "Kerupuk ikan"],
        answer: "Kolak ubi",
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
          "Membentuk otot",
          "Melancarkan pencernaan",
          "Menambah energi",
          "Meningkatkan penglihatan",
        ],
        answer: "Melancarkan pencernaan",
      },
      {
        question: "Vitamin apa yang banyak terdapat pada kacang panjang?",
        options: ["Vitamin D", "Vitamin C", "Vitamin K", "Vitamin B12"],
        answer: "Vitamin C",
      },
      {
        question: "Kacang panjang sering dikonsumsi sebagai ...",
        options: ["Minuman energi", "Sayur lalapan", "Buah segar", "Makanan instan"],
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
        options: ["Protein", "Karbohidrat", "Serat", "Vitamin C"],
        answer: "Karbohidrat",
      },
      {
        question: "Jagung sering jadi sumber energi karena ...",
        options: [
          "Kaya kalsium",
          "Kandungan karbohidratnya",
          "Kandungan vitamin D",
          "Kandungan protein tinggi",
        ],
        answer: "Kandungan karbohidratnya",
      },
      {
        question: "Vitamin yang ada di jagung adalah ...",
        options: ["Vitamin A", "Vitamin B kompleks", "Vitamin D", "Vitamin K"],
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
        options: ["Protein", "Karbohidrat", "Vitamin D", "Lemak"],
        answer: "Karbohidrat",
      },
      {
        question: "Pisang juga kaya mineral apa yang membantu fungsi otot?",
        options: ["Yodium", "Zat Besi", "Kalium", "Selenium"],
        answer: "Kalium",
      },
      {
        question: "Pisang dapat membantu pencernaan karena mengandung ...",
        options: ["Lemak", "Serat", "Protein", "Vitamin D"],
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
        question:
          "Apa kandungan utama dalam semangka yang membuatnya menyegarkan?",
        options: ["Protein", "Air", "Vitamin B12", "Lemak"],
        answer: "Air",
      },
      {
        question: "Vitamin apa yang ada dalam semangka?",
        options: ["Vitamin D", "Vitamin C", "Vitamin K2", "Vitamin B12"],
        answer: "Vitamin C",
      },
      {
        question: "Semangka baik dikonsumsi di musim ...",
        options: ["Panas", "Gugur", "Hujan", "Dingin"],
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
        options: ["Zat Besi", "Vitamin C", "Karbohidrat", "Protein"],
        answer: "Vitamin C",
      },
      {
        question: "Sawi termasuk kelompok sayur ...",
        options: ["Umbi-umbian", "Cruciferous", "Buah", "Legum"],
        answer: "Cruciferous",
      },
      {
        question: "Sawi juga mengandung ...",
        options: ["Asam urat", "Antioksidan", "Kolesterol tinggi", "Lemak trans"],
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
        options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin K"],
        answer: "Vitamin C",
      },
      {
        question: "Selain vitamin C, jeruk memiliki antioksidan bernama ...",
        options: ["Lemak jenuh", "Kolesterol", "Flavonoid", "Asam urat"],
        answer: "Flavonoid",
      },
      {
        question: "Jeruk biasanya dikonsumsi dalam bentuk ...",
        options: ["Roti", "Bubur", "Jus", "Gorengan"],
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

  // Parallax rumput bawah
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
    if (foundItem) {
      // Acak urutan opsi
      const shuffledQuestions = foundItem.questions.map((q) => ({
        ...q,
        options: q.options.sort(() => Math.random() - 0.5),
      }));
      setPlateItem({ ...foundItem, questions: shuffledQuestions });
    }
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
      className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-20 pb-32 relative bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] overflow-hidden pb-60"
    >
      <h1 className="text-6xl md:text-7xl font-extrabold text-[#3A2E17] text-center mb-6">
        Games 2
      </h1>
      <p className="text-center text-2xl md:text-3xl font-bold text-white mb-10 bg-[#3A2E17] py-3 px-10 rounded-full shadow-lg">
        Pilih Buah, lalu jawab kuisnya
      </p>

      {/* Card Game */}
      <div className="bg-[#F0FCD7] rounded-3xl shadow-2xl border-2 border-green-200 p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
        {/* Piring */}
        <div
          className="relative w-64 h-64 flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <img
            src="/gamesicon/piring.png"
            alt="Piring"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {plateItem ? (
            <div className="flex flex-col items-center z-10">
              <img
                src={plateItem.img}
                alt={plateItem.name}
                className="w-32 h-32 object-contain"
              />
              <div className="mt-3 text-xl font-bold text-green-900 text-center">
                {plateItem.name} ({currentQuestionIndex + 1}/
                {plateItem.questions.length})
              </div>
            </div>
          ) : (
            <p className="absolute text-gray-600 text-center px-4 text-lg font-medium z-10 flex flex-col items-center gap-2">
              <FaUtensils className="text-3xl text-green-800" />
              Tarik buah/sayur ke sini
            </p>
          )}
        </div>

        {/* Soal */}
        <div className="flex-1 w-full">
          {plateItem && currentQuestion ? (
            <div className="bg-white p-8 rounded-2xl shadow-md w-full">
              <p className="text-gray-900 mb-6 text-2xl font-semibold">
                {currentQuestion.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === currentQuestion.answer;

                  let btnClass =
                    "px-6 py-4 rounded-xl border font-semibold transition-all duration-200 text-xl ";

                  if (!questionLocked) {
                    btnClass +=
                      "bg-gray-100 border-gray-300 hover:bg-green-50 cursor-pointer";
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

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handleClearPlate}
                  className="px-6 py-3 bg-yellow-300 text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 text-lg flex items-center gap-2"
                >
                  <FaRedo /> Ganti Tanaman
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 text-lg flex items-center gap-2"
                >
                  <FaArrowRight /> Pertanyaan Berikut
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 p-8 rounded-2xl shadow-md text-center text-gray-700 text-xl font-medium">
              Tarik buah/sayur dari daftar di bawah ke piring, lalu jawab
              pertanyaannya!
            </div>
          )}
        </div>
      </div>

      {/* Daftar Buah */}
      <div className="bg-[#F0FCD7] border-2 border-green-200 rounded-2xl shadow-lg mt-10 px-6 py-6">
        <div className="flex gap-6 flex-wrap justify-center">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="w-24 h-24 bg-white rounded-2xl shadow-md hover:scale-110 flex items-center justify-center cursor-pointer border border-green-200 transition-transform duration-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skor */}
      <div className="bg-green-700 text-white px-8 py-4 rounded-2xl shadow-md font-extrabold text-2xl mt-10 flex items-center gap-3">
        <FaStar className="text-yellow-300" /> Poin Kamu: {points}
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
