import React from "react";
import HeroArticle from "./Article/Hero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

const Article = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroArticle />
        </>
    );
};

export default Article;
