import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ artikel }) {
    const { data, setData, post, processing, errors } = useForm({
        title: artikel.title || "",
        desc: artikel.desc || "",
        img: null,
        tag: artikel.tag || "",
        _method: "PUT",
    });

    // Fungsi bantu untuk mendapatkan URL gambar
    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith("http") || img.startsWith("/gamesicon")) return img;
        return `/storage/${img}`;
    };

    const [preview, setPreview] = useState(getImageUrl(artikel.img));

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("artikels.update", artikel.slug));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Artikel" />
            <div className="md:p-6 mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-secondary-200">
                        Edit Artikel
                    </h1>
                    <Link
                        href={route("artikels.index")}
                        className="bg-gray-200 hidden md:block hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition text-center"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Card Form */}
                <div className="bg-white shadow-lg rounded-2xl border border-primary-100 p-6">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        encType="multipart/form-data"
                    >
                        {/* Judul */}
                        <div>
                            <label className="block font-medium mb-1">
                                Judul Artikel
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            />
                            {errors.title && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block font-medium mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.desc}
                                onChange={(e) =>
                                    setData("desc", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition resize-none h-32"
                            />
                            {errors.desc && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.desc}
                                </p>
                            )}
                        </div>

                        {/* Upload Gambar */}
                        <div>
                            <label className="block font-medium mb-1">
                                Gambar
                            </label>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-full object-cover rounded-lg mb-2 shadow-sm"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setData("img", e.target.files[0]);
                                    setPreview(
                                        e.target.files[0]
                                            ? URL.createObjectURL(
                                                  e.target.files[0]
                                              )
                                            : preview
                                    );
                                }}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            />
                            {errors.img && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.img}
                                </p>
                            )}
                        </div>

                        {/* Tag */}
                        <div>
                            <label className="block font-medium mb-1">
                                Tag (opsional)
                            </label>
                            <input
                                type="text"
                                value={data.tag}
                                onChange={(e) => setData("tag", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            />
                            {errors.tag && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.tag}
                                </p>
                            )}
                        </div>

                        {/* Tombol Update */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("artikels.index")}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-6 py-2 rounded-xl shadow-md font-medium transition disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
