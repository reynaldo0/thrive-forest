import React from "react";
import { Link, useForm } from "@inertiajs/react";

export default function GameForm({ item }) {
    const { data, setData, post, put, processing, errors } = useForm({
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

        if (item) {
            // Kirim FormData langsung, jangan bungkus di { data: formData }
            put(route("gizi.update", item.id), formData);
        } else {
            post(route("gizi.store"), formData);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                {item ? "Edit Item" : "Tambah Item"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nama Item"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                />

                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData("img_path", e.target.files[0])}
                        className="border px-3 py-2 rounded w-full"
                    />

                    {/* Preview gambar lama */}
                    {item?.img_path && !data.img_path && (
                        <img
                            src={`/storage/${item.img_path}`}
                            alt={item.name}
                            className="mt-2 w-24 h-24 object-contain"
                        />
                    )}

                    {/* Preview file baru */}
                    {data.img_path && (
                        <img
                            src={URL.createObjectURL(data.img_path)}
                            alt="Preview"
                            className="mt-2 w-24 h-24 object-contain"
                        />
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Simpan
                    </button>
                    <Link
                        href={route("gizi.index")}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
