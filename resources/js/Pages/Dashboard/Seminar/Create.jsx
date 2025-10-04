import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        date: "",
        location: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("seminars.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Buat Seminar" />
            <div className="mx-auto md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-[#3B3B0E]">
                        Tambah Seminar
                    </h1>
                    <Link
                        href={route("seminars.index")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition text-center"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Card Form */}
                <div className="bg-white shadow-lg rounded-2xl border border-green-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Seminar
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                placeholder="Masukkan judul seminar"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* Lokasi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lokasi
                            </label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                placeholder="Masukkan lokasi seminar"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                placeholder="Masukkan deskripsi seminar"
                                rows="4"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Tombol */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("seminars.index")}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-5 py-2 rounded-xl shadow-md transition disabled:opacity-50"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
