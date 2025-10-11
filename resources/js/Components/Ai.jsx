import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import SmartMeal from "@/Pages/SmartMeal";

export default function Ai() {
    const [showModal, setShowModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Munculkan popup setiap 8 detik
    useEffect(() => {
        const show = () => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // tampil 3 detik
        };

        show(); // muncul pertama kali
        const interval = setInterval(show, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>

            {/* Floating Maskot + Popup */}
            <div className="fixed bottom-4 right-4 z-50">
                <div className="relative">
                    {/* Popup Chat di atas maskot */}
                    {showPopup && (
                        <div
                            className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl px-4 py-2 text-gray-800 text-sm font-medium animate-fadeInUp"
                            style={{
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            }}
                        >
                            💬 Hai, aku{" "}
                            <span className="font-semibold text-green-600">
                                NutriSmart
                            </span>
                            !{/* ekor chat bubble */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"></div>
                        </div>
                    )}

                    {/* Maskot Icon */}
                    <div
                        className="animate-shake-professional hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        <img
                            src="/icon/maskot.png"
                            alt="maskot"
                            className="w-20 md:w-32 drop-shadow-xl"
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative p-6 overflow-y-auto max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tombol Close */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        {/* Komponen SmartMeal */}
                        <SmartMeal />
                    </div>
                </div>
            )}
        </>
    );
}
