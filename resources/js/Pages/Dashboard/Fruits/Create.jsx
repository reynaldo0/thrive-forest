import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
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
            <Head title="Tambah Buah" />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Tambah Buah</h1>

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-lg shadow"
                >
                    {/* Nama */}
                    <div>
                        <label className="block font-semibold mb-1">Nama</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Masukkan nama buah"
                        />
                        {errors.name && (
                            <div className="text-red-500 mt-1 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Icon utama */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Icon Buah
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
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
                                        className="mx-auto w-24 h-24 object-cover rounded"
                                    />
                                ) : (
                                    <span className="text-gray-500">
                                        Klik / drag untuk upload icon
                                    </span>
                                )}
                            </label>
                        </div>
                        {errors.img && (
                            <div className="text-red-500 mt-1 text-sm">
                                {errors.img}
                            </div>
                        )}
                    </div>

                    {/* Stages */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Stages (5 gambar)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {data.stages.map((stage, i) => (
                                <div
                                    key={i}
                                    className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer"
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
                                                className="mx-auto w-16 h-16 object-cover rounded border"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-sm">
                                                Stage {i + 1}
                                            </span>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.stages && (
                            <div className="text-red-500 mt-1 text-sm">
                                {errors.stages}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 disabled:opacity-50"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
