import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        points: 1,
        img: null,
        stages: [null, null, null, null, null],
    });

    const [previewImg, setPreviewImg] = useState(null);
    const [previewStages, setPreviewStages] = useState([
        null,
        null,
        null,
        null,
        null,
    ]);

    const submit = (e) => {
        e.preventDefault();
        post(route("fruits.store"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Tanaman" />
            <div className="md:p-6 mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-secondary-200">
                        Tambah Tanaman
                    </h1>
                    <Link
                        href={route("fruits.index")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl shadow transition"
                    >
                        ← Kembali
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-xl shadow-md"
                >
                    {/* Nama */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
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
                        <label className="block text-gray-700 font-medium mb-1">
                            Points
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={data.points}
                            onChange={(e) => setData("points", e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                            placeholder="Masukkan jumlah poin untuk Tanaman ini"
                        />
                        {errors.points && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.points}
                            </p>
                        )}
                    </div>

                    {/* Icon utama */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Hasil Jadi Tanaman
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-100 hover:bg-primary-100transition">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="imgInput"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setData("img", file);
                                    setPreviewImg(URL.createObjectURL(file));
                                }}
                            />
                            <label
                                htmlFor="imgInput"
                                className="block cursor-pointer"
                            >
                                {previewImg ? (
                                    <img
                                        src={previewImg}
                                        alt="Preview"
                                        className="mx-auto w-24 h-24 object-cover rounded-lg border"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-500">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm">
                                            Klik / drag untuk upload icon
                                        </span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {errors.img && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.img}
                            </p>
                        )}
                    </div>

                    {/* Stages */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Tahapan (5 gambar)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {data.stages.map((stage, i) => (
                                <div
                                    key={i}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-100 hover:bg-primary-100transition cursor-pointer"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id={`stage-${i}`}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            const newStages = [...data.stages];
                                            newStages[i] = file;
                                            setData("stages", newStages);

                                            const newPreviews = [
                                                ...previewStages,
                                            ];
                                            newPreviews[i] =
                                                URL.createObjectURL(file);
                                            setPreviewStages(newPreviews);
                                        }}
                                    />
                                    <label
                                        htmlFor={`stage-${i}`}
                                        className="block cursor-pointer"
                                    >
                                        {previewStages[i] ? (
                                            <img
                                                src={previewStages[i]}
                                                alt={`Stage ${i + 1}`}
                                                className="mx-auto w-16 h-16 object-cover rounded-lg border"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Tahapan {i + 1}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.stages && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.stages}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-6 py-2
               bg-secondary-200 text-white font-medium
               rounded-lg shadow
               hover:bg-secondary-300
               focus:ring-2 focus:ring-secondary-200
               disabled:opacity-50 transition"
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
