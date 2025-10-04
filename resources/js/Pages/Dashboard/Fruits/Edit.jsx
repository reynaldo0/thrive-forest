import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";

function normalizeStages(stages) {
    if (Array.isArray(stages)) return stages;
    if (!stages) return [];
    if (typeof stages === "string") {
        try {
            const parsed = JSON.parse(stages);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
}

export default function Edit({ fruit }) {
    const oldStages = normalizeStages(fruit.stages);

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT",
        name: fruit.name || "",
        points: fruit.points || 1,
        img: null,
        stages: [null, null, null, null, null],
    });

    const [previewStages, setPreviewStages] = useState([
        oldStages[0] || null,
        oldStages[1] || null,
        oldStages[2] || null,
        oldStages[3] || null,
        oldStages[4] || null,
    ]);
    const [previewIcon, setPreviewIcon] = useState(fruit.img || null);

    const handleFileSelect = (file, type, index = null) => {
        if (!file) return;

        if (type === "icon") {
            setData("img", file);
            setPreviewIcon(URL.createObjectURL(file));
        } else if (type === "stage") {
            const newStages = [...data.stages];
            newStages[index] = file;
            setData("stages", newStages);

            const newPreviews = [...previewStages];
            newPreviews[index] = URL.createObjectURL(file);
            setPreviewStages(newPreviews);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("fruits.update", fruit.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Tanaman" />
            <div className="md:p-6 mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-secondary-200">
                        Edit Tanaman
                    </h1>
                    <Link
                        href={route("fruits.index")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                    >
                        ← Kembali
                    </Link>
                </div>

                {/* Card Form */}
                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-medium mb-1">
                            Nama Tanaman
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            placeholder="Masukkan nama Tanaman"
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Points */}
                    <div>
                        <label className="block font-medium mb-1">Points</label>
                        <input
                            type="number"
                            min="1"
                            value={data.points}
                            onChange={(e) => setData("points", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100 transition"
                            placeholder="Masukkan poin"
                        />
                        {errors.points && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.points}
                            </p>
                        )}
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block font-medium mb-1">
                            Icon Tanaman
                        </label>
                        <DragDropArea
                            preview={previewIcon}
                            onFileSelect={(file) =>
                                handleFileSelect(file, "icon")
                            }
                        />
                    </div>

                    {/* Stages */}
                    <div>
                        <label className="block font-medium mb-1">
                            Stages (1–5)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {previewStages.map((stage, i) => (
                                <DragDropArea
                                    key={i}
                                    preview={stage}
                                    label={`Stage ${i + 1}`}
                                    onFileSelect={(file) =>
                                        handleFileSelect(file, "stage", i)
                                    }
                                />
                            ))}
                        </div>
                        {errors.stages && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.stages}
                            </p>
                        )}
                    </div>

                    {/* Tombol */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("fruits.index")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-5 py-2 rounded-xl shadow-md transition disabled:opacity-50"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

function DragDropArea({ preview, onFileSelect, label }) {
    const fileInputRef = useRef();
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) onFileSelect(file);
    };

    return (
        <div
            className={`relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                isDragging
                    ? "border-primary-100 bg-primary-100/10"
                    : "border-gray-300 hover:border-secondary-200 hover:bg-secondary-200/5"
            }`}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            {preview ? (
                <img
                    src={preview}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-lg mb-2 shadow-sm"
                />
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-8 h-8 mb-1" />
                    <span className="text-sm">Drag & Drop / Klik</span>
                </div>
            )}
            {label && (
                <span className="absolute bottom-1 text-xs text-gray-600">
                    {label}
                </span>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => onFileSelect(e.target.files[0])}
            />
        </div>
    );
}
