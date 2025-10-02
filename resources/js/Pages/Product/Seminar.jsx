import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@inertiajs/react";

export default function Seminar({ seminars }) {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <section className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444]">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3B3B0E] mb-12">
                Seminar
            </h2>

            {/* List Seminar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {seminars && seminars.length > 0 ? (
                    seminars.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-lg rounded-2xl border border-green-200 overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300"
                        >
                            <div className="bg-green-200 px-4 py-2">
                                <h3 className="text-green-900 font-semibold text-sm">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="p-4 space-y-2 text-sm text-gray-700">
                                <p>
                                    <strong>Tanggal:</strong> {item.date}
                                </p>
                                <p>
                                    <strong>Lokasi:</strong> {item.location}
                                </p>
                                <p>{item.description}</p>

                                <button
                                    onClick={() => setSelectedEvent(item)}
                                    className="mt-3 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                                >
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center text-gray-600">
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
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-600 text-2xl"
                >
                    &times;
                </button>
                <h3 className="text-xl font-semibold text-green-700 mb-4">
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
                className="w-full border rounded-lg px-4 py-2"
            />
            <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="Email"
                required
                className="w-full border rounded-lg px-4 py-2"
            />
            <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                placeholder="Nomor Telepon"
                required
                className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
                name="notes"
                value={data.notes}
                onChange={(e) => setData("notes", e.target.value)}
                placeholder="Catatan (Opsional)"
                className="w-full border rounded-lg px-4 py-2"
            />
            <button
                type="submit"
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
            >
                {processing ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
        </form>
    );
}
