import React from "react";
import HeroAbout from "./About/Hero";
import Vismis from "./About/Vismis";
import ZeroHunger from "./About/Zero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import VisiMisi from "./About/Vismis";
import TeamNutriverse from "./About/Team";

const About = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroAbout />
            <VisiMisi/>
            <ZeroHunger/>
            <TeamNutriverse/>
            <Footer/>
        </>
    );
};

export default About;
