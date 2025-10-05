// Ai.jsx
import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import SmartMeal from "@/Pages/SmartMeal";

export default function Ai() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Head title="AI Smart Meal" />

            {/* Maskot Button */}
            <div
                className="fixed bottom-4 right-4 animate-bounce hover:scale-110 transition-transform duration-300 cursor-pointer z-50"
                onClick={() => setShowModal(true)}
            >
                <img
                    src="/icon/maskot.png"
                    alt="maskot"
                    className="w-28 md:w-36 drop-shadow-xl"
                />
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)} // klik overlay close
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative p-6 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()} // cegah close kalau klik dalam modal
                    >
                        {/* Tombol Close */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        {/* SmartMeal component */}
                        <SmartMeal />
                    </div>
                </div>
            )}
        </>
    );
}
