import React from "react";
import HeroAbout from "./About/Hero";
import Vismis from "./About/Vismis";
import ZeroHunger from "./About/Zero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import VisiMisi from "./About/Vismis";

const About = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroAbout />
            <VisiMisi/>
            <ZeroHunger/>
        </>
    );
};

export default About;
