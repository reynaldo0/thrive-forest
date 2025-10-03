import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function GameQuestions() {
    const { item } = usePage().props;

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4 items-center">
                <h1 className="text-2xl font-bold">{item.name} - Pertanyaan</h1>
                <Link
                    href={route("gizi.questions.create", item.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    + Tambah Pertanyaan
                </Link>
            </div>

            <div className="flex flex-col gap-3">
                {item.questions.length === 0 && (
                    <p className="text-gray-500">Belum ada pertanyaan.</p>
                )}

                {item.questions.map((q) => (
                    <div
                        key={q.id}
                        className="border p-3 rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{q.question}</p>
                            <p className="text-gray-600">Jawaban: {q.answer}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={route("gizi.questions.edit", [
                                    item.id,
                                    q.id,
                                ])}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Edit
                            </Link>

                            {/* Hapus pakai Link Inertia */}
                            <Link
                                href={route("gizi.questions.destroy", [
                                    item.id,
                                    q.id,
                                ])}
                                method="delete"
                                as="button"
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                confirm="Yakin ingin menghapus pertanyaan ini?"
                            >
                                Hapus
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <Link
                    href={route("gizi.index")}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                    Kembali
                </Link>
            </div>
        </div>
    );
}
