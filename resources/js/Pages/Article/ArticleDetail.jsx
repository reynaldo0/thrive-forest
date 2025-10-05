import { Link } from "@inertiajs/react";
import { User, Calendar, Landmark, ArrowLeft, Share2 } from "lucide-react";

export default function ArticleDetail({ artikel, otherArtikels }) {
    if (!artikel)
        return (
            <p className="text-center text-gray-500">
                Artikel tidak ditemukan.
            </p>
        );

    function getArticleImgPath(img) {
        if (!img) return "";
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        if (img.startsWith("storage/")) return `/${img}`;
        if (!img.startsWith("/storage") && img.includes("artikels"))
            return `/storage/${img}`;
        if (!img.startsWith("/")) return `/images/article/${img}`;
        return img;
    }

    // Fungsi share
    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: artikel.title,
                    text: artikel.desc.substring(0, 100),
                    url,
                });
                console.log("Artikel berhasil dibagikan!");
            } catch (err) {
                console.error("Gagal membagikan:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert("URL artikel berhasil disalin ke clipboard!");
            } catch (err) {
                alert("Gagal menyalin URL ke clipboard");
            }
        }
    };

    return (
        <div className="bg-white relative min-h-screen">
            {/* Background */}
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] opacity-50 bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />

            {/* Header Gambar */}
            <div className="relative w-full h-80 md:h-[450px] overflow-hidden">
                <img
                    src={getArticleImgPath(artikel.img)}
                    alt={artikel.title}
                    className="w-full h-full object-contain md:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl leading-snug">
                        {artikel.title}
                    </h1>
                </div>
            </div>

            {/* Konten Utama */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Artikel Utama */}
                <article className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-10">
                    {/* Informasi Penulis */}
                    <div className="flex flex-wrap items-center text-base text-gray-700 gap-6 mb-8">
                        <span className="flex items-center gap-2">
                            <User className="w-5 h-5" />{" "}
                            {artikel.user?.name || "Penulis"}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />{" "}
                            {new Date(artikel.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <Landmark className="w-5 h-5" />{" "}
                            {artikel.tag || "Umum"}
                        </span>
                    </div>

                    {/* Isi Artikel */}
                    <div className="prose max-w-none text-gray-800 leading-relaxed text-lg md:text-xl">
                        {artikel.desc.split("\n").map((p, i) => (
                            <p key={i} className="mb-5">
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-12 flex items-center gap-4">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-6 py-3 bg-[#90C444] text-white text-lg font-semibold rounded-lg shadow hover:bg-[#7EB73A] transition"
                        >
                            <Share2 className="w-5 h-5" /> Bagikan
                        </button>
                        <Link
                            href={route("article")}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 text-lg font-semibold rounded-lg shadow hover:bg-gray-200 transition"
                        >
                            <ArrowLeft className="w-5 h-5" /> Kembali
                        </Link>
                    </div>
                </article>

                {/* Sidebar Artikel Lainnya */}
                <aside className="space-y-6">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8">
                        <h3 className="font-bold text-2xl mb-6 text-[#90C444]">
                            Artikel Lainnya
                        </h3>
                        <ul className="space-y-4">
                            {otherArtikels.map((a) => (
                                <Link
                                    key={a.id}
                                    href={route(
                                        "article.show",
                                        a.slug || a.id
                                    )}
                                    className="block p-4 rounded-xl hover:bg-[#90C444] hover:text-white transition group shadow-sm border border-gray-100"
                                >
                                    <p className="text-base font-semibold text-gray-800 group-hover:text-white mb-1">
                                        {a.title}
                                    </p>
                                    <p className="text-sm text-gray-500 group-hover:text-white">
                                        {a.user?.name || "Penulis"} •{" "}
                                        {new Date(
                                            a.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </aside>
            </section>
        </div>
    );
}
