import Ai from "@/Components/Ai";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
<<<<<<< HEAD
import { Head } from "@inertiajs/react";
import FiturWebsite from "./Home/Fitur";
import HeroHome from "./Home/Hero";
import NutiIntro from "./Home/Nuti";
import TujuanSection from "./Home/Tujuan";
=======
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";
import FiturWebsite from "./Home/Fitur";
import NutiIntro from "./Home/Nuti";
import TujuanSection from "./Home/Tujuan";
import Form from "./Home/Form";
import HeroHome from "./Home/Hero";
>>>>>>> 87f9e87 (update fe)

const Home = () => {
    return (
        <div className="bg-[#FCFFEC]">
            <Head title="Home" />
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
