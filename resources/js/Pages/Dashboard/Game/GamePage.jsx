import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function GamePage({ plants, school }) {
    const { post } = useForm();

    const plant = (type) => {
        post("/plant", { type }); // kirim type ke backend
    };

    const harvest = (id) => {
        post(`/harvest/${id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Panen Bibit" />
            <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
                            🌱 Game Berkebun
                        </h1>
                        {school && (
                            <p className="mt-3 text-lg font-medium text-gray-700">
                                🏫{" "}
                                <span className="font-bold">{school.name}</span>{" "}
                                — ⭐{" "}
                                <span className="text-yellow-600 font-semibold">
                                    {school.points} poin
                                </span>
                            </p>
                        )}
                    </div>

                    {/* Pilihan tanam */}
                    <div className="flex justify-center gap-4 mb-10">
                        <motion.button
                            onClick={() => plant("apel")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
                        >
                            🍎 Tanam Apel
                        </motion.button>
                        <motion.button
                            onClick={() => plant("wortel")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
                        >
                            🥕 Tanam Wortel
                        </motion.button>
                        <motion.button
                            onClick={() => plant("bayem")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
                        >
                            🌿 Tanam Bayem
                        </motion.button>
                    </div>

                    {/* Grid tanaman */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {plants.map((p) => {
                            const plantedAt = new Date(p.planted_at);
                            const now = new Date();
                            const growTime = p.grow_time * 1000;
                            const progress = Math.min(
                                ((now - plantedAt) / growTime) * 100,
                                100
                            );
                            const ready = progress >= 100;

                            return (
                                <motion.div
                                    key={p.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-between transition"
                                >
                                    <div className="text-5xl mb-3">
                                        {p.harvested
                                            ? "✅"
                                            : ready
                                            ? "🌳"
                                            : "🌱"}
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {p.type}
                                    </p>

                                    {!p.harvested && (
                                        <div className="w-full mt-3">
                                            {/* Progress bar */}
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-500 ${
                                                        ready
                                                            ? "bg-green-600"
                                                            : "bg-yellow-400"
                                                    }`}
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                ></div>
                                            </div>

                                            {/* Tombol panen */}
                                            {ready && (
                                                <motion.button
                                                    onClick={() =>
                                                        harvest(p.id)
                                                    }
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="mt-4 w-full bg-blue-600 text-white px-3 py-2 rounded-lg shadow font-semibold"
                                                >
                                                    🌾 Panen
                                                </motion.button>
                                            )}
                                        </div>
                                    )}

                                    {p.harvested && (
                                        <p className="text-green-600 font-semibold mt-2">
                                            Sudah Dipanen!
                                        </p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
