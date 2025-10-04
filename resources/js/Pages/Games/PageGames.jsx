import React, { useState, useEffect, useRef } from "react";
import { usePage, router } from "@inertiajs/react";

export default function PageGames({ fruits }) {
    const [harvesting, setHarvesting] = useState([false, false, false, false]);
    const { points: backendPoints = 0, added: backendAdded = null } =
        usePage().props;

    const [inventory, setInventory] = useState([]);
    const [donation, setDonation] = useState(0);
    const [totalPoints, setTotalPoints] = useState(backendPoints);
    const [lastHarvest, setLastHarvest] = useState(
        backendAdded ? { name: null, points: backendAdded } : null
    );

    const [plots, setPlots] = useState([
        { fruit: null, stage: 0 },
        { fruit: null, stage: 0 },
        { fruit: null, stage: 0 },
        { fruit: null, stage: 0 },
    ]);

    // Parallax state
    const [offsetX, setOffsetX] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        let currentX = 0;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const scrollPassed = windowHeight - rect.top;
            const targetX = scrollPassed > 0 ? scrollPassed * 0.2 : 0;

            const animate = () => {
                currentX += (targetX - currentX) * 0.15;
                setOffsetX(currentX);

                if (Math.abs(targetX - currentX) > 0.5) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            };

            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        setTotalPoints(backendPoints);
        if (backendAdded) {
            setLastHarvest({
                name: lastHarvest?.name ?? "buah",
                points: backendAdded,
            });
        }
    }, [backendPoints, backendAdded]);

    // --- fungsi tanam, siram, panen, donasi ---
    const plantFruit = (fruit) => {
        const newPlots = [...plots];
        const emptyIndex = newPlots.findIndex(
            (p) => p.stage === 0 && p.fruit === null
        );
        if (emptyIndex !== -1) {
            newPlots[emptyIndex] = { fruit, stage: 1 };
            setPlots(newPlots);
        }
    };

    const waterPlant = (index) => {
        const newPlots = [...plots];
        if (newPlots[index].fruit && newPlots[index].stage < 4) {
            newPlots[index].stage += 1;
            setPlots(newPlots);
        }
    };

    const harvestFruit = (index) => {
        const newPlots = [...plots];
        if (newPlots[index].stage === 4 && !harvesting[index]) {
            if (inventory.length < 3) {
                const harvestedFruit = newPlots[index].fruit;
                const newHarvesting = [...harvesting];
                newHarvesting[index] = true;
                setHarvesting(newHarvesting);

                router.post(
                    "/harvest",
                    { fruit_id: harvestedFruit.id },
                    {
                        preserveScroll: true,
                        preserveState: true,
                        only: ["points", "added"],
                        onSuccess: (page) => {
                            setTotalPoints(page.props.points);
                            setLastHarvest({
                                name: harvestedFruit.name,
                                points: harvestedFruit.points,
                            });
                            setInventory([...inventory, harvestedFruit]);
                            const updatedPlots = [...plots];
                            updatedPlots[index] = { fruit: null, stage: 0 };
                            setPlots(updatedPlots);
                            const resetHarvesting = [...harvesting];
                            resetHarvesting[index] = false;
                            setHarvesting(resetHarvesting);
                        },
                        onError: () => {
                            const resetHarvesting = [...harvesting];
                            resetHarvesting[index] = false;
                            setHarvesting(resetHarvesting);
                        },
                    }
                );
            } else {
                alert("Inventori penuh! Donasikan dulu.");
            }
        }
    };

    const donateFruit = () => {
        if (inventory.length > 0) {
            const newInventory = [...inventory];
            newInventory.pop();
            setInventory(newInventory);
            setDonation(donation + 1);
        }
    };

    const renderStageImage = (plot) => {
        if (!plot.fruit) {
            return (
                <img
                    src="/gameicon/tanah1.png"
                    alt="tanah"
                    className="w-16 h-16"
                />
            );
        }
        const stageImg = plot.fruit.stages[plot.stage];
        return (
            <img
                src={stageImg}
                alt={`${plot.fruit.name} stage ${plot.stage}`}
                className="w-20 h-20"
            />
        );
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] px-6 py-16 relative overflow-hidden pb-60"
        >
            {/* Judul & Subjudul di luar card */}
            <h1 className="text-6xl md:text-7xl font-extrabold text-[#3A2E17] text-center mb-6">
                Games 1
            </h1><br></br>
            <p className="text-center text-2xl md:text-3xl font-bold text-white mb-10 bg-[#3A2E17] py-3 px-10 rounded-full shadow-lg">
                Pilih Buah yang ingin kamu tanam
            </p>

            {/* Card utama */}
            <div className="bg-[#F1FFE2] rounded-3xl shadow-2xl border-2 border-green-200 p-10 md:p-16 flex flex-col gap-10 max-w-6xl w-full relative z-10">
                {/* Pilih Buah */}
                <div className="flex justify-center gap-8 flex-wrap">
                    {fruits.map((fruit) => (
                        <button
                            key={fruit.id}
                            onClick={() => plantFruit(fruit)}
                            className="bg-white w-32 h-32 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition duration-300"
                        >
                            <img
                                src={fruit.img}
                                alt={fruit.name}
                                className="w-20 h-20"
                            />
                        </button>
                    ))}
                </div>

                {/* Inventori + Lahan */}
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    {/* Inventori */}
                    <div className="p-8 rounded-2xl shadow-md flex-1 bg-white/60 backdrop-blur-md border border-white/20">
                        <p className="font-bold text-2xl text-[#3A2E17] mb-4">
                            Inventori kamu
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-24 bg-white/70 rounded-lg flex items-center justify-center shadow-md"
                                >
                                    {inventory[i] ? (
                                        <img
                                            src={inventory[i].img}
                                            alt={inventory[i].name}
                                            className="w-16 h-16"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-2xl">
                                            +
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={donateFruit}
                            disabled={inventory.length === 0}
                            className={`px-8 py-3 rounded-lg text-lg text-white font-bold shadow-md w-full ${
                                inventory.length > 0
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Donasikan
                        </button>

                        {/* Total Poin */}
                        <div className="bg-yellow-100 mt-6 rounded-2xl shadow-md flex flex-col items-center px-8 py-6">
                            <p className="font-bold text-xl text-[#3A2E17]">
                                Total Poin Kamu
                            </p>
                            <p className="text-3xl font-extrabold text-[#3A2E17]">
                                {totalPoints} pts
                            </p>
                            {lastHarvest && (
                                <p className="mt-2 text-green-700 text-lg">
                                    🎉 Baru saja panen{" "}
                                    <b>{lastHarvest.name ?? "buah"}</b> +
                                    {lastHarvest.points} pts
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Lahan */}
                    <div className="p-8 rounded-2xl shadow-md flex-1 bg-white/60 backdrop-blur-md border border-white/20">
                        <p className="font-bold text-2xl text-[#3A2E17] mb-4">
                            Lahan Tanam
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {plots.map((plot, i) => (
                                <div
                                    key={i}
                                    className="w-28 h-36 rounded-lg flex flex-col items-center justify-center shadow-md p-3 bg-white/70 border border-white/20"
                                >
                                    {renderStageImage(plot)}
                                    {plot.fruit && plot.stage < 4 && (
                                        <button
                                            onClick={() => waterPlant(i)}
                                            className="mt-3 text-sm bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600"
                                        >
                                            Siram
                                        </button>
                                    )}
                                    {plot.stage === 4 && (
                                        <button
                                            onClick={() => harvestFruit(i)}
                                            className="mt-3 text-sm bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-600"
                                        >
                                            Panen
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Donasi */}
                <div className="bg-white rounded-2xl shadow-md flex items-center justify-between px-8 py-4 w-full">
                    <p className="font-bold text-xl text-[#3A2E17]">
                        Poin & Donasi Kamu
                    </p>
                    <p className="font-extrabold text-2xl text-[#3A2E17]">
                        {donation}x Buah
                    </p>
                </div>
            </div>

            {/* Rumput Parallax */}
            <div className="absolute bottom-0 left-0 w-full overflow-visible pointer-events-none">
                <img
                    src="/icon/rumput2.png"
                    alt="rumput kiri"
                    className="absolute bottom-0 left-0 w-1/3 object-contain"
                    style={{ transform: `translateX(-${offsetX}px)` }}
                />
                <img
                    src="/icon/rumput1.png"
                    alt="rumput kanan"
                    className="absolute bottom-0 right-0 w-1/3 object-contain"
                    style={{ transform: `translateX(${offsetX}px)` }}
                />
            </div>
        </section>
    );
}
