import { Link } from "@inertiajs/react";
import React from "react";

export default function SmartMealResult({ optimizer, ai, budget }) {
    const formatRupiah = (num) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(num);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Hasil Smart Meal</h2>

            <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-semibold">Rangkuman Optimizer</h3>
                <p>Total biaya (optimizer): Rp {optimizer.total_cost}</p>
                <p>Sisa anggaran: Rp {optimizer.remaining_budget}</p>
                <div className="mt-2">
                    {optimizer.selected_items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                            <div>
                                {it.name} x {it.servings}{" "}
                            </div>
                            <div>{formatRupiah(it.total_price)}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-semibold">Menu (AI-generated)</h3>
                <pre className="whitespace-pre-wrap text-sm">
                    {JSON.stringify(ai, null, 2)}
                </pre>
                {/* if ai.menu exists you can render structured UI */}
            </div>

            <Link
                href={route("smartmeal.index")}
                className="px-3 py-1 bg-gray-200 rounded"
            >
                Kembali
            </Link>
        </div>
    );
}
