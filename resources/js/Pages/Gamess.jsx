import React from "react";
import HeroGamess from "./Gamess/Hero";
import RulesLeaderboard from "./Gamess/Rules";
import PageGamess from "./Gamess/PageGamess";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";

const Games = ({ items, schools }) => {
    return (
        <>
            <Head title="Game 2" />
            <Navbar />
            <HeroGamess />
            <RulesLeaderboard schools={schools} />
            <PageGamess items={items} />
            <Footer />
            <Ai />
        </>
    );
};

export default Games;
