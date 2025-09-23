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
                    <Trophy className="w-8 h-8 text-yellow-500" /> Leaderboard
                    Sekolah
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-green-200 rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-green-200 via-green-300 to-green-400">
                            <tr>
                                <th className="py-3 px-4 text-left text-green-900 font-bold uppercase text-sm">
                                    #
                                </th>
                                <th className="py-3 px-4 text-left text-green-900 font-bold uppercase text-sm">
                                    Sekolah
                                </th>
                                <th className="py-3 px-4 text-right text-green-900 font-bold uppercase text-sm">
                                    Poin
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            {schools.map((school, index) => (
                                <tr
                                    key={school.id}
                                    className={`transition transform hover:scale-[1.01] hover:shadow-md ${
                                        index === 0
                                            ? "bg-yellow-100 font-bold"
                                            : index === 1
                                            ? "bg-gray-100 font-semibold"
                                            : index === 2
                                            ? "bg-orange-100 font-semibold"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="py-4 px-4 text-green-900 flex items-center gap-2">
                                        {index === 0 && (
                                            <Award className="w-5 h-5 text-yellow-500" />
                                        )}
                                        {index === 1 && (
                                            <Award className="w-5 h-5 text-gray-500" />
                                        )}
                                        {index === 2 && (
                                            <Award className="w-5 h-5 text-orange-500" />
                                        )}
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-4 text-green-800">
                                        {school.name}
                                    </td>
                                    <td className="py-4 px-4 text-right text-green-900 font-semibold">
                                        {school.total_points ?? 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
