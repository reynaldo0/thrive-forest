import React from "react";
import HeroGames from "./Games/Hero";
import RulesLeaderboard from "./Games/Leaderboard";
import PageGames from "./Games/PageGames";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";

const Games = () => {
    return (
        <>
            <Head title="Games" />
            <Navbar />
            <HeroGames />
            <RulesLeaderboard/>
            <PageGames/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default Games;
