import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Seminar() {
    const [offsetX, setOffsetX] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        let animationFrameId;
        let currentX = 0;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const targetX = scrollY * 0.1;

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

    const seminars = [
        {
            title: "Potensi Adopsi dan Regulasi Produk Rekayasa Genetik",
            date: "15 Juli 2022",
            location: "Daring (Pertemuan Online)",
            desc: "Webinar dengan tema ini menghadirkan beberapa pakar dari beberapa lembaga dan perusahaan sebagai narasumber.",
        },
        {
            title: "Bioteknologi dan Pertanian Modern",
            date: "22 Agustus 2022",
            location: "Jakarta, Indonesia",
            desc: "Diskusi seputar inovasi bioteknologi dalam mendukung ketahanan pangan nasional.",
        },
    ];

    return (
        <section className="min-h-screen w-full bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] relative px-6 py-12">
            {/* Tambahkan style animasi */}
            <style>{styles}</style>

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
                                <span className="font-bold">Tanggal :</span>{" "}
                                {item.date}
                            </p>
                            <p>
                                <span className="font-bold">Lokasi :</span>{" "}
                                {item.location}
                            </p>
                            <p className="leading-relaxed">{item.desc}</p>
                            <button
                                onClick={() => setSelectedEvent(item)}
                                className="mt-3 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 active:scale-95 transition"
                            >
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

            {/* Modal */}
            {selectedEvent && (
                <Modal
                    event={selectedEvent}
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </section>
    );
}

const Modal = ({ event, isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleOutsideClick = (e) => {
        if (e.target.id === "modalOverlay") {
            onClose();
        }
    };

    return createPortal(
        <div
            id="modalOverlay"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] animate-fadeIn"
        >
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative animate-zoomIn">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 absolute right-4 top-4 font-bold text-2xl"
                >
                    &times;
                </button>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    Daftar untuk {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                    <strong>Tanggal:</strong> {event.date}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Lokasi:</strong> {event.location}
                </p>
                <RegistrationForm />
            </div>
        </div>,
        document.body
    );
};

// Animasi custom pakai Tailwind keyframes
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-zoomIn {
  animation: zoomIn 0.3s ease-out forwards;
}
`;

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Pendaftaran berhasil! Kami akan menghubungi Anda lebih lanjut.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            notes: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Nomor Telepon"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400"
            />
            <textarea
                name="notes"
                placeholder="Catatan (Opsional)"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400"
            />
            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg py-2 transition-all"
            >
                Daftar Sekarang
            </button>
        </form>
    );
};
