import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ submissions }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mail" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Data Terkirim
                </h1>

                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full text-sm text-left text-gray-700">
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
                                            <>
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
                                                )}
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
