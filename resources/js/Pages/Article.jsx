import React from "react";
import HeroArticle from "./Article/Hero";
import ProdukUnggul from "./Article/ProdukUnggul";
import BukuTerpadu from "./Article/BukuTerpadu";
import ArtikelBerita from "./Article/Artikel";
import Video from "./Article/VideoPembelajaran";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

const Article = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroArticle />
            <ProdukUnggul/>
            <BukuTerpadu/>
            <ArtikelBerita/>
            <Video />
            <Footer/>
        </>
    );
};

export default Article;
