import { useEffect, useState, useRef } from "react";

export default function ZeroHunger() {
  const [progress, setProgress] = useState({ households: 0, children: 0 });
  const [showHands, setShowHands] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setProgress({ households: 20, children: 30 });
    }, 500);

    // Trigger animasi tangan pas load page / pas terlihat
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowHands(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Posisi tangan persis sesuai gambar
  const hands = [
    { src: "/icon/tangan1.png", class: "bottom-0 left-10" },
    { src: "/icon/tangan2.png", class: "bottom-0 left-24" },
    { src: "/icon/tangan3.png", class: "bottom-0 right-10" },
    { src: "/icon/tangan4.png", class: "bottom-0 right-24" },
    { src: "/icon/tangan5.png", class: "bottom-0 left-1/2 -translate-x-1/2" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#fafbe9] via-[#ffe7b3] to-[#f5c16c] py-16 px-6 font-sans relative overflow-hidden"
    >
      {/* Background hands animated */}
      {hands.map((hand, i) => (
        <img
          key={i}
          src={hand.src}
          alt="hand"
          className={`absolute w-16 md:w-24 transition-all duration-1000 ease-out ${
            hand.class
          } ${showHands ? "translate-y-0 opacity-100" : "opacity-0 translate-y-40"}`}
          style={{ transitionDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* Judul */}
      <div className="relative text-center mb-10 z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="bg-[#f5d77f] w-10 h-10 flex items-center justify-center rounded">
            <span className="text-[#3B3B0E] font-bold">2</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3B3B0E]">
            Zero Hunger
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-gray-700 text-sm md:text-base leading-relaxed">
          Hunger is discomfort or pain caused by a lack of food. It is different
          from food insecurity, which means lack of regular access to safe and
          nutritious food for proper development and an active and healthy life.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
        {/* Hunger stat */}
        <div className="bg-[#f3fbdc] rounded-xl shadow-[6px_6px_0px_#d9e3c1] p-6">
          <h3 className="bg-[#3B3B0E] text-white px-4 py-1 rounded-md shadow-md inline-block mb-6">
            Hunger stat
          </h3>
          <div className="grid grid-cols-3 text-center gap-4">
            <div className="animate-fadeInUp delay-100">
              <p className="text-3xl font-extrabold text-green-700">319</p>
              <p className="text-xs mt-1 text-gray-600">Million People</p>
            </div>
            <div className="animate-fadeInUp delay-300">
              <p className="text-2xl font-bold text-green-600">67</p>
              <p className="text-xs mt-1 text-gray-600">Countries</p>
            </div>
            <div className="animate-fadeInUp delay-500">
              <p className="text-2xl font-bold text-green-800">98</p>
              <p className="text-xs mt-1 text-gray-600">Million People</p>
            </div>
          </div>
        </div>

        {/* Definition of famine with charts */}
        <div className="bg-[#f3fbdc] rounded-xl shadow-[6px_6px_0px_#d9e3c1] p-6">
          <h3 className="bg-[#3B3B0E] text-white px-4 py-1 rounded-md shadow-md inline-block mb-6">
            Definition of famine
          </h3>
          <div className="space-y-6">
            {/* Households */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Households</p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-600 h-4 text-xs text-white flex items-center justify-center transition-all duration-1000"
                  style={{ width: `${progress.households}%` }}
                >
                  {progress.households}%
                </div>
              </div>
            </div>
            {/* Children */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Of Children</p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-800 h-4 text-xs text-white flex items-center justify-center transition-all duration-1000"
                  style={{ width: `${progress.children}%` }}
                >
                  {progress.children}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animasi style */}
      <style>{`
        .animate-fadeInUp {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
