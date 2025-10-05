import React from "react";
import HeroGames from "./Games/Hero";
import RulesLeaderboard from "./Games/Leaderboard";
import PageGames from "./Games/PageGames";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";

const Games = ({fruits, schools}) => {
    return (
        <>
            <Head title="Game 1" />
            <Navbar />
            <HeroGames />
            <RulesLeaderboard schools={schools}/>
            <PageGames fruits={fruits}/>
            <Footer/>
            <Ai/>
        </>
    );
};

export default Games;
