import React from "react";
import HeroArticle from "./Article/Hero";
import FiturWebsite from "./Home/Fitur"; //buat nyoba doang
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

const Article = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroArticle />
            <FiturWebsite/>
        </>
    );
};

export default Article;
