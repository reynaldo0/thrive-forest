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
- Gunakan tabel markdown dengan kolom: Menu, Kandungan Gizi, Estimasi Biaya.
- Buat ringkas, informatif, jelas, tidak bertele-tele.
- Tidak perlu catatan tambahan.`,
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
        <section className="min-h-screen bg-[#FCFFEC] flex flex-col items-center px-6 pt-16 pb-24">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#3B3B0E] text-center mb-3">
                NutriSmart
            </h1>
            <p className="text-center text-base md:text-lg text-[#3B3B0E] mb-8 max-w-2xl">
                Masukkan bahan yang tersedia dan budget harian, lalu dapatkan
                rekomendasi menu sehat, bergizi, dan hemat biaya.
            </p>

            {/* Form Input */}
            <form
                onSubmit={handleSubmit}
                className="bg-[#EDFFCD] border border-green-200 rounded-2xl p-6 md:p-8 shadow-md w-full max-w-2xl flex flex-col gap-5"
            >
                <div className="flex flex-col">
                    <label className="font-semibold text-sm md:text-base mb-1">
                        Bahan
                    </label>
                    <input
                        type="text"
                        placeholder="Contoh: beras, telur, sayur"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="border border-green-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-green-400 outline-none"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold text-sm md:text-base mb-1">
                        Budget Harian (Rp)
                    </label>
                    <input
                        type="number"
                        placeholder="Contoh: 20000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="border border-green-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-green-400 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#A6E272] hover:bg-[#94D45E] active:scale-95 transition px-5 py-3 rounded-xl font-semibold text-[#224C14] text-base shadow"
                >
                    {loading ? "Menghasilkan..." : "Generate Menu"}
                </button>
            </form>

            {/* Hasil AI */}
            {result && (
                <div className="mt-8 bg-white/90 rounded-2xl shadow-md border border-green-200 p-6 md:p-8 max-w-2xl w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3B3B0E] mb-5 text-center">
                        Rencana Menu Harian
                    </h2>
                    <div className="prose max-w-none prose-green text-base md:text-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </section>
    );
}
