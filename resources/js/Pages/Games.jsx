import React from "react";
import HeroGames from "./Games/Hero";
import RulesLeaderboard from "./Games/Leaderboard";
import PageGames from "./Games/PageGames";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Ai from "@/Components/Ai";
import { Head } from "@inertiajs/react";

const Games = ({
    fruits,
    schools,
    points,
    added,
    energy,
    maxEnergy,
    potCapacity,
    fertilizer,
    plants,
    inventory
}) => {
    return (
        <>
            <Head title="NutriTree Game" />
            <Navbar />
            <HeroGames />
            <RulesLeaderboard schools={schools} />

            <PageGames
                fruits={fruits}
                points={points}
                added={added}
                energy={energy}
                maxEnergy={maxEnergy}
                potCapacity={potCapacity}
                fertilizer={fertilizer}
                plants={plants}
                inventory={inventory}
            />

            <Footer />
            <Ai />
        </>
    );
};

export default Games;
