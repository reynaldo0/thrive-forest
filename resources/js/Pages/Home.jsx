import React from "react";
import HeroHome from "./Home/Hero";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";
import NutiIntro from "./Home/Nuti";
import TujuanSection from "./Home/Tujuan";
import FiturWebsite from "./Home/Fitur";
import FormFooter from "./Home/Form";

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <HeroHome />
            <NutiIntro/>
            <TujuanSection/>
            <FiturWebsite/>
            <Footer/>
        </>
    );
};

export default Home;
