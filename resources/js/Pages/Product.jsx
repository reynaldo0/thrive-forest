import React from "react";
import HeroKomunitas from "./Product/Hero";
import KomuInto from "./Product/Komunitas";
import Seminar from "./Product/Seminar";
import ForumKomunitas from "./Product/ForumKomunitas";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";
import KomuIntro from "./Product/Komunitas";

const Product = ({seminars}) => {
    return (
        <>
            <Head title="Komunitas" />
            <Navbar />
            <HeroKomunitas />
            <KomuIntro/>
            <Seminar seminars={seminars}/>
            <ForumKomunitas/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default Product;
