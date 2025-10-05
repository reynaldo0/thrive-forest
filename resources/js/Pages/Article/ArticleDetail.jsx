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
        const url = window.location.href; // URL artikel saat ini
        // Pakai Web Share API jika tersedia
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
            // fallback: copy ke clipboard
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
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] opacity-50 bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />
            <div className="relative w-full h-72 md:h-96 overflow-hidden">
                <img
                    src={getArticleImgPath(artikel.img)}
                    alt={artikel.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end p-6 md:p-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl">
                        {artikel.title}
                    </h1>
                </div>
            </div>

            <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Artikel */}
                <article className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />{" "}
                            {artikel.user?.name || "Penulis"}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />{" "}
                            {new Date(artikel.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <Landmark className="w-4 h-4" />{" "}
                            {artikel.tag || "Umum"}
                        </span>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                        {artikel.desc.split("\n").map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center gap-4">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary-200 text-white rounded-lg shadow hover:bg-secondary-200/90 transition"
                        >
                            <Share2 className="w-4 h-4" /> Bagikan
                        </button>
                        <Link
                            href={route("article")}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </Link>
                    </div>
                </article>

                {/* Aside Artikel Lainnya */}
                <aside className="space-y-6">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-6">
                        <h3 className="font-semibold text-lg mb-4 text-secondary-200">
                            Artikel Lainnya
                        </h3>
                        <ul className="space-y-3">
                            {otherArtikels.map((a) => (
                                <Link
                                    key={a.id}
                                    href={route("article.show", a.id)}
                                    className="block p-3 rounded-lg hover:bg-secondary-200 transition group"
                                >
                                    <p className="text-sm font-medium text-gray-800 group-hover:text-white">
                                        {a.title}
                                    </p>
                                    <p className="text-xs text-gray-500 group-hover:text-white">
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
