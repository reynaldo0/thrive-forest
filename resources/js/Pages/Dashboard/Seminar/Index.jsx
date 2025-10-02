import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";

export default function Index({ seminars }) {
    const [selectedSeminar, setSelectedSeminar] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Apakah kamu yakin ingin menghapus seminar ini?")) {
            router.delete(route("seminars.destroy", id));
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#3B3B0E]">
                    Daftar Seminar
                </h1>
                <Link
                    href={route("seminars.create")}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                >
                    + Tambah Seminar
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-green-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-green-100 text-left">
                        <tr className="text-green-900 font-semibold">
                            <th className="px-6 py-3">Judul</th>
                            <th className="px-6 py-3">Tanggal</th>
                            <th className="px-6 py-3">Lokasi</th>
                            <th className="px-6 py-3">Deskripsi</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seminars.data.map((seminar) => (
                            <tr
                                key={seminar.id}
                                className="border-t hover:bg-green-50 transition"
                            >
                                <td className="px-6 py-3">{seminar.title}</td>
                                <td className="px-6 py-3">{seminar.date}</td>
                                <td className="px-6 py-3">
                                    {seminar.location}
                                </td>
                                <td className="px-6 py-3">{seminar.description}</td>
                                <td className="px-6 py-3 space-x-3">
                                    <button
                                        onClick={() =>
                                            setSelectedSeminar(seminar)
                                        }
                                        className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg shadow transition"
                                    >
                                        Peserta
                                    </button>
                                    <Link
                                        href={route(
                                            "seminars.edit",
                                            seminar.id
                                        )}
                                        className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(seminar.id)}
                                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow transition"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Registrasi */}
            {selectedSeminar && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={(e) =>
                        e.target.id === "overlay" && setSelectedSeminar(null)
                    }
                    id="overlay"
                >
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
                        <button
                            onClick={() => setSelectedSeminar(null)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-red-500 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold text-green-700 mb-4">
                            Peserta Seminar: {selectedSeminar.title}
                        </h2>

                        {selectedSeminar.registrations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm border">
                                    <thead className="bg-green-100 text-green-900">
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
    );
}
