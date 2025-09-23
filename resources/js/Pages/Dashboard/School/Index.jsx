import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ schools }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        team_code: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("schools.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="School" />

            <div className="p-8 space-y-8">
                {/* Header */}
                <section className="bg-gradient-to-r from-green-300 via-green-200 to-green-100 rounded-2xl p-8 shadow-lg text-center animate-fade-in">
                    <h1 className="text-3xl font-extrabold text-green-900">
                        🌱 Leaderboard Sekolah
                    </h1>
                    <p className="text-green-700 mt-2">
                        Lihat peringkat sekolah berdasarkan kontribusi
                        lingkungan.
                    </p>
                </section>

                {/* Leaderboard */}
                <section className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-green-200 hover:shadow-2xl transition">
                    <h2 className="text-xl font-bold mb-6 text-green-800">
                        🏆 Peringkat Sekolah
                    </h2>

                    <div className="overflow-x-auto">
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

                {/* Form Tambah Sekolah */}
                <section className="bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform">
                    <h2 className="text-xl font-bold mb-6 text-green-900 text-center">
                        ➕ Tambah Sekolah Baru
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Nama sekolah"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-xl border border-green-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Team code"
                                value={data.team_code}
                                onChange={(e) =>
                                    setData("team_code", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-xl border border-green-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                            {errors.team_code && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.team_code}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
                        >
                            🚀 Tambah Sekolah
                        </button>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
