import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PageGames({
    fruits,
    points,
    added,
    energy,
    maxEnergy,
    potCapacity,
    fertilizer,
    plants,
    inventory: initialInventory,
}) {
    const [totalPoints, setTotalPoints] = useState(points);
    const [lastHarvest, setLastHarvest] = useState(
        added ? { name: null, points: added } : null
    );

    const [currentEnergy, setCurrentEnergy] = useState(energy);
    const [inventory, setInventory] = useState(initialInventory || []);
    const [globalDonation, setGlobalDonation] = useState(0);
    const [hasFertilizer, setHasFertilizer] = useState(false);
    const [plots, setPlots] = useState(
        Array.from({ length: potCapacity }, (_, i) => {
            const plant = plants[i] || null;
            return plant
                ? { id: plant.id, fruit: plant.fruit, stage: plant.stage }
                : { fruit: null, stage: 0 };
        })
    );

    const [buttonDisabled, setButtonDisabled] = useState({}); // track tombol disable sementara
    const ENERGY_REGEN_INTERVAL = 3 * 60 * 60 * 1000; // 3 jam
    const MAX_ENERGY = maxEnergy;

    const growthStages = [
        "Benih Tumbuh: Biji mulai berkecambah, sumber energi dari karbohidrat & protein.",
        "Kecambah: Daun muncul, fotosintesis mulai menghasilkan vitamin C & klorofil.",
        "Tanaman Muda: Akar menebal, umbi mulai terbentuk dengan beta-karoten, serat & kalium.",
        "Siap Panen: Umbi matang, kaya beta-karoten, vitamin (A, C, K, B6), serat & mineral.",
    ];

    // --- Load dan regenerasi energi ---
    useEffect(() => {
        const now = Date.now();
        const lastEnergy = localStorage.getItem("lastEnergyTime")
            ? parseInt(localStorage.getItem("lastEnergyTime"))
            : now;
        const diff = now - lastEnergy;

        if (diff >= ENERGY_REGEN_INTERVAL) {
            setCurrentEnergy(MAX_ENERGY);
            localStorage.setItem("lastEnergyTime", now.toString());
            toast.info("Energi kamu sudah penuh! ⚡");
        }

        const interval = setInterval(() => {
            const nowCheck = Date.now();
            const lastEnergyCheck = localStorage.getItem("lastEnergyTime")
                ? parseInt(localStorage.getItem("lastEnergyTime"))
                : nowCheck;
            if (nowCheck - lastEnergyCheck >= ENERGY_REGEN_INTERVAL) {
                setCurrentEnergy(MAX_ENERGY);
                localStorage.setItem("lastEnergyTime", nowCheck.toString());
                toast.info("Energi kamu sudah penuh! ⚡");
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const updateEnergyUsage = () => {
        const now = Date.now();
        localStorage.setItem("lastEnergyTime", now.toString());
    };

    // --- SHOP handler ---
    const buyItem = async (item) => {
        try {
            const { data } = await axios.post("/shop/buy", { item });
            toast.success(data.message || "Berhasil membeli!");
            setTotalPoints(data.points);
            setCurrentEnergy(data.energy);

            if (item === "fertilizer") setHasFertilizer(true);
            if (item === "pot") {
                setPlots((prev) => [
                    ...prev,
                    ...Array.from({ length: 2 }, () => ({
                        fruit: null,
                        stage: 0,
                    })),
                ]);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Gagal membeli item");
        }
    };

    // --- fungsi tanam ---
    const plantFruit = async (fruit) => {
        const emptyIndex = plots.findIndex((p) => !p.fruit);
        if (emptyIndex === -1) {
            toast.warning("Pot penuh! Upgrade untuk menanam lebih banyak.");
            return;
        }

        try {
            const { data } = await axios.post("/plants/plant", {
                fruit_id: fruit.id,
            });
            const newPlots = [...plots];
            newPlots[emptyIndex] = {
                id: data.plant.id,
                fruit: data.plant.fruit,
                stage: data.plant.stage,
            };
            setPlots(newPlots);
            toast.success(`Berhasil menanam ${fruit.name}!`);
        } catch (err) {
            toast.error(err.response?.data?.message || "Gagal menanam buah");
        }
    };

    // --- fungsi siram ---
    const waterPlant = async (index) => {
        if (currentEnergy <= 0) {
            toast.warning("Energi habis! Tunggu 3 jam untuk penuh ⚡");
            return;
        }
        if (buttonDisabled[`water${index}`]) return;

        setButtonDisabled((prev) => ({ ...prev, [`water${index}`]: true }));
        setTimeout(() => {
            setButtonDisabled((prev) => ({
                ...prev,
                [`water${index}`]: false,
            }));
        }, 1000); // 1 detik delay

        const plant = plots[index];
        if (!plant?.id || !plant.fruit || plant.stage >= 4) return;

        try {
            const { data } = await axios.post(`/plants/${plant.id}/water`);
            const newPlots = [...plots];
            newPlots[index] = {
                ...newPlots[index],
                stage: data.plant.stage,
                fruit: data.plant.fruit,
            };
            setPlots(newPlots);
            setCurrentEnergy((prev) => prev - 1);
            updateEnergyUsage();

            const stageIndex = data.plant.stage;
            const fruitName = data.plant.fruit.name;
            if (stageIndex > 0 && stageIndex <= growthStages.length) {
                toast.info(`${fruitName} - ${growthStages[stageIndex - 1]}`, {
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Gagal menyiram");
        }
    };

    // --- fungsi panen ---
    const harvestFruit = async (index) => {
        if (currentEnergy <= 0) {
            toast.warning("Energi habis! Tunggu 3 jam untuk penuh ⚡");
            return;
        }
        if (buttonDisabled[`harvest${index}`]) return;

        setButtonDisabled((prev) => ({ ...prev, [`harvest${index}`]: true }));
        setTimeout(() => {
            setButtonDisabled((prev) => ({
                ...prev,
                [`harvest${index}`]: false,
            }));
        }, 1000); // 1 detik delay

        const plant = plots[index];
        if (!plant?.id || plant.stage !== 4) return;

        try {
            const { data } = await axios.post("/plants/harvest", {
                plant_id: plant.id,
            });
            setTotalPoints(data.points);
            setLastHarvest({
                name: data.fruit.name,
                points: data.fruit.points,
            });
            setInventory(data.inventory);

            const newPlots = [...plots];
            newPlots[index] = { fruit: null, stage: 0 };
            setPlots(newPlots);
            setCurrentEnergy((prev) => prev - 1);
            updateEnergyUsage();

            toast.success(
                `Panen ${data.fruit.name}! +${data.fruit.points} poin`
            );
        } catch (err) {
            toast.error(err.response?.data?.error || "Gagal panen");
        }
    };

    // --- fungsi donasi dengan reward & animasi ---
    const [donation, setDonation] = useState(() => {
        // Ambil dari localStorage jika ada, default 0
        return parseInt(localStorage.getItem("donation") || "0");
    });
    const donateFruit = async () => {
        if (inventory.length === 0) {
            toast.warning("Tidak ada buah untuk didonasikan!");
            return;
        }

        try {
            const { data } = await axios.post("/donate");

            setInventory(data.inventory);
            setDonation((prev) => {
                const newDonation = prev + 1;
                localStorage.setItem("donation", newDonation); // simpan di localStorage
                return newDonation;
            });
            setGlobalDonation(data.totalDonated);

            toast.success(data.success || "Buahmu berhasil didonasikan! 🎉");
        } catch (err) {
            toast.error(err.response?.data?.error || "Gagal melakukan donasi");
        }
    };

    // --- render gambar tahap tanaman ---
    const renderStageImage = (plot) => {
        if (!plot.fruit)
            return (
                <img
                    src="/gameicon/tanah1.png"
                    alt="tanah"
                    className="w-16 h-16"
                />
            );
        const stageIndex = Math.min(plot.stage, plot.fruit.stages.length - 1);
        const stageImg = plot.fruit.stages[stageIndex];
        return (
            <img
                src={stageImg}
                alt={`${plot.fruit.name} stage ${plot.stage}`}
                className="w-20 h-20"
            />
        );
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] px-4 sm:px-6 py-10 md:py-16 relative overflow-hidden">
            <ToastContainer position="bottom-left" autoClose={2000} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3A2E17] text-center mb-6">
                Permainan NutriTree
            </h1>
            <p className="text-center text-lg sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-10 bg-[#3A2E17] py-2 sm:py-3 px-6 sm:px-10 rounded-full shadow-lg">
                Pilih Buah yang ingin kamu tanam
            </p>

            <div className="bg-[#F1FFE2] rounded-3xl shadow-2xl border-2 border-green-200 p-6 sm:p-10 md:p-16 flex flex-col gap-6 sm:gap-10 max-w-6xl w-full">
                {/* Pilih Buah */}
                <div className="flex justify-center gap-4 sm:gap-8 flex-wrap mb-6 sm:mb-10">
                    {fruits.map((fruit) => (
                        <button
                            key={fruit.id}
                            onClick={() => plantFruit(fruit)}
                            className="bg-white w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition duration-300"
                        >
                            <img
                                src={fruit.img}
                                alt={fruit.name}
                                className="w-16 h-16 sm:w-20 sm:h-20"
                            />
                        </button>
                    ))}
                </div>

                {/* Lahan dan Inventori */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
                    {/* Inventori + Shop */}
                    <div className="p-4 sm:p-8 rounded-2xl shadow-md flex-1 bg-white/60 backdrop-blur-md border border-white/20">
                        {/* Inventori */}
                        <p className="font-bold text-xl sm:text-2xl text-[#3A2E17] mb-3 sm:mb-4">
                            Inventori kamu
                        </p>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                            {inventory.map((inv, i) => (
                                <div
                                    key={i}
                                    className="w-20 h-20 sm:w-24 sm:h-24 bg-white/70 rounded-lg flex items-center justify-center shadow-md relative"
                                >
                                    {inv.quantity > 0 ? (
                                        <img
                                            src={inv.fruit.img}
                                            alt={inv.fruit.name}
                                            className="w-12 h-12 sm:w-16 sm:h-16"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xl sm:text-2xl">
                                            +
                                        </span>
                                    )}
                                    {inv.quantity > 1 && (
                                        <span className="absolute bottom-1 right-1 text-sm font-bold text-white bg-green-600 px-1 rounded">
                                            {inv.quantity}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={donateFruit}
                            disabled={inventory.length === 0}
                            className={`px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-lg text-white font-bold shadow-md w-full ${
                                inventory.length > 0
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Donasikan
                        </button>

                        {/* Shop */}
                        <div className="mt-4 sm:mt-6">
                            <p className="font-bold text-lg sm:text-xl text-[#3A2E17] mb-2">
                                🛒 Toko
                            </p>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <button
                                    onClick={() => buyItem("fertilizer")}
                                    className="bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300 text-sm sm:text-base"
                                >
                                    Beli Fertilizer (50 poin)
                                </button>
                                <button
                                    onClick={() => buyItem("boots_pupuk")}
                                    className="bg-orange-200 px-2 py-1 rounded hover:bg-orange-300 text-sm sm:text-base"
                                >
                                    Beli Fertilizer Boost (75 poin)
                                </button>
                                <button
                                    onClick={() => buyItem("pot")}
                                    className="bg-green-200 px-2 py-1 rounded hover:bg-green-300 text-sm sm:text-base"
                                >
                                    Beli Pot (100 poin)
                                </button>
                                <button
                                    onClick={() => buyItem("energy")}
                                    className="bg-blue-200 px-2 py-1 rounded hover:bg-blue-300 text-sm sm:text-base"
                                >
                                    Beli Energi +5 (20 poin)
                                </button>
                            </div>
                        </div>

                        {/* Total Poin + Energy */}
                        <div className="bg-yellow-100 mt-4 sm:mt-6 rounded-2xl shadow-md flex flex-col items-center px-4 sm:px-8 py-3 sm:py-6">
                            <p className="font-bold text-lg sm:text-xl text-[#3A2E17]">
                                Total Poin Kamu
                            </p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#3A2E17]">
                                {totalPoints} poin
                            </p>
                            {lastHarvest && (
                                <p className="mt-1 sm:mt-2 text-green-700 text-sm sm:text-lg">
                                    🎉 Baru saja panen{" "}
                                    <b>{lastHarvest.name ?? "buah"}</b> +
                                    {lastHarvest.points} poin
                                </p>
                            )}
                        </div>

                        <div className="bg-blue-100 mt-2 sm:mt-4 rounded-2xl shadow-md flex justify-between items-center px-4 sm:px-6 py-2 sm:py-3">
                            <p className="font-bold text-sm sm:text-lg text-[#3A2E17]">
                                Energy
                            </p>
                            <p className="text-lg sm:text-xl font-extrabold text-blue-700">
                                {currentEnergy} / {MAX_ENERGY}
                            </p>
                        </div>
                    </div>

                    {/* Lahan */}
                    <div className="p-4 sm:p-8 rounded-2xl shadow-md flex-1 bg-white/60 backdrop-blur-md border border-white/20">
                        <p className="font-bold text-xl sm:text-2xl text-[#3A2E17] mb-4">
                            Lahan Tanam
                        </p>
                        <div
                            className={`grid gap-4 sm:gap-6 ${
                                potCapacity > 4 ? "grid-cols-3" : "grid-cols-2"
                            }`}
                        >
                            {plots.map((plot, i) => (
                                <div
                                    key={i}
                                    className="w-24 sm:w-28 h-32 sm:h-36 rounded-lg flex flex-col items-center justify-center shadow-md p-2 sm:p-3 bg-white/70 border border-white/20"
                                >
                                    {renderStageImage(plot)}
                                    {plot.fruit && plot.stage < 4 && (
                                        <button
                                            onClick={() => waterPlant(i)}
                                            className={`mt-2 sm:mt-3 text-xs sm:text-sm bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600 ${
                                                buttonDisabled[`water${i}`]
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            Siram
                                        </button>
                                    )}
                                    {plot.fruit && plot.stage === 4 && (
                                        <button
                                            onClick={() => harvestFruit(i)}
                                            className={`mt-2 sm:mt-3 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded text-white ${
                                                plot.stage === 4
                                                    ? "bg-orange-500 hover:bg-orange-600"
                                                    : "bg-gray-400 cursor-not-allowed"
                                            } ${
                                                buttonDisabled[`harvest${i}`]
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            Panen
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Donasi & Poin */}
                <div className="bg-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 w-full mt-4 sm:mt-6 gap-2 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <p className="font-bold text-lg sm:text-xl text-[#3A2E17]">
                            Total Poin Kamu
                        </p>
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#3A2E17]">
                            {totalPoints} poin
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <p className="font-bold text-lg sm:text-xl text-[#3A2E17]">
                            Buah Didonasikan
                        </p>
                        <p className="text-xl sm:text-2xl font-extrabold text-green-600">
                            {donation}x
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
