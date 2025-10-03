import React from "react";
import { Link, usePage, useForm } from "@inertiajs/react";

export default function Index() {
    const { items } = usePage().props;
    const { delete: deleteItem } = useForm(); // useForm bisa dipakai untuk delete

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus item ini?")) {
            deleteItem(route("gizi.destroy", id), {
                onSuccess: () => console.log("Item berhasil dihapus"),
            });
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between mb-6 items-center">
                <h1 className="text-2xl font-bold">Game Items</h1>
                <Link
                    href={route("gizi.create")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    + Tambah Item
                </Link>
            </div>

            {/* List Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded p-4 flex flex-col items-center"
                    >
                        <img
                            src={
                                item.img_path
                                    ? `/storage/${item.img_path}`
                                    : "/placeholder.png"
                            }
                            alt={item.name}
                            className="w-24 h-24 object-contain mb-2"
                        />

                        <h2 className="font-semibold text-center">
                            {item.name}
                        </h2>

                        <div className="mt-2 flex gap-2 flex-wrap justify-center">
                            <Link
                                href={route("gizi.edit", item.id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Edit
                            </Link>
                            <Link
                                href={route("gizi.questions.index", item.id)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                            >
                                Lihat Pertanyaan
                            </Link>
                            <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
