import React from "react";
import { Trophy, Award } from "lucide-react"; // pakai icon lucide-react
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Leaderboard({ schools }) {
    return (
        <AuthenticatedLayout>
            <Head title="Leaderboard" />
            <div className="max-w-4xl mx-auto mt-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-green-200 hover:shadow-2xl transition transform">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-green-900 flex items-center justify-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500" /> Peringkat
                    Sekolah
                </h2>

                <section className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-green-200 hover:shadow-2xl transition">

                    <div>
                        <table className="w-full divide-y divide-green-200">
                            {/* Header */}
                            <thead className="bg-gradient-to-r from-green-200 via-green-300 to-green-400">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                                        Nama Sekolah
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                                        Poin
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase tracking-wider">
                                        Team Code
                                    </th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody className="divide-y divide-green-200">
                                {/* dari data schools */}
                                {schools.map((school, i) => (
                                    <tr
                                        key={school.id}
                                        className="hover:bg-green-50 transition transform hover:scale-[1.01]"
                                    >
                                        <td className="px-6 py-4 text-green-900 font-bold">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 text-green-900">
                                            {school.name}
                                        </td>
                                        <td className="px-6 py-4 text-green-800 font-semibold">
                                            {school.points} poin
                                        </td>
                                        <td className="px-6 py-4 text-green-700">
                                            🎟️ {school.team_code}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
