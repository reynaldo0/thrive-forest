import React from "react";
import { Link, usePage, useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { items } = usePage().props;
    const { delete: deleteItem } = useForm();

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus Buah ini?")) {
            deleteItem(route("gizi.destroy", id), {
                onSuccess: () => console.log("Buah berhasil dihapus"),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Game Tebak Gizi" />
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-[#3B3B0E]">
                        Tebak Gizi Game
                    </h1>
                    <Link
                        href={route("gizi.create")}
                        className="px-5 py-2 bg-secondary-200 hover:bg-secondary-200/90 text-white rounded-xl shadow-md transition-all font-semibold"
                    >
                        + Tambah Buah
                    </Link>
                </div>

                {/* List Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 p-5 flex flex-col items-center border border-gray-100"
                        >
                            <div className="w-32 h-32 mb-4 relative overflow-hidden rounded-2xl shadow-md">
                                <img
                                    src={
                                        item.img_path
                                            ? `/storage/${item.img_path}`
                                            : "/placeholder.png"
                                    }
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-110"
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800 text-center mb-4 truncate w-full">
                                {item.name}
                            </h2>

                            <div className="flex flex-wrap gap-3 justify-center w-full">
                                <Link
                                    href={route("gizi.edit", item.id)}
                                    className="px-4 py-2 bg-secondary-200 hover:bg-secondary-200/90 text-white rounded-xl shadow transition-all font-medium text-sm"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route(
                                        "gizi.questions.index",
                                        item.id
                                    )}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow transition-all font-medium text-sm"
                                >
                                    Pertanyaan
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition-all font-medium text-sm"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
