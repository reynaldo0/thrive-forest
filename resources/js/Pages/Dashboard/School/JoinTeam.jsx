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

            <div className="max-w-3xl mx-auto mt-10 px-4 md:px-0">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 border border-green-200 hover:shadow-2xl transition transform">
                    <h2 className="text-2xl font-extrabold text-center text-secondary-200 mb-6">
                        Gabung ke Sekolah
                    </h2>

                    {user.school ? (
                        <div className="text-center space-y-6">
                            <p className="text-secondary-200 text-lg">
                                Kamu sudah tergabung di sekolah:{" "}
                                <span className="font-bold text-secondary-200">
                                    {user.school.name}
                                </span>
                            </p>

                            <form onSubmit={leave}>
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition transform"
                                >
                                    🚪 Keluar dari Sekolah
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-secondary-200 mb-4">
                                Pilih sekolah untuk bergabung:
                            </h3>

                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-primary-100/90">
                                    <thead className="bg-primary-100 ">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                                #
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                                Nama Sekolah
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                                Poin
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                                Team Code
                                            </th>
                                            <th className="px-6 py-3 text-center text-sm font-bold text-secondary-200 uppercase">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-green-200">
                                        {schools.map((school, i) => (
                                            <tr
                                                key={school.id}
                                                className="hover:bg-green-50 transition transform"
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
                                                <td className="px-6 py-4 text-secondary-200">
                                                    🎟️ {school.team_code}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() =>
                                                            join(
                                                                school.team_code
                                                            )
                                                        }
                                                        className="bg-secondary-200 hover:bg-secondary-200/90 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition transform"
                                                    >
                                                        Gabung
                                                    </button>
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
                                        className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition transform"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-gray-800">
                                                {school.name}
                                            </span>
                                            <span className="text-gray-500 font-semibold">
                                                {school.points} poin
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">
                                            🎟️ {school.team_code}
                                        </p>
                                        <button
                                            onClick={() =>
                                                join(school.team_code)
                                            }
                                            className="w-full bg-secondary-200 hover:bg-secondary-200/90 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition transform"
                                        >
                                            Gabung
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
