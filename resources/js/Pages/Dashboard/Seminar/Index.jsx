import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ seminars }) {
    const [selectedSeminar, setSelectedSeminar] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus seminar ini?")) {
            router.delete(route("seminars.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Daftar Seminar" />
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Daftar Seminar
                    </h1>
                    <Link
                        href={route("seminars.create")}
                        className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-4 sm:px-5 py-2 rounded-lg shadow transition text-center"
                    >
                        + Tambah Seminar
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-primary-100/10 text-left">
                            <tr className="text-gray-700 font-semibold">
                                <th className="px-4 sm:px-6 py-3">Judul</th>
                                <th className="px-4 sm:px-6 py-3">Tanggal</th>
                                <th className="px-4 sm:px-6 py-3">Lokasi</th>
                                <th className="px-4 sm:px-6 py-3 hidden md:table-cell">
                                    Deskripsi
                                </th>
                                <th className="px-4 sm:px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seminars.data.map((seminar) => (
                                <tr
                                    key={seminar.id}
                                    className="border-t hover:bg-primary-100/5 transition"
                                >
                                    <td className="px-4 sm:px-6 py-3 font-medium">
                                        {seminar.title}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">
                                        {seminar.date}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">
                                        {seminar.location}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 hidden md:table-cell">
                                        {seminar.description}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                                        <button
                                            onClick={() =>
                                                setSelectedSeminar(seminar)
                                            }
                                            className="bg-primary-100 hover:bg-primary-100/90 text-white px-3 py-1.5 rounded-md shadow text-sm transition text-center"
                                        >
                                            Peserta
                                        </button>
                                        <Link
                                            href={route(
                                                "seminars.edit",
                                                seminar.id
                                            )}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md shadow text-sm transition text-center"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(seminar.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md shadow text-sm transition text-center"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Peserta */}
                {selectedSeminar && (
                    <div
                        id="overlay"
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                        onClick={(e) =>
                            e.target.id === "overlay" &&
                            setSelectedSeminar(null)
                        }
                    >
                        <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedSeminar(null)}
                                className="absolute right-4 top-4 text-gray-500 hover:text-red-500 text-2xl"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Peserta Seminar:{" "}
                                <span className="text-primary-100">
                                    {selectedSeminar.title}
                                </span>
                            </h2>

                            {selectedSeminar.registrations.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                                        <thead className="bg-primary-100/10 text-gray-700">
                                            <tr>
                                                <th className="px-4 py-2 text-left">
                                                    Nama
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Email
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Telepon
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Catatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedSeminar.registrations.map(
                                                (reg) => (
                                                    <tr
                                                        key={reg.id}
                                                        className="border-t hover:bg-gray-50"
                                                    >
                                                        <td className="px-4 py-2 font-medium">
                                                            {reg.name}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {reg.email}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {reg.phone}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            {reg.notes || "-"}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    Belum ada peserta terdaftar.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
