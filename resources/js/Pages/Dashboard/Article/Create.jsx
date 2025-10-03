import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        desc: "",
        img: null,
        tag: "",
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("artikels.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Artikel" />
            <div className="max-w-xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6 text-[#3B3B0E]">
                    Tambah Artikel
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <input
                        type="text"
                        placeholder="Judul Artikel"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}

                    <textarea
                        placeholder="Deskripsi"
                        value={data.desc}
                        onChange={(e) => setData("desc", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.desc && (
                        <p className="text-red-500">{errors.desc}</p>
                    )}

                    {/* Upload gambar dengan preview */}
                    <div>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-32 mb-2 rounded object-cover"
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
                                        : null
                                );
                            }}
                            className="w-full border rounded-lg px-4 py-2"
                        />
                        {errors.img && (
                            <p className="text-red-500">{errors.img}</p>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Tag (opsional)"
                        value={data.tag}
                        onChange={(e) => setData("tag", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.tag && <p className="text-red-500">{errors.tag}</p>}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
