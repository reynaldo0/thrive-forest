import React from "react";
import HeroAbout from "./About/Hero";
import Vismis from "./About/Vismis";
import ZeroHunger from "./About/Zero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";
import VisiMisi from "./About/Vismis";
import TeamNutriverse from "./About/Team";

const About = () => {
    return (
        <>
            <Head title="Tentang" />
            <Navbar />
            <HeroAbout />
            <VisiMisi/>
            <ZeroHunger/>
            <TeamNutriverse/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default About;
