import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import ArtikelBerita from "./Article/Artikel";
import BukuTerpadu from "./Article/BukuTerpadu";
import HeroArticle from "./Article/Hero";
import ProdukUnggul from "./Article/ProdukUnggul";
import Video from "./Article/VideoPembelajaran";

const Article = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroArticle />
            <ProdukUnggul />
            <BukuTerpadu />
            <ArtikelBerita />
            <Video />
            <Footer />
        </>
    );
};

export default Article;
