import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";

export default function Dashboard({ farms, inventory, donations, energy }) {
    const { post } = useForm();
    const [loadingFarm, setLoadingFarm] = useState(null);

    const plant = (id, crop) => {
        if (energy <= 0) {
            alert("⚡ Energi habis! Tunggu recharge.");
            return;
        }
        setLoadingFarm(id);
        router.post(
            route("farm.plant", id),
            { crop },
            {
                onFinish: () => setLoadingFarm(null),
            }
        );
    };

    const harvest = (id) => {
        setLoadingFarm(id);
        router.post(
            route("farm.harvest", id),
            {},
            {
                onFinish: () => setLoadingFarm(null),
            }
        );
    };

    const donate = (crop, amount) => {
        router.post(route("farm.donate"), { crop, amount });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                🌱 Farm Builder
            </h1>
            <p className="mb-6">⚡ Energi: {energy}/5</p>

            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-green-100 rounded text-center">
                    <p className="text-2xl font-bold">{farms.length}</p>
                    <p>Lahan</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded text-center">
                    <p className="text-2xl font-bold">
                        {inventory.reduce((a, b) => a + b.quantity, 0)}
                    </p>
                    <p>Total Panen</p>
                </div>
                <div className="p-4 bg-blue-100 rounded text-center">
                    <p className="text-2xl font-bold">
                        {donations.reduce((a, b) => a + b.quantity, 0)}
                    </p>
                    <p>Total Donasi</p>
                </div>
                <div className="p-4 bg-purple-100 rounded text-center">
                    <p className="text-2xl font-bold">Lv. 1</p>
                    <p>Petani</p>
                </div>
            </div>

            {/* Pilihan tanaman */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => plant(1, "apel")}
                    className="px-4 py-2 border rounded bg-red-200 hover:bg-red-300"
                >
                    🍎 Pohon Apel
                </button>
                <button
                    onClick={() => plant(1, "wortel")}
                    className="px-4 py-2 border rounded bg-orange-200 hover:bg-orange-300"
                >
                    🥕 Wortel
                </button>
                <button
                    onClick={() => plant(1, "bayam")}
                    className="px-4 py-2 border rounded bg-green-200 hover:bg-green-300"
                >
                    🌿 Bayam
                </button>
            </div>

            {/* Grid lahan */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {farms.map((farm) => (
                    <div
                        key={farm.id}
                        className="p-6 border rounded bg-yellow-50 text-center shadow hover:shadow-lg transition"
                    >
                        {loadingFarm === farm.id && <p>⏳ Loading...</p>}
                        {!farm.crop ? (
                            <p className="text-gray-400">🌱 Kosong</p>
                        ) : (
                            <div>
                                <p className="text-lg">🌾 {farm.crop}</p>
                                <progress
                                    className="w-full mt-2"
                                    value={Math.min(
                                        (new Date() -
                                            new Date(farm.planted_at)) /
                                            60000,
                                        1
                                    )}
                                    max="1"
                                ></progress>
                                <button
                                    onClick={() => harvest(farm.id)}
                                    className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Panen
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Inventori */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">📦 Inventori</h2>
                {inventory.length === 0 ? (
                    <p className="text-gray-500">Belum ada hasil panen</p>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {inventory.map((item) => (
                            <div
                                key={item.id}
                                className="p-3 border rounded flex justify-between items-center bg-white"
                            >
                                <p>
                                    {item.crop}: {item.quantity}
                                </p>
                                <button
                                    onClick={() => donate(item.crop, 1)}
                                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Donasi 1
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Donasi */}
            <div>
                <h2 className="text-xl font-semibold mb-2">
                    🎁 Donasi Terkumpul
                </h2>
                {donations.length === 0 ? (
                    <p className="text-gray-500">Belum ada donasi</p>
                ) : (
                    <div className="space-y-1">
                        {donations.map((d) => (
                            <p key={d.id}>
                                {d.crop}: {d.quantity}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
