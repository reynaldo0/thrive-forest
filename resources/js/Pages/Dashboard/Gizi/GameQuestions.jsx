import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function GameQuestions() {
    const { item } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={`Pertanyaan - ${item.name}`} />
            <div className="p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                        {item.name} - Pertanyaan
                    </h1>
                    <Link
                        href={route("gizi.questions.create", item.id)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                    >
                        + Tambah Pertanyaan
                    </Link>
                </div>

                {/* List Pertanyaan */}
                {item.questions.length === 0 ? (
                    <p className="text-gray-500 text-lg">
                        Belum ada pertanyaan.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {item.questions.map((q) => (
                            <div
                                key={q.id}
                                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                            >
                                <div className="mb-3">
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {q.question}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        Jawaban: {q.answer}
                                    </p>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <Link
                                        href={route("gizi.questions.edit", [
                                            item.id,
                                            q.id,
                                        ])}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-sm"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={route("gizi.questions.destroy", [
                                            item.id,
                                            q.id,
                                        ])}
                                        method="delete"
                                        as="button"
                                        confirm="Yakin ingin menghapus pertanyaan ini?"
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium text-sm"
                                    >
                                        Hapus
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Kembali */}
                <div className="mt-6">
                    <Link
                        href={route("gizi.index")}
                        className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all font-medium"
                    >
                        Kembali
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
