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

    // Animasi parallax mirip Code B
    useEffect(() => {
        let animationFrameId;
        let currentX = 0;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Hitung scroll masuk section
            const scrollPassed = windowHeight - rect.top;

            // targetX = jarak horizontal
            const targetX = scrollPassed > 0 ? scrollPassed * 0.2 : 0;

            const animate = () => {
                currentX += (targetX - currentX) * 0.15; // lerp biar smooth
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

    // Sinkronisasi totalPoints
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
                    "/admin/harvest",
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
                    className="w-12 h-12"
                />
            );
        }
        const stageImg = plot.fruit.stages[plot.stage];
        return (
            <img
                src={stageImg}
                alt={`${plot.fruit.name} stage ${plot.stage}`}
                className="w-14 h-14"
            />
        );
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] px-6 py-12 relative overflow-hidden pb-60"
        >
            {/* Card utama */}
            <div className="bg-[#F1FFE2] rounded-3xl shadow-2xl border-2 border-green-200 p-10 md:p-16 flex flex-col gap-8 max-w-5xl w-full relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#3A2E17] mb-4 text-center">
                    Games
                </h1>

                {/* Pilih Buah */}
                <div className="flex justify-center gap-8 flex-wrap">
                    {fruits.map((fruit) => (
                        <button
                            key={fruit.id}
                            onClick={() => plantFruit(fruit)}
                            className="bg-white w-28 h-28 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition duration-300"
                        >
                            <img
                                src={fruit.img}
                                alt={fruit.name}
                                className="w-16 h-16"
                            />
                        </button>
                    ))}
                </div>

                {/* Inventori + Lahan */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    {/* Inventori */}
                    <div className="p-6 rounded-2xl shadow-md flex-1 bg-white/40 backdrop-blur-md border border-white/20">
                        <p className="font-semibold text-[#3A2E17] mb-3">
                            Inventori kamu
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-20 h-20 bg-white/50 rounded-lg flex items-center justify-center shadow-md"
                                >
                                    {inventory[i] ? (
                                        <img
                                            src={inventory[i].img}
                                            alt={inventory[i].name}
                                            className="w-14 h-14"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xl">
                                            +
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={donateFruit}
                            disabled={inventory.length === 0}
                            className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md w-full ${
                                inventory.length > 0
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Donasikan
                        </button>

                        {/* Total Poin */}
                        <div className="bg-yellow-100 mt-5 rounded-2xl shadow-md flex flex-col items-center px-6 py-4">
                            <p className="font-semibold text-[#3A2E17]">
                                Total Poin Kamu
                            </p>
                            <p className="text-2xl font-bold text-[#3A2E17]">
                                {totalPoints} pts
                            </p>
                            {lastHarvest && (
                                <p className="mt-2 text-green-700 text-sm">
                                    🎉 Baru saja panen{" "}
                                    <b>{lastHarvest.name ?? "buah"}</b> +
                                    {lastHarvest.points} pts
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Lahan */}
                    <div className="p-6 rounded-2xl shadow-md flex-1 bg-white/40 backdrop-blur-md border border-white/20">
                        <p className="font-semibold text-[#3A2E17] mb-3">
                            Lahan Tanam
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {plots.map((plot, i) => (
                                <div
                                    key={i}
                                    className="w-24 h-32 rounded-lg flex flex-col items-center justify-center shadow-md p-2 bg-white/50 border border-white/20"
                                >
                                    {renderStageImage(plot)}
                                    {plot.fruit && plot.stage < 4 && (
                                        <button
                                            onClick={() => waterPlant(i)}
                                            className="mt-2 text-xs bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500"
                                        >
                                            Siram
                                        </button>
                                    )}
                                    {plot.stage === 4 && (
                                        <button
                                            onClick={() => harvestFruit(i)}
                                            className="mt-2 text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
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
                <div className="bg-white rounded-2xl shadow-md flex items-center justify-between px-6 py-3 w-full">
                    <p className="font-semibold text-[#3A2E17]">Poin & Donasi Kamu</p>
                    <p className="font-bold text-[#3A2E17]">
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
