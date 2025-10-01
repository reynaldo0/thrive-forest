import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
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
            <NutiIntro />
            <TujuanSection />
            <FiturWebsite />
            <Form />
            <Footer />
        </div>
    );
};

export default Home;
