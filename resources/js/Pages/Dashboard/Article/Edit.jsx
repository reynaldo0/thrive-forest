import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Edit({ artikel }) {
    const { data, setData, post, progress, errors } = useForm({
        title: artikel.title || "",
        desc: artikel.desc || "",
        img: null,
        tag: artikel.tag || "",
        _method: "PUT", // penting biar update
    });

    const [preview, setPreview] = useState(artikel.img ? `/storage/${artikel.img}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("artikels.update", artikel.id)); // pakai post + _method PUT
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Artikel" />
            <div className="max-w-xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6 text-[#3B3B0E]">
                    Edit Artikel
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    {/* Judul */}
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}

                    {/* Deskripsi */}
                    <textarea
                        value={data.desc}
                        onChange={(e) => setData("desc", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.desc && (
                        <p className="text-red-500">{errors.desc}</p>
                    )}

                    {/* Upload Gambar */}
                    <div>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-32 mb-2 rounded"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setData("img", e.target.files[0]);
                                setPreview(
                                    e.target.files[0]
                                        ? URL.createObjectURL(e.target.files[0])
                                        : preview
                                );
                            }}
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.img && (
                            <p className="text-red-500">{errors.img}</p>
                        )}
                    </div>

                    {/* Tag */}
                    <input
                        type="text"
                        value={data.tag}
                        onChange={(e) => setData("tag", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.tag && <p className="text-red-500">{errors.tag}</p>}

                    {/* Tombol Update */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
