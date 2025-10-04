import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ submissions }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mail" />

            <div className="p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
                    Data Terkirim
                </h1>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Alamat</th>
                                <th className="px-4 py-3">Deskripsi</th>
                                <th className="px-4 py-3">Cerita</th>
                                <th className="px-4 py-3">Media</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {submissions.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">{item.email}</td>
                                    <td className="px-4 py-3">
                                        {item.address}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.description || "-"}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.story || "-"}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.media ? (
                                            item.media.match(
                                                /\.(jpg|jpeg|png|gif)$/i
                                            ) ? (
                                                <a
                                                    href={`/storage/${item.media}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={`/storage/${item.media}`}
                                                        alt="preview"
                                                        className="h-16 w-16 object-cover rounded-md border hover:scale-105 transition"
                                                    />
                                                </a>
                                            ) : (
                                                <a
                                                    href={`/storage/${item.media}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    Lihat File
                                                </a>
                                            )
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {submissions.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition transform"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-800">
                                    {item.name}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    {item.email}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">
                                <span className="font-semibold">Alamat:</span>{" "}
                                {item.address}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                <span className="font-semibold">
                                    Deskripsi:
                                </span>{" "}
                                {item.description || "-"}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                <span className="font-semibold">Cerita:</span>{" "}
                                {item.story || "-"}
                            </p>
                            {item.media && (
                                <div className="mt-2">
                                    {item.media.match(
                                        /\.(jpg|jpeg|png|gif)$/i
                                    ) ? (
                                        <a
                                            href={`/storage/${item.media}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={`/storage/${item.media}`}
                                                alt="preview"
                                                className="h-32 w-full object-cover rounded-md border hover:scale-105 transition"
                                            />
                                        </a>
                                    ) : (
                                        <a
                                            href={`/storage/${item.media}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline text-sm"
                                        >
                                            Lihat File
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
