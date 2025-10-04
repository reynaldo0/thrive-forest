import React from "react";
import { Trophy } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Leaderboard({ schools }) {
    return (
        <AuthenticatedLayout>
            <Head title="Leaderboard" />

            <div className="max-w-4xl mx-auto mt-10 p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-6 md:mb-8 text-center text-secondary-200 flex items-center justify-center gap-2">
                    <Trophy className="w-6 md:w-8 h-6 md:h-8 text-yellow-500" />
                    Peringkat Sekolah
                </h2>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-primary-100 hover:shadow-2xl transition transform">
                    <table className="w-full divide-y divide-primary-100 min-w-[600px]">
                        <thead className="bg-primary-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                    Nama Sekolah
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                    Poin
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                    Team Code
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-100">
                            {schools.map((school, i) => (
                                <tr
                                    key={school.id}
                                    className="hover:bg-primary-100transition transform hover:scale-[1.01]"
                                >
                                    <td className="px-6 py-4 text-secondary-200 font-bold">
                                        {i + 1}
                                    </td>
                                    <td className="px-6 py-4 text-secondary-200">
                                        {school.name}
                                    </td>
                                    <td className="px-6 py-4 text-secondary-200 font-semibold">
                                        {school.points} poin
                                    </td>
                                    <td className="px-6 py-4 text-secondary-200 truncate">
                                        {school.team_code}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {schools.map((school, i) => (
                        <div
                            key={school.id}
                            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-primary-100 hover:shadow-xl transition transform"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-secondary-200 text-lg">
                                    #{i + 1}
                                </span>
                                <span className="font-semibold text-primary-100">
                                    {school.points} poin
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-secondary-200 truncate">
                                {school.name}
                            </h3>
                            <p className="text-sm text-secondary-200 mt-1 truncate">
                                Team Code:{" "}
                                <span className="font-medium text-primary-100">
                                    {school.team_code}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
