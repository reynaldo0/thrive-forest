import React from "react";
import { Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ artikels }) {
    const { delete: destroy } = useForm();

    const handleDelete = (slug) => {
        if (confirm("Yakin ingin menghapus artikel ini?")) {
            destroy(route("artikels.destroy", slug));
        }
    };

    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith("/images") || img.startsWith("http")) return img;
        return `/storage/${img}`;
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto py-10 px-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-secondary-200">
                        Daftar Artikel
                    </h1>
                    <Link
                        href={route("artikels.create")}
                        className="bg-secondary-200 hover:bg-opacity-90 text-white px-5 py-2 rounded-xl shadow-md transition font-medium text-center"
                    >
                        + Tambah Artikel
                    </Link>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white shadow-lg rounded-2xl border border-primary-100 overflow-x-auto">
                    {artikels.data.length === 0 ? (
                        <p className="p-4 text-gray-500">Tidak ada artikel</p>
                    ) : (
                        <table className="min-w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-primary-100 text-white font-semibold">
                                    <th className="px-4 py-3 border">No</th>
                                    <th className="px-4 py-3 border">Judul</th>
                                    <th className="px-4 py-3 border">
                                        Deskripsi
                                    </th>
                                    <th className="px-4 py-3 border">Gambar</th>
                                    <th className="px-4 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artikels.data.map((artikel, index) => (
                                    <tr
                                        key={artikel.id}
                                        className="hover:bg-primary-100/10 transition"
                                    >
                                        <td className="px-4 py-2 border text-center whitespace-nowrap">
                                            {index +
                                                1 +
                                                (artikels.current_page - 1) *
                                                    artikels.per_page}
                                        </td>
                                        <td className="px-4 py-2 border font-medium">
                                            {artikel.title}
                                        </td>
                                        <td className="px-4 py-2 border text-gray-600">
                                            {artikel.desc}
                                        </td>
                                        <td className="px-4 py-2 border text-center">
                                            {artikel.img ? (
                                                <img
                                                    src={getImageUrl(
                                                        artikel.img
                                                    )}
                                                    alt={artikel.title}
                                                    className="h-16 w-24 object-cover rounded mx-auto"
                                                />
                                            ) : (
                                                <span className="text-gray-400">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
                                                <Link
                                                    href={route(
                                                        "artikels.edit",
                                                        artikel.slug
                                                    )}
                                                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl shadow-sm font-medium transition text-center"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(artikel.slug)
                                                    }
                                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm font-medium transition"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {artikels.data.length === 0 && (
                        <p className="p-4 text-gray-500 text-center">
                            Tidak ada artikel
                        </p>
                    )}
                    {artikels.data.map((artikel, index) => (
                        <div
                            key={artikel.id}
                            className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition transform"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-800">
                                    {index +
                                        1 +
                                        (artikels.current_page - 1) *
                                            artikels.per_page}
                                    . {artikel.title}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">{artikel.desc}</p>
                            {artikel.img && (
                                <img
                                    src={getImageUrl(artikel.img)}
                                    alt={artikel.title}
                                    className="h-40 w-full object-cover rounded mb-2"
                                />
                            )}
                            <div className="flex flex-col gap-2">
                                <Link
                                    href={route("artikels.edit", artikel.id)}
                                    className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl shadow-md font-medium text-center transition"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(artikel.id)}
                                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md font-medium transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {artikels.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 border rounded font-medium transition ${
                                link.active
                                    ? "bg-primary-100 text-white"
                                    : "bg-white text-gray-700 hover:bg-primary-100/10"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
