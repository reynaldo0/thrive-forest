import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ schools }) {
    const { data, setData, post, errors } = useForm({
        name: "",
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
                        🌱 Tambah Tim Kode Sekolah
                    </h1>
                    <p className="text-green-700 mt-2">
                        Buat tim sekolah sekarang juga untuk kolaborasi antar
                        sekolah
                    </p>
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
