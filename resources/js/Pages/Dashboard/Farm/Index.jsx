import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Dashboard({ farms, plants, inventory, donations }) {
    const addFarm = () => router.post(route("farm.add"));
    const plant = (farmId, plantId) =>
        router.post(route("farm.plant", farmId), { plant_id: plantId });
    const water = (farmId) => router.post(route("farm.water", farmId));
    const harvest = (farmId) => router.post(route("farm.harvest", farmId));
    const donate = (crop) =>
        router.post(route("farm.donate"), { crop, amount: 1 });

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">🌱 Farm Game</h1>

                <button
                    onClick={addFarm}
                    className="px-4 py-2 bg-green-600 text-white rounded mb-6"
                >
                    ➕ Tambah Lahan
                </button>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {farms.map((farm) => (
                        <div
                            key={farm.id}
                            className="p-4 border rounded bg-yellow-50 text-center"
                        >
                            {!farm.plant ? (
                                <div>
                                    <p className="mb-2">🌱 Kosong</p>
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        {plants.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() =>
                                                    plant(farm.id, p.id)
                                                }
                                                className="px-2 py-1 bg-blue-200 rounded"
                                            >
                                                {p.emoji} {p.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-lg">
                                        {farm.plant.emoji} {farm.plant.name}
                                    </p>
                                    {!farm.watered ? (
                                        <button
                                            onClick={() => water(farm.id)}
                                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                                        >
                                            💧 Siram
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => harvest(farm.id)}
                                            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                                        >
                                            🌾 Panen
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Inventory */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">📦 Inventori</h2>
                    {inventory.length === 0 ? (
                        <p>Belum ada hasil</p>
                    ) : (
                        inventory.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-2"
                            >
                                <span>
                                    {item.crop}: {item.quantity}
                                </span>
                                <button
                                    onClick={() => donate(item.crop)}
                                    className="px-2 py-1 bg-purple-500 text-white rounded"
                                >
                                    🎁 Donasi 1
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Donations */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">
                        🎁 Donasi Terkumpul
                    </h2>
                    {donations.length === 0 ? (
                        <p>Belum ada donasi</p>
                    ) : (
                        donations.map((d) => (
                            <p key={d.id}>
                                {d.crop}: {d.quantity}
                            </p>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
