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

    const [offsetX, setOffsetX] = useState(0);
    const sectionRef = useRef(null);

    // Sinkronisasi totalPoints setiap kali props dari backend berubah
    useEffect(() => {
        setTotalPoints(backendPoints); // selalu update poin dari backend
        if (backendAdded) {
            setLastHarvest({
                name: lastHarvest?.name ?? "buah",
                points: backendAdded,
            });
        }
    }, [backendPoints, backendAdded]);

    // Tanam
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

    // Siram
    const waterPlant = (index) => {
        const newPlots = [...plots];
        if (newPlots[index].fruit && newPlots[index].stage < 4) {
            newPlots[index].stage += 1;
            setPlots(newPlots);
        }
    };

    // Panen
    const harvestFruit = (index) => {
        const newPlots = [...plots];
        if (newPlots[index].stage === 4 && !harvesting[index]) {
            // cek kalau belum sedang harvesting
            if (inventory.length < 3) {
                const harvestedFruit = newPlots[index].fruit;

                // Disable tombol panen sementara
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

                            // Reset lahan
                            const updatedPlots = [...plots];
                            updatedPlots[index] = { fruit: null, stage: 0 };
                            setPlots(updatedPlots);

                            // Update poin
                            setTotalPoints(page.props.points);

                            // Update last harvest
                            setLastHarvest({
                                name: harvestedFruit.name,
                                points: harvestedFruit.points,
                            });

                            // Enable tombol panen kembali (meskipun lahan kosong, safe)
                            const resetHarvesting = [...harvesting];
                            resetHarvesting[index] = false;
                            setHarvesting(resetHarvesting);
                        },
                        onError: () => {
                            // Kalau error, tombol kembali aktif
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

    // Donasi
    const donateFruit = () => {
        if (inventory.length > 0) {
            const newInventory = [...inventory];
            newInventory.pop();
            setInventory(newInventory);
            setDonation(donation + 1);
        }
    };

    // Render stage
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
            className="min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] flex flex-col items-center py-8 relative overflow-hidden"
        >
            <h1 className="text-3xl font-bold text-[#3A2E17] mb-6">Games</h1>

            {/* Pilih Buah */}
            <div className="bg-[#F1FFE2] p-6 rounded-2xl shadow-md w-[90%] max-w-3xl mb-6">
                <p className="text-center font-semibold text-[#3A2E17] mb-4">
                    Pilih Buah yang ingin kamu tanam
                </p>
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
            </div>

            {/* Inventori + Lahan */}
            <div className="flex flex-col md:flex-row gap-6 w-[90%] max-w-3xl mb-6">
                {/* Inventori */}
                <div
                    className="p-6 rounded-2xl shadow-md flex-1
                        bg-white/30 backdrop-blur-md border border-white/20"
                >
                    <p className="font-semibold text-[#3A2E17] mb-3">
                        Inventori kamu
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-20 h-20 bg-white/50 backdrop-blur-md border border-white/20 rounded-lg
                          flex items-center justify-center shadow-md"
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
                                ? "bg-green-600 hover:bg-green-700 transition duration-300"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Donasikan
                    </button>

                    {/* Total Poin */}
                    <div className="bg-yellow-100 mt-5 rounded-2xl shadow-md flex flex-col items-center px-6 py-4 w-[90%] max-w-3xl mb-6">
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
                <div
                    className="p-6 rounded-2xl shadow-md flex-1
                        bg-white/30 backdrop-blur-md border border-white/20"
                >
                    <p className="font-semibold text-[#3A2E17] mb-3">
                        Lahan Tanam
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {plots.map((plot, i) => (
                            <div
                                key={i}
                                className="w-24 h-32 rounded-lg flex flex-col items-center justify-center shadow-md p-2
                          bg-white/50 backdrop-blur-md border border-white/20"
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
            <div className="bg-white rounded-2xl shadow-md flex items-center justify-between px-6 py-3 w-[90%] max-w-3xl mb-6">
                <p className="font-semibold text-[#3A2E17]">Donasi Kamu</p>
                <p className="font-bold text-[#3A2E17]">{donation}x Buah</p>
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
