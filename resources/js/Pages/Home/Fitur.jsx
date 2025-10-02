import { Link } from "@inertiajs/react";

export default function FiturWebsite() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-6">
      {/* Judul */}
      <h2 className="text-3xl font-extrabold text-[#3B3B0E] text-center mb-12">
        Fitur Website
      </h2>

      {/* Card Utama */}
      <div className="relative bg-[#F0FCD7] rounded-xl shadow-lg p-10 flex justify-center">
        {/* Garis Tengah */}
        <div className="absolute left-1/2 top-8 bottom-8 w-[2px] bg-green-200"></div>

        <div className="grid grid-cols-2 gap-16 w-full max-w-4xl">
          {/* Kiri */}
          <div className="flex flex-col items-end justify-center gap-20">
            {/* Buku Terpadu */}
            <Link href="/buku-terpadu" className="flex flex-col items-center text-center group cursor-pointer">
              <img
                src="/icon/nuti2.png "
                alt="Buku Terpadu"
                className="w-28 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:animate-bounce"
              />
              <span className="mt-3 text-[#3B3B0E] text-lg font-medium">
                Buku Terpadu
              </span>
            </Link>

            {/* Produk Unggul */}
            <Link href="/produk-unggul" className="flex flex-col items-center text-center group cursor-pointer">
              <img
                src="/icon/nuti3.png"
                alt="Produk Unggul"
                className="w-28 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-bounce"
              />
              <span className="mt-3 text-[#3B3B0E] text-lg font-medium">
                Produk Unggul
              </span>
            </Link>
          </div>

          {/* Kanan */}
          <div className="flex flex-col items-start justify-center gap-20">
            {/* AI Interaktif */}
            <Link href="/ai" className="flex flex-col items-center text-center group cursor-pointer">
              <img
                src="/icon/nuti1.png"
                alt="AI Interaktif"
                className="w-28 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-bounce"
              />
              <span className="mt-3 text-[#3B3B0E] text-lg font-medium">
                AI Interaktif
              </span>
            </Link>

            {/* Komunitas */}
            <Link href="/komunitas" className="flex flex-col items-center text-center group cursor-pointer">
              <img
                src="/icon/nuti1.png"
                alt="Komunitas"
                className="w-28 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:animate-bounce"
              />
              <span className="mt-3 text-[#3B3B0E] text-lg font-medium">
                Komunitas
              </span>
            </Link>

            {/* Games */}
            <Link href="/games" className="flex flex-col items-center text-center group cursor-pointer">
              <img
                src="/icon/nuti4.png"
                alt="Games"
                className="w-28 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:animate-bounce"
              />
              <span className="mt-3 text-[#3B3B0E] text-lg font-medium">
                Games
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
