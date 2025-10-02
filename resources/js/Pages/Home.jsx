import Ai from "@/Components/Ai";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import FiturWebsite from "./Home/Fitur";
import HeroHome from "./Home/Hero";
import NutiIntro from "./Home/Nuti";
import TujuanSection from "./Home/Tujuan";

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
        </div>
    );
};

export default Home;
