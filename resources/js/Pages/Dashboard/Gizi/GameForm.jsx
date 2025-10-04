import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function GameForm({ item }) {
    const { data, setData, processing, errors } = useForm({
        name: item?.name || "",
        img_path: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);

        if (data.img_path) {
            formData.append("img_path", data.img_path);
        }

        // override method PATCH agar Laravel mengenali
        if (item) {
            formData.append("_method", "patch");
            router.post(route("gizi.update", item.id), formData, {
                preserveScroll: true,
            });
        } else {
            router.post(route("gizi.store"), formData, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={item ? "Edit Item" : "Tambah Item"} />
            <div className="md:p-6 mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-[#3B3B0E]">
                        {item ? "Edit Buah" : "Tambah Buah"}
                    </h1>
                    <Link
                        href={route("gizi.index")}
                        className="bg-gray-200 hidden md:block hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Card Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
                >
                    {/* Nama Item */}
                    <div>
                        <label className="block font-medium mb-1">
                            Nama Buah
                        </label>
                        <input
                            type="text"
                            placeholder="Nama Buah"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Upload Gambar */}
                    <div>
                        <label className="block font-medium mb-1">Gambar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("img_path", e.target.files[0])
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                        />

                        {/* Preview gambar lama */}
                        {item?.img_path && !data.img_path && (
                            <img
                                src={`/storage/${item.img_path}`}
                                alt={item.name}
                                className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
                            />
                        )}

                        {/* Preview file baru */}
                        {data.img_path && (
                            <img
                                src={URL.createObjectURL(data.img_path)}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg shadow"
                            />
                        )}
                        {errors.img_path && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.img_path}
                            </p>
                        )}
                    </div>

                    {/* Tombol */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("gizi.index")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-5 py-2 rounded-xl shadow-md transition disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
