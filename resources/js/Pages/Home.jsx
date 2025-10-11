import Ai from "@/Components/Ai";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import FiturWebsite from "./Home/Fitur";
import HeroHome from "./Home/Hero";
import NutiIntro from "./Home/Nuti";
import Form from "./Home/Form";
import TujuanSection from "./Home/Tujuan";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Head title="Beranda" />
            <Navbar />
            <HeroHome />
            <NutiIntro/>
            <TujuanSection/>
            <FiturWebsite/>
            <Form/>
            <Footer/>
            <Ai/>
        </div>
    );
};

export default Home;
