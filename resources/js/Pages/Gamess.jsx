import React from "react";
import HeroGamess from "./Gamess/Hero";
import RulesLeaderboard from "./Gamess/Rules";
import PageGamess from "./Gamess/PageGamess";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";

const Games = ({fruits}) => {
    return (
        <>
            <Head title="Games" />
            <Navbar />
            <HeroGamess />
            <RulesLeaderboard/>
            <PageGamess/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default Games;
