import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        desc: "",
        img: null,
        tag: "",
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("artikels.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Artikel" />
            <div className="md:p-6 mx-auto ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-secondary-200">
                        Tambah Artikel
                    </h1>
                    <Link
                        href={route("artikels.index")}
                        className="bg-gray-200 hidden md:block hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-sm transition text-center"
                    >
                        ← Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
                    encType="multipart/form-data"
                >
                    {/* Judul */}
                    <div>
                        <label className="block font-medium mb-1">
                            Judul Artikel
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan judul artikel"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
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
                            placeholder="Masukkan deskripsi"
                            value={data.desc}
                            onChange={(e) => setData("desc", e.target.value)}
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
                        <label className="block font-medium mb-1">Gambar</label>
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
                                        ? URL.createObjectURL(e.target.files[0])
                                        : null
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
                            placeholder="Masukkan tag"
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
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
