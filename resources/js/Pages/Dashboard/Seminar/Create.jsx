import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        date: "",
        location: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("seminars.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Buat Seminar" />
            <div className="max-w-xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-4">Tambah Seminar</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Judul Seminar"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title}</p>
                    )}

                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData("date", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.date && (
                        <p className="text-red-500">{errors.date}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Lokasi"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.location && (
                        <p className="text-red-500">{errors.location}</p>
                    )}

                    <textarea
                        placeholder="Deskripsi"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                    {errors.description && (
                        <p className="text-red-500">{errors.description}</p>
                    )}

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
