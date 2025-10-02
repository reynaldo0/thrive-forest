import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";
import FiturWebsite from "./Home/Fitur";
import Form from "./Home/Form";
import NutiIntro from "./Home/Nuti";
import TujuanSection from "./Home/Tujuan";
import HeroHome from "./Home/Hero";

const Home = () => {
    return (
        <div className="bg-[#FCFFEC]">
            <Head title="Home" />
            <Navbar />
            <HeroHome />
            <NutiIntro/>
            <TujuanSection/>
            <FiturWebsite/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default Home;
