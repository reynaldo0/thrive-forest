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
            className="w-full bg-[#FCFFEC] relative py-20 px-6 md:px-12"
            id="article"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-[url('/background/heroartikel.png')] opacity-40 bg-no-repeat bg-cover bg-top"
                style={{ backgroundAttachment: "fixed", zIndex: 0 }}
            />
            <div className="max-w-7xl mx-auto relative">
                <h2 className="text-5xl md:text-6xl font-extrabold text-[#2E4600] mb-16 tracking-wide text-center">
                    Artikel Berita
                </h2>

                {/* Grid Card */}
                <div className="grid gap-12 md:grid-cols-3 relative">
                    {artikels.data.map((article) => (
                        <div
                            key={article.id}
                            className="rounded-3xl overflow-hidden bg-[#F9FFE9] shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-200 flex flex-col"
                        >
                            {/* Gambar */}
                            <div className="relative w-full h-56 overflow-hidden">
                                <img
                                    src={getArticleImgPath(article.img)}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute bottom-3 right-3 bg-[#4A3A1D] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                                    {article.tag || "Umum"}
                                </span>
                            </div>

                            {/* Konten */}
                            <div className="flex flex-col flex-grow">
                                {/* Judul */}
                                <div className="bg-[#C8F29D] py-3 px-6">
                                    <h3 className="text-[#2E4600] text-2xl font-bold">
                                        {article.title}
                                    </h3>
                                </div>

                                {/* Deskripsi */}
                                <div className="px-6 py-4 flex flex-col flex-grow">
                                    <p className="text-gray-800 leading-relaxed mb-6 text-justify">
                                        {article.desc.substring(0, 150)}...
                                    </p>

                                    {/* Tombol */}
                                    <Link
                                        href={route("article.show", article.slug)}
                                        className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#4A3A1D] text-white font-semibold hover:bg-[#3B2F17] transition-all shadow-md"
                                    >
                                        Baca Selengkapnya
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-14 flex justify-center items-center gap-2">
                    {artikels.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll={true}
                            className={`px-4 py-2 rounded-lg border ${
                                link.active
                                    ? "bg-[#90C444] text-white"
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
