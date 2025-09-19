import React from "react";
import HeroHome from "./Home/Hero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import NutiIntro from "./Home/Nuti";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <HeroHome />
            <NutiIntro/>
        </>
    );
};

export default Home;
