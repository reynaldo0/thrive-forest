import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
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
            <Head title="Edit Buah" />
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Buah</h1>

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-xl shadow"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-medium mb-1">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Points</label>
                        <input
                            type="number"
                            min="1"
                            value={data.points}
                            onChange={(e) => setData("points", e.target.value)}
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {errors.points && (
                            <div className="text-red-600 text-sm mt-1">
                                {errors.points}
                            </div>
                        )}
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block font-medium mb-2">Icon</label>
                        <DragDropArea
                            preview={previewIcon}
                            onFileSelect={(file) =>
                                handleFileSelect(file, "icon")
                            }
                        />
                    </div>

                    {/* Stages */}
                    <div>
                        <label className="block font-medium mb-2">
                            Stages (1–5)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg shadow transition"
                    >
                        Simpan Perubahan
                    </button>
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
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
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
                    className="w-20 h-20 object-cover rounded mb-2 shadow-sm"
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
