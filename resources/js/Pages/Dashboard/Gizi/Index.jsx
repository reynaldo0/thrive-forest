import React from "react";
import { Link, usePage, useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { items } = usePage().props;
    const { delete: deleteItem } = useForm();

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus item ini?")) {
            deleteItem(route("gizi.destroy", id), {
                onSuccess: () => console.log("Item berhasil dihapus"),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Game Tebak Gizi" />
            <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                        Tebak Gizi Game
                    </h1>
                    <Link
                        href={route("gizi.create")}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                    >
                        + Tambah Item
                    </Link>
                </div>

                {/* List Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="w-32 h-32 mb-4 relative">
                                <img
                                    src={
                                        item.img_path
                                            ? `/storage/${item.img_path}`
                                            : "/placeholder.png"
                                    }
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-xl border border-gray-200"
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-gray-800 text-center mb-4 truncate w-full">
                                {item.name}
                            </h2>

                            <div className="flex flex-wrap gap-2 justify-center w-full">
                                <Link
                                    href={route("gizi.edit", item.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-sm"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route(
                                        "gizi.questions.index",
                                        item.id
                                    )}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all font-medium text-sm"
                                >
                                    Pertanyaan
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
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
