import React, { useState } from "react";
import { usePage, Link } from "@inertiajs/react";

export default function QuestionForm() {
    const { item, question } = usePage().props;
    const [qText, setQText] = useState(question ? question.question : "");
    const [options, setOptions] = useState(
        question ? question.options : ["", ""]
    );
    const [answer, setAnswer] = useState(question ? question.answer : "");

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);

        // Jika jawaban sebelumnya sudah tidak ada di options, reset
        if (!newOptions.includes(answer)) {
            setAnswer("");
        }
    };

    const addOption = () => {
        if (options.length < 5) setOptions([...options, ""]);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);

        // Reset jawaban jika opsi yang dipilih dihapus
        if (!newOptions.includes(answer)) {
            setAnswer("");
        }
    };

    const actionUrl = question
        ? route("gizi.questions.update", [item.id, question.id])
        : route("gizi.questions.store", item.id);

    const method = question ? "put" : "post";

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                {question
                    ? "Edit Pertanyaan"
                    : `Tambah Pertanyaan - ${item.name}`}
            </h1>

            <form
                action={actionUrl}
                method="POST"
                className="flex flex-col gap-4"
            >
                <input type="hidden" name="_method" value={method} />
                <input
                    type="hidden"
                    name="_token"
                    value={document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content")}
                />

                {/* Pertanyaan */}
                <input
                    type="text"
                    name="question"
                    placeholder="Pertanyaan"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    className="border px-3 py-2 rounded"
                    required
                />

                {/* Opsi jawaban */}
                <div>
                    <p className="font-semibold mb-2">Opsi Jawaban:</p>
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                name={`options[${idx}]`}
                                value={opt}
                                onChange={(e) =>
                                    handleOptionChange(idx, e.target.value)
                                }
                                className="border px-3 py-2 rounded flex-1"
                                required
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(idx)}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    {options.length < 5 && (
                        <button
                            type="button"
                            onClick={addOption}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                            + Tambah Opsi
                        </button>
                    )}
                </div>

                {/* Jawaban benar */}
                <div>
                    <p className="font-semibold mb-1">Jawaban Benar:</p>
                    <select
                        name="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                        required
                    >
                        <option value="">-- Pilih Jawaban --</option>
                        {options.map((opt, idx) => (
                            <option key={idx} value={opt}>
                                {opt || `Option ${idx + 1}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tombol */}
                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Simpan
                    </button>
                    <Link
                        href={route("gizi.questions.index", item.id)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
