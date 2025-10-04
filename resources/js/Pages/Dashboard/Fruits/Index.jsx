import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    PlusCircle,
    Edit3,
    Trash2,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

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

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">
                            {flash.success}
                        </span>
                    </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium">
                            {flash.error}
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Manajemen Tanaman
                    </h1>
                    <Link
                        href={route("fruits.create")}
                        className="bg-secondary-200 hover:bg-secondary-200/90 text-white px-4 sm:px-5 py-2 rounded-lg shadow transition text-center"
                    >
                        + Tambah Tanaman
                    </Link>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600">
                                    ID
                                </th>
                                <th className="p-3 font-semibold text-gray-600">
                                    Nama
                                </th>
                                <th className="p-3 font-semibold text-gray-600">
                                    Poin
                                </th>
                                <th className="p-3 font-semibold text-gray-600">
                                    Icon
                                </th>
                                <th className="p-3 font-semibold text-gray-600">
                                    Tahapan
                                </th>
                                <th className="p-3 font-semibold text-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {fruits.length > 0 ? (
                                fruits.map((fruit) => {
                                    const stages = normalizeStages(
                                        fruit.stages
                                    );
                                    return (
                                        <tr
                                            key={fruit.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3 text-gray-700">
                                                {fruit.id}
                                            </td>
                                            <td className="p-3 font-medium text-gray-900">
                                                {fruit.name}
                                            </td>
                                            <td className="p-3 text-gray-700">
                                                {fruit.points}
                                            </td>
                                            <td className="p-3">
                                                <img
                                                    src={fruit.img}
                                                    alt={fruit.name}
                                                    className="w-12 h-12 object-cover rounded-lg border"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2 flex-wrap">
                                                    {stages.map((stage, i) => (
                                                        <img
                                                            key={i}
                                                            src={stage}
                                                            alt={`Stage ${
                                                                i + 1
                                                            }`}
                                                            className="w-12 h-12 object-cover rounded-lg border"
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-3 flex gap-2">
                                                <Link
                                                    href={route(
                                                        "fruits.edit",
                                                        fruit.id
                                                    )}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-xs shadow transition"
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
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs shadow transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-6 text-center text-gray-500"
                                    >
                                        Tidak ada data Tanaman.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-4">
                    {fruits.length > 0 ? (
                        fruits.map((fruit) => {
                            const stages = normalizeStages(fruit.stages);
                            return (
                                <div
                                    key={fruit.id}
                                    className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] border border-gray-100"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {fruit.name}
                                        </h2>
                                        <span className="text-sm font-semibold text-gray-600">
                                            {fruit.points} pts
                                        </span>
                                    </div>
                                    <img
                                        src={fruit.img}
                                        alt={fruit.name}
                                        className="w-full h-32 object-cover rounded-lg mb-2 border"
                                    />
                                    <p>Tahapan :</p>
                                    {stages.length > 0 && (
                                        <div className="flex gap-2 overflow-x-auto mb-2">
                                            {stages.map((stage, i) => (
                                                <img
                                                    key={i}
                                                    src={stage}
                                                    alt={`Stage ${i + 1}`}
                                                    className="w-16 h-16 object-cover rounded-lg border flex-shrink-0"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={route(
                                                "fruits.edit",
                                                fruit.id
                                            )}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow font-medium text-center flex items-center justify-center gap-1"
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
                                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow font-medium text-center flex items-center justify-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Hapus
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">
                            Tidak ada data Tanaman.
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
