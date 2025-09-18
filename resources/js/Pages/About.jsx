import React from "react";
import HeroAbout from "./About/Hero";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

const About = () => {
    return (
        <>
            <Head title="Welcome" />
            <Navbar />
            <HeroAbout />
        </>
    );
};

export default About;
