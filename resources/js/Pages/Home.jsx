import React from "react";
import HeroHome from "./Home/Hero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <HeroHome />
        </>
    );
};

export default Home;
