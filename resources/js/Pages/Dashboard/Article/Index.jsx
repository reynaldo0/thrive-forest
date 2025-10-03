import React from "react";
import { Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ artikels }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus artikel ini?")) {
            destroy(route("artikels.destroy", id));
        }
    };

    // Helper agar gambar bisa dari public atau storage
    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith("/images") || img.startsWith("http")) return img; // seeder/public
        return `/storage/${img}`; // storage Laravel
    };

    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Artikel</h1>
                <Link
                    href={route("artikels.create")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    + Tambah Artikel
                </Link>
            </div>

            {/* Table artikel */}
            <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
                {artikels.data.length === 0 ? (
                    <p className="p-4">Tidak ada artikel</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border">No</th>
                                <th className="px-4 py-2 border">Judul</th>
                                <th className="px-4 py-2 border">Deskripsi</th>
                                <th className="px-4 py-2 border">Gambar</th>
                                <th className="px-4 py-2 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artikels.data.map((artikel, index) => (
                                <tr key={artikel.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">
                                        {index + 1 + (artikels.current_page - 1) * artikels.per_page}
                                    </td>
                                    <td className="px-4 py-2 border font-semibold">
                                        {artikel.title}
                                    </td>
                                    <td className="px-4 py-2 border text-gray-600">
                                        {artikel.desc}
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {artikel.img ? (
                                            <img
                                                src={getImageUrl(artikel.img)}
                                                alt={artikel.title}
                                                className="h-16 w-24 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border text-center space-x-2">
                                        <Link
                                            href={route("artikels.edit", artikel.id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(artikel.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="flex space-x-2 mt-4">
                {artikels.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 border rounded ${
                            link.active
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
