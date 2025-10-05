import React, { useState } from "react";

export default function SmartMeal() {
    const [ingredients, setIngredients] = useState("");
    const [budget, setBudget] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // langsung ke OpenAI API (atau AI API lain)
            const response = await fetch(
                "https://api.openai.com/v1/responses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            import.meta.env.VITE_OPENAI_API_KEY
                        }`, // simpan key di .env Vite
                    },
                    body: JSON.stringify({
                        model: "gpt-4.1-mini",
                        input: `Buat menu dari bahan: ${ingredients} dengan budget Rp${budget}`,
                    }),
                }
            );

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error("Error:", err);
            setResult({ error: "Gagal memanggil AI" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
                Smart Meal Generator (React Only)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Masukkan bahan (pisahkan dengan koma)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />

                <input
                    type="number"
                    className="w-full border rounded p-2"
                    placeholder="Masukkan budget (Rp)"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Menghasilkan..." : "Generate Menu"}
                </button>
            </form>

            {result && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h3 className="font-semibold mb-2">Hasil AI</h3>
                    <pre className="whitespace-pre-wrap text-sm">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
