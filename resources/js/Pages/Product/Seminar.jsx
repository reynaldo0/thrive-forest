import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@inertiajs/react";

export default function Seminar({ seminars }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [offsetX, setOffsetX] = useState(0);

    useEffect(() => {
            const handleScroll = () => {
                if (!sectionRef.current) return;
                const rect = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const scrollPassed = windowHeight - rect.top;
                setOffsetX(scrollPassed > 0 ? scrollPassed * 0.2 : 0);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);
    

    return (
        <section className="min-h-screen flex flex-col items-center justify-start px-6 pt-16 pb-12 bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] relative">
            <div
                className="absolute inset-0 bg-[url('/background/herokomunitas.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            <h2 className="text-5xl md:text-6xl font-extrabold text-center text-[#3B3B0E] mb-12">
                Seminar
            </h2>

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

            {/* List Seminar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full z-10">
                {seminars && seminars.length > 0 ? (
                    seminars.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-2xl rounded-3xl border-2 border-green-200 overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-500"
                        >
                            <div className="bg-green-200 px-6 py-3">
                                <h3 className="text-green-900 font-semibold text-lg">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="p-6 space-y-3 text-md text-gray-700">
                                <p>
                                    <strong>Tanggal:</strong> {item.date}
                                </p>
                                <p>
                                    <strong>Lokasi:</strong> {item.location}
                                </p>
                                <p>{item.description}</p>

                                <button
                                    onClick={() => setSelectedEvent(item)}
                                    className="mt-4 px-6 py-3 rounded-xl bg-green-600 text-white text-lg hover:bg-green-700 transition-colors"
                                >
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center text-gray-600 text-lg">
                        Belum ada seminar tersedia.
                    </p>
                )}
            </div>

            {/* Modal Registrasi */}
            {selectedEvent && (
                <Modal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </section>
    );
}

function Modal({ event, onClose }) {
    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            onClick={(e) => e.target.id === "overlay" && onClose()}
            id="overlay"
        >
            <div className="bg-white w-full max-w-2xl p-8 rounded-3xl shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-600 text-3xl"
                >
                    &times;
                </button>
                <h3 className="text-2xl font-bold text-green-700 mb-6">
                    Daftar untuk {event.title}
                </h3>
                <RegistrationForm seminarId={event.id} onClose={onClose} />
            </div>
        </div>,
        document.body
    );
}

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
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Nama Lengkap"
                required
                className="w-full border rounded-xl px-5 py-3 text-lg"
            />
            <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="Email"
                required
                className="w-full border rounded-xl px-5 py-3 text-lg"
            />
            <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="Nomor Telepon"
                required
                className="w-full border rounded-xl px-5 py-3 text-lg"
            />
            <textarea
                name="notes"
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
                placeholder="Catatan (Opsional)"
                className="w-full border rounded-xl px-5 py-3 text-lg"
            />
            <button
                type="submit"
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg"
            >
                {processing ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
        </form>
    );
}
