import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@inertiajs/react";

export default function Seminar({ seminars }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPassed = windowHeight - rect.top;
      setOffsetX(scrollPassed > 0 ? scrollPassed * 0.1 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start px-6 pt-24 pb-28 min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] overflow-hidden"
    >
      {/* Background motif */}
      <div className="absolute inset-0 bg-[url('/background/herokomunitas.png')] bg-cover bg-center opacity-40 pointer-events-none" />

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-[#3B3B0E] text-center mb-14 z-10">
        Seminar
      </h2>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full z-10">
        {seminars && seminars.length > 0 ? (
          seminars.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] bg-[#F7FFF0] border border-[#E0F0C2] transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Judul Card */}
              <div className="bg-[#3B3B0E] text-white font-semibold text-lg md:text-[17px] px-6 py-3 rounded-t-3xl">
                {item.title}
              </div>

              {/* Isi Card */}
              <div className="p-6 text-gray-800 text-[15px] leading-relaxed space-y-3">
                <p>
                  <span className="font-semibold text-[#3B3B0E]">Tanggal :</span>{" "}
                  {item.date}
                </p>
                <p>
                  <span className="font-semibold text-[#3B3B0E]">Lokasi :</span>{" "}
                  {item.location}
                </p>
                <p className="text-justify">{item.description}</p>

                <div className="flex justify-start">
                  <button
                    onClick={() => setSelectedEvent(item)}
                    className="mt-4 px-6 py-2 rounded-full bg-[#A6E272] text-[#224C14] font-semibold hover:bg-[#94D45E] transition-colors"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-600 text-lg">
            Belum ada seminar tersedia.
          </p>
        )}
      </div>

      {/* Rumput Parallax */}
      <div className="absolute bottom-0 left-0 w-full overflow-visible pointer-events-none">
        <img
          src="/icon/rumput-kiri.png"
          alt="rumput kiri"
          className="absolute bottom-0 left-0 w-1/3 object-contain"
          style={{ transform: `translateX(-${offsetX}px)` }}
        />
        <img
          src="/icon/rumput-kanan.png"
          alt="rumput kanan"
          className="absolute bottom-0 right-0 w-1/3 object-contain"
          style={{ transform: `translateX(${offsetX}px)` }}
        />
      </div>

      {/* Modal */}
      {selectedEvent && (
        <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
}

/* ========== MODAL ========== */
function Modal({ event, onClose }) {
  return createPortal(
    <div
      id="overlay"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={(e) => e.target.id === "overlay" && onClose()}
    >
      <div className="w-full max-w-2xl relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Judul form seperti card seminar */}
        <div className="bg-[#3B3B0E] text-white font-semibold text-lg md:text-xl px-6 py-3 relative">
          Daftar untuk {event.title}

          {/* Tombol close warna putih */}
          <button
            onClick={onClose}
            className="absolute right-6 top-2 text-white text-3xl hover:text-gray-200 transition"
          >
            &times;
          </button>
        </div>

        {/* Body form */}
        <div className="bg-[#F7FFF0] p-8">
          <RegistrationForm seminarId={event.id} onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ========== FORM PENDAFTARAN ========== */
function RegistrationForm({ seminarId, onClose }) {
  const { data, setData, post, processing, reset } = useForm({
    seminar_id: seminarId,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("seminars.register", seminarId), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-gray-700 text-base md:text-lg font-medium"
    >
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        placeholder="Nama Lengkap"
        required
        className="w-full rounded-xl border border-[#E0E0D1] px-5 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7D948] focus:border-transparent shadow-sm"
      />
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => setData("email", e.target.value)}
        placeholder="Email"
        required
        className="w-full rounded-xl border border-[#E0E0D1] px-5 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7D948] focus:border-transparent shadow-sm"
      />
      <input
        type="tel"
        name="phone"
        value={data.phone}
        onChange={(e) => setData("phone", e.target.value)}
        placeholder="Nomor Telepon"
        required
        className="w-full rounded-xl border border-[#E0E0D1] px-5 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7D948] focus:border-transparent shadow-sm"
      />
      <textarea
        name="notes"
        value={data.notes}
        onChange={(e) => setData("notes", e.target.value)}
        placeholder="Catatan (Opsional)"
        className="w-full rounded-xl border border-[#E0E0D1] px-5 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7D948] focus:border-transparent shadow-sm resize-none"
      />
      <button
        type="submit"
        disabled={processing}
        className="w-full rounded-xl bg-[#A6E272] text-[#224C14] font-semibold py-3 hover:bg-[#94D45E] transition-all shadow-md"
      >
        {processing ? "Mendaftar..." : "Daftar Sekarang"}
      </button>
    </form>
  );
}
