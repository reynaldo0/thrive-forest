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
            <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {item ? "Edit Item" : "Tambah Item"}
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Nama Item */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">
                            Nama Item
                        </label>
                        <input
                            type="text"
                            placeholder="Nama Item"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                            required
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Upload Gambar */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">
                            Gambar
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData("img_path", e.target.files[0])
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.img_path}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                        >
                            Simpan
                        </button>
                        <Link
                            href={route("gizi.index")}
                            className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition-all font-semibold"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
