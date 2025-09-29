import React from "react";
import HeroKomunitas from "./Product/Hero";
import KomuInto from "./Product/Komunitas";
import Seminar from "./Product/Seminar";
import ForumKomunitas from "./Product/ForumKomunitas";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import KomuIntro from "./Product/Komunitas";

const Product = () => {
    return (
        <>
            <Head title="Komunitas" />
            <Navbar />
            <HeroKomunitas />
            <KomuIntro/>
            <Seminar/>
            <ForumKomunitas/>
            <Footer/>
        </>
    );
};

export default Product;
