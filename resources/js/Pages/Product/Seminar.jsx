import { useEffect, useState } from "react";

export default function Seminar() {
  const [offsetX, setOffsetX] = useState(0);

    useEffect(() => {
    let animationFrameId;
    let currentX = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const targetX = scrollY * 0.1; // kecepatan medium (antara 0.2 dan 0.05)

        const animate = () => {
        // lerp → biar transisi smooth (0.1 = lambat, 0.3 = cepat)
        currentX += (targetX - currentX) * 0.15;
        setOffsetX(currentX);

        // terus update sampai posisinya deket target
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


  const seminars = [
    {
      title: "Potensi Adopsi dan Regulasi Produk Rekayasa Genetik",
      date: "15 Juli 2022",
      location: "Daring (Pertemuan Online)",
      desc: "Webinar dengan tema ini menghadirkan beberapa pakar dari beberapa lembaga dan perusahaan sebagai narasumber.",
    },
    {
      title: "Potensi Adopsi dan Regulasi Produk Rekayasa Genetik",
      date: "15 Juli 2022",
      location: "Daring (Pertemuan Online)",
      desc: "Webinar dengan tema ini menghadirkan beberapa pakar dari beberapa lembaga dan perusahaan sebagai narasumber.",
    },
    {
      title: "Potensi Adopsi dan Regulasi Produk Rekayasa Genetik",
      date: "15 Juli 2022",
      location: "Daring (Pertemuan Online)",
      desc: "Webinar dengan tema ini menghadirkan beberapa pakar dari beberapa lembaga dan perusahaan sebagai narasumber.",
    },
    {
      title: "Potensi Adopsi dan Regulasi Produk Rekayasa Genetik",
      date: "15 Juli 2022",
      location: "Daring (Pertemuan Online)",
      desc: "Webinar dengan tema ini menghadirkan beberapa pakar dari beberapa lembaga dan perusahaan sebagai narasumber.",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] relative px-6 py-12">
      {/* Judul */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3B3B0E] mb-12 animate-bounce">
        Seminar
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {seminars.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <div className="bg-green-200 px-4 py-2">
              <h3 className="text-green-900 font-semibold text-sm">
                {item.title}
              </h3>
            </div>
            <div className="p-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-bold">Tanggal :</span> {item.date}
              </p>
              <p>
                <span className="font-bold">Lokasi :</span> {item.location}
              </p>
              <p className="leading-relaxed">{item.desc}</p>
              <button className="mt-3 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 active:scale-95 transition">
                Daftar Sekarang
              </button>
            </div>
          </div>
        ))}
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
