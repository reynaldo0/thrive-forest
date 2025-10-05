import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SmartMeal() {
    const [ingredients, setIngredients] = useState("");
    const [budget, setBudget] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${
                    import.meta.env.VITE_GEMINI_API_KEY
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Buat rencana menu harian sehat dengan bahan: ${ingredients}, budget Rp${budget}.
- Gunakan heading (###) untuk setiap waktu makan.
- Gunakan tabel markdown dengan kolom: Menu, Kandungan Gizi, Estimasi Biaya. - buatkan agar lebih ringkas namun informatif dan jelas tidak bertele tele. - buat agar tidak ada catatan`,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();
            const text =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Tidak ada respon dari AI";

            setResult(text);
        } catch (err) {
            console.error("Error:", err);
            setResult("❌ Gagal memanggil AI");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                🍽 Smart Meal Generator
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border"
            >
                <div>
                    <label className="block font-semibold mb-1">Bahan</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                        placeholder="Contoh: beras, telur, sayur"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">
                        Budget Harian (Rp)
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                        placeholder="Contoh: 20000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Menghasilkan..." : "Generate Menu"}
                </button>
            </form>

            {result && (
                <div className="mt-8 bg-gray-50 p-6 rounded-2xl shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                        📋 Rencana Menu Harian
                    </h3>
                    <div className="prose max-w-none prose-blue">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ node, ...props }) => {
                                    let src = props.src || "";

                                    // Kalau bukan direct file gambar → pakai fallback
                                    if (
                                        !src.match(
                                            /\.(jpeg|jpg|png|gif|webp)$/i
                                        )
                                    ) {
                                        src = `https://placehold.co/600x400?text=${
                                            props.alt || "Food"
                                        }`;
                                    }

                                    return (
                                        <img
                                            {...props}
                                            src={src}
                                            className="rounded-lg shadow-md my-3 max-h-60 object-cover"
                                            alt={props.alt || "Menu Image"}
                                        />
                                    );
                                },
                            }}
                        >
                            {result}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}
