import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Save, X } from "lucide-react";

export default function Index({ users }) {
    const { data, setData, post, put } = useForm({ name: "", email: "" });
    const [editingId, setEditingId] = useState(null);

    // Tambah user
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    // Update user
    const handleUpdate = (e, userId) => {
        e.preventDefault();
        put(route("users.update", userId));
        setEditingId(null);
    };

    // Delete user
    const handleDelete = (userId) => {
        if (confirm("Apakah kamu yakin ingin menghapus user ini?")) {
            router.delete(route("users.destroy", userId));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div className="p-4 md:p-8 space-y-8">
                {/* Form Tambah User */}
                <h1 className="text-3xl font-bold text-[#3B3B0E]">
                    Tambah User
                </h1>
                <section className="bg-primary-100 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition transform border border-white/30">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nama user"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-primary-100 shadow-sm focus:ring-2 focus:ring-primary-100 focus:outline-none transition"
                        />
                        <input
                            type="email"
                            placeholder="Email user"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-primary-100 shadow-sm focus:ring-2 focus:ring-primary-100 focus:outline-none transition"
                        />
                        <button
                            type="submit"
                            className="w-full bg-secondary-200 hover:bg-secondary-200/90 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition transform"
                        >
                            Tambah User
                        </button>
                    </form>
                </section>

                {/* Table Desktop */}
                <section className="bg-white p-6 rounded-2xl shadow-lg hidden md:block">
                    <h2 className="text-xl font-bold text-secondary-200 mb-4">
                        Daftar User
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-primary-100">
                            <thead className="bg-primary-100 backdrop-blur-md">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-bold text-secondary-200 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-green-200">
                                {users.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-green-50 transition transform hover:scale-[1.01]"
                                    >
                                        <td className="px-6 py-4 text-secondary-200 font-bold">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200">
                                            {editingId === user.id ? (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleUpdate(e, user.id)
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
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition"
                                                    >
                                                        <Save size={16} />{" "}
                                                        Simpan
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        className="bg-gray-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-500 transition"
                                                    >
                                                        <X size={16} /> Batal
                                                    </button>
                                                </form>
                                            ) : (
                                                user.name
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200 font-semibold">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-center space-x-2">
                                            {editingId !== user.id && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(
                                                                user.id
                                                            );
                                                            setData(
                                                                "name",
                                                                user.name
                                                            );
                                                            setData(
                                                                "email",
                                                                user.email
                                                            );
                                                        }}
                                                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        Delete
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

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition transform"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-800">
                                    {user.name}
                                </span>
                                <span className="text-gray-500 font-semibold">
                                    {user.email}
                                </span>
                            </div>

                            {editingId === user.id ? (
                                <form
                                    onSubmit={(e) => handleUpdate(e, user.id)}
                                    className="flex flex-col gap-2 mt-2"
                                >
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="px-2 py-1 border rounded-lg w-full"
                                    />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="px-2 py-1 border rounded-lg w-full"
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-blue-700 transition"
                                        >
                                            <Save size={16} /> Simpan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-gray-500 transition"
                                        >
                                            <X size={16} /> Batal
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex gap-2 mt-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setEditingId(user.id);
                                            setData("name", user.name);
                                            setData("email", user.email);
                                        }}
                                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg w-full text-center"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg w-full text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
