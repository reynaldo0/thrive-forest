export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Trees */}
      <div className="absolute inset-0 flex justify-center items-end overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src="/illustrasi/pohon.png" // ganti dengan path gambar pohon kamu
            alt="Tree"
            className="w-32 h-auto mx-4 opacity-0 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#78B86C] opacity-40"></div>

      {/* Content */}
      <div className="relative text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0A400C] drop-shadow-lg ">
          Setiap pohonmu adalah langkah menuju{" "}
          <span className="text-[#7B4019]">dunia tanpa kelaparan</span>.
        </h1>

        <button className="mt-8 px-8 py-4 bg-[#7B4019] text-white font-semibold text-lg rounded-2xl shadow-xl hover:bg-[#7B4019]/90 hover:scale-105 active:scale-95 transition transform">
          Mulai Petualangan
        </button>
      </div>

      {/* Falling Leaves */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-700 opacity-70 animate-leafFall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
            fontSize: `${16 + Math.random() * 24}px`,
          }}
        >
          🍃
        </div>
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-fadeInUpSlow {
          animation: fadeInUp 1.5s ease-out forwards;
          animation-delay: 2s;
        }

        @keyframes leafFall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-leafFall {
          animation: leafFall linear infinite;
        }
      `}</style>
    </div>
  );
}
