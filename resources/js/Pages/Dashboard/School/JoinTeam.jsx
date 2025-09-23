import React from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function JoinSchool({ user, schools }) {
    function join(teamCode) {
        router.post(route("schools.join"), { team_code: teamCode });
    }

    function leave(e) {
        e.preventDefault();
        router.post(route("schools.leave"));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Join Team" />

            <div className="max-w-3xl mx-auto mt-10">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-200 hover:shadow-2xl transition transform">
                    <h2 className="text-2xl font-extrabold text-center text-green-900 mb-6">
                        🌱 Gabung ke Sekolah
                    </h2>

                    {user.school ? (
                        <div className="text-center space-y-6">
                            <p className="text-green-800 text-lg">
                                Kamu sudah tergabung di sekolah:{" "}
                                <span className="font-bold text-green-600">
                                    {user.school.name}
                                </span>
                            </p>

                            <form onSubmit={leave}>
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
                                >
                                    🚪 Keluar dari Sekolah
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-lg font-bold text-green-800 mb-4">
                                Pilih sekolah untuk bergabung:
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-green-200">
                                    <thead className="bg-gradient-to-r from-green-200 via-green-300 to-green-400">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase">
                                                #
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase">
                                                Nama Sekolah
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase">
                                                Poin
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-green-900 uppercase">
                                                Team Code
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-green-900 uppercase">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-green-200">
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
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() =>
                                                            join(school.team_code)
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                                                    >
                                                        Gabung
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
