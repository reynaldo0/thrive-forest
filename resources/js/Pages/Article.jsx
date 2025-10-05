import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";
import ArtikelBerita from "./Article/Artikel";
import BukuTerpadu from "./Article/BukuTerpadu";
import HeroArticle from "./Article/Hero";
import ProdukUnggul from "./Article/ProdukUnggul";
import Video from "./Article/VideoPembelajaran";
import Articles from "./Article/Artikel";

const Article = ({ artikels }) => {
    return (
        <div className="overflow-x-hidden">
            <Head title="Artikel" />
            <Navbar />
            <HeroArticle />
            <ProdukUnggul />
            <BukuTerpadu />
            <Articles artikels={artikels} />
            <Video />
            <Footer />
            <Ai />
        </div>
    );
};

export default Article;
