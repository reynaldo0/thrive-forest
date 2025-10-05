import React, { useState } from "react";
import { usePage, Link, Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

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
        if (!newOptions.includes(answer)) setAnswer("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", question ? "put" : "post");
        formData.append("question", qText);
        options.forEach((opt, idx) => formData.append(`options[${idx}]`, opt));
        formData.append("answer", answer);

        const url = question
            ? route("gizi.questions.update", [item.id, question.id])
            : route("gizi.questions.store", item.id);

        router.post(url, formData, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title={question ? "Edit Pertanyaan" : "Tambah Pertanyaan"} />
            <div className="p-6 max-w-xl mx-auto">
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        {question
                            ? "Edit Pertanyaan"
                            : `Tambah Pertanyaan - ${item.name}`}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Pertanyaan */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-gray-700">
                                Pertanyaan
                            </label>
                            <input
                                type="text"
                                placeholder="Tulis pertanyaan..."
                                value={qText}
                                onChange={(e) => setQText(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                                required
                            />
                        </div>

                        {/* Opsi jawaban */}
                        <div className="flex flex-col">
                            <p className="font-semibold mb-2">Opsi Jawaban:</p>
                            {options.map((opt, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                idx,
                                                e.target.value
                                            )
                                        }
                                        className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                                        placeholder={`Option ${idx + 1}`}
                                        required
                                    />
                                    {options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOption(idx)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
                                    className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-fit"
                                >
                                    + Tambah Opsi
                                </button>
                            )}
                        </div>

                        {/* Jawaban benar */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-gray-700">
                                Jawaban Benar
                            </label>
                            <select
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
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

                        {/* Buttons */}
                        <div className="flex gap-3 justify-center mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all font-semibold"
                            >
                                Simpan
                            </button>
                            <Link
                                href={route("gizi.questions.index", item.id)}
                                className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition-all font-semibold"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
