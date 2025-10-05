import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function Articles({ artikels }) {
    function getArticleImgPath(img) {
        if (!img) return "";

        if (img.startsWith("http://") || img.startsWith("https://")) return img;

        if (img.startsWith("storage/")) return `/${img}`;
        if (!img.startsWith("/storage") && img.includes("artikels"))
            return `/storage/${img}`;

        if (!img.startsWith("/")) return `/images/article/${img}`;

        return img;
    }

    return (
        <section
            className="w-full bg-white relative py-20 px-6 md:px-12"
            id="article"
        >
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] opacity-50 bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Artikel Budaya
                </h2>

                <div className="grid gap-10 md:grid-cols-3 relative">
                    {artikels.data.map((article) => (
                        <div
                            key={article.id}
                            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            <div className="relative w-full h-56 overflow-hidden">
                                <img
                                    src={getArticleImgPath(article.img)}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute bottom-4 right-4 bg-secondary-200 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                    {article.tag || "Umum"}
                                </span>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-secondary-200 transition">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                                    {article.desc.substring(0, 100)}...
                                </p>

                                <Link
                                    href={route("article.show", article.slug)}
                                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-secondary-200 text-white font-medium hover:bg-secondary-400 shadow-md hover:shadow-lg transition-all"
                                >
                                    Baca Selengkapnya
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-2">
                    {artikels.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll={true} // tetap di posisi sekarang
                            className={`px-4 py-2 rounded-lg border ${
                                link.active
                                    ? "bg-secondary-200 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
