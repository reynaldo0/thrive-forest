import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";

function normalizeStages(stages) {
    if (Array.isArray(stages)) return stages;
    if (!stages) return [];
    if (typeof stages === "string") {
        try {
            const parsed = JSON.parse(stages);
            return Array.isArray(parsed) ? parsed : [stages];
        } catch (e) {
            return [stages];
        }
    }
    return [];
}

export default function Index({ fruits = [] }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Fruits" />
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Manajemen Buah</h1>
                    <Link
                        href={route("fruits.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Tambah Buah
                    </Link>
                </div>

                {flash?.success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4 border border-green-200">
                        {flash.success}
                    </div>
                )}

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    ID
                                </th>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    Nama
                                </th>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    Poin
                                </th>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    Icon
                                </th>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    Stages
                                </th>
                                <th className="p-3 text-sm font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {fruits.map((fruit) => {
                                const stages = normalizeStages(fruit.stages);
                                return (
                                    <tr
                                        key={fruit.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 text-sm text-gray-700">
                                            {fruit.id}
                                        </td>
                                        <td className="p-3 text-sm font-medium text-gray-900">
                                            {fruit.name}
                                        </td>
                                        <td className="p-3 text-sm font-medium text-gray-900">
                                            {fruit.points}
                                        </td>
                                        <td className="p-3">
                                            <img
                                                src={fruit.img}
                                                alt={fruit.name}
                                                className="w-12 h-12 object-cover rounded border"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2 flex-wrap">
                                                {stages.map((stage, i) => (
                                                    <img
                                                        key={i}
                                                        src={stage}
                                                        alt={`Stage ${i + 1}`}
                                                        className="w-12 h-12 object-cover rounded border"
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "fruits.edit",
                                                        fruit.id
                                                    )}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm shadow transition"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "fruits.destroy",
                                                        fruit.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm shadow transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
