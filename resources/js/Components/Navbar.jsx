import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Beranda", path: route("home") },
        { name: "Produk", path: route("product") },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%]">
            <div className="flex items-center justify-between bg-white/30 backdrop-blur-lg border border-white/20 rounded-full shadow-lg px-6 py-3">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span className="font-extrabold text-black">Cashilo</span>
                </div>

                {/* Menu Desktop */}
                <ul className="hidden md:flex space-x-6 text-gray-900 font-medium items-center">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            {item.name === "Download" ? (
                                <Link
                                    href={item.path}
                                    className="px-4 py-2 rounded-full bg-primary-100 text-white font-bold shadow-md hover:bg-primary-200 transition duration-300"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Link
                                    href={item.path}
                                    className="relative transition duration-300 hover:text-primary-100 font-bold text-black"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Hamburger (Mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden w-8 h-8 flex items-center justify-center text-gray-900 focus:outline-none"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-7 w-7 text-primary-100" />
                    ) : (
                        <Bars3Icon className="h-7 w-7 text-primary-100" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-20 right-4 w-56 bg-white/80 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex flex-col items-center space-y-4 transition-all duration-300 transform origin-top-right ${
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`${
                            item.name === "Download"
                                ? "w-full text-center px-4 py-2 rounded-full bg-primary-100 text-white font-bold shadow-md hover:bg-primary-200"
                                : "text-gray-900 font-medium hover:text-primary-100 transition"
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
