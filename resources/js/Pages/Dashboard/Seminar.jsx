import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "@inertiajs/react";

export default function Seminar({ seminars }) {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <section className="min-h-screen w-full bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] relative px-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3B3B0E] mb-12">
                Seminar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {seminars.map((item, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-2xl border border-green-200">
                        <div className="bg-green-200 px-4 py-2">
                            <h3 className="text-green-900 font-semibold text-sm">
                                {item.title}
                            </h3>
                        </div>
                        <div className="p-4 space-y-2 text-sm text-gray-700">
                            <p><span className="font-bold">Tanggal :</span> {item.date}</p>
                            <p><span className="font-bold">Lokasi :</span> {item.location}</p>
                            <p>{item.description}</p>
                            <button
                                onClick={() => setSelectedEvent(item)}
                                className="mt-3 px-4 py-2 rounded-lg bg-green-600 text-white"
                            >
                                Daftar Sekarang
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </section>
    );
}

const Modal = ({ event, onClose }) => {
    const { data, setData, post, processing } = useForm({
        seminar_id: event.id,
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("registrations.store"), {
            onSuccess: () => {
                alert("Pendaftaran berhasil!");
                onClose();
            },
        });
    };

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
                <button onClick={onClose} className="absolute right-4 top-4">✖</button>
                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                    Daftar untuk {event.title}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Nama Lengkap" value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" required />
                    <input type="email" placeholder="Email" value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" required />
                    <input type="tel" placeholder="Nomor Telepon" value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" required />
                    <textarea placeholder="Catatan (Opsional)" value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2" />
                    <button type="submit" disabled={processing}
                        className="w-full bg-green-600 text-white py-2 rounded-lg">
                        {processing ? "Mendaftar..." : "Daftar Sekarang"}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};
