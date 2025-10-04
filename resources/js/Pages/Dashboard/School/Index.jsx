import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ schools }) {
    const { data, setData, post, put } = useForm({ name: "" });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("schools.store"));
    };

    const handleUpdate = (e, schoolId) => {
        e.preventDefault();
        put(route("schools.update", schoolId));
        setEditingId(null);
    };

    const handleDelete = (schoolId) => {
        if (confirm("Apakah kamu yakin ingin menghapus sekolah ini?")) {
            router.delete(route("schools.destroy", schoolId));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="School" />

            <div className="p-8 space-y-8">
                {/* Form Tambah Sekolah */}
                <section className="bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform">
                    <h2 className="text-xl font-bold mb-6 text-green-900 text-center">
                        ➕ Tambah Sekolah Baru
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama sekolah"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-green-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
                        >
                            🚀 Tambah Sekolah
                        </button>
                    </form>
                </section>

                {/* Daftar Sekolah dalam Tabel */}
                <section className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-green-900 mb-4">
                        Daftar Sekolah
                    </h2>
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
                                            {editingId === school.id ? (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleUpdate(
                                                            e,
                                                            school.id
                                                        )
                                                    }
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-2 py-1 border rounded-lg"
                                                    />
                                                    <button className="bg-blue-600 text-white px-2 py-1 rounded-lg">
                                                        💾
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        className="bg-gray-400 text-white px-2 py-1 rounded-lg"
                                                    >
                                                        ❌
                                                    </button>
                                                </form>
                                            ) : (
                                                school.name
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-green-800 font-semibold">
                                            {school.points} poin
                                        </td>
                                        <td className="px-6 py-4 text-center space-x-2">
                                            {editingId !== school.id && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(
                                                                school.id
                                                            );
                                                            setData(
                                                                "name",
                                                                school.name
                                                            );
                                                        }}
                                                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                school.id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </>
                                            )}
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
