import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mainMenu = [
        { name: "Beranda", path: route("home") },
        { name: "Tentang", path: route("about") },
        { name: "Artikel", path: route("article") },
        { name: "Produk", path: route("product") },
    ];

    const authMenu = [
        { name: "Login", path: route("login") },
        { name: "Sign In", path: route("register") },
    ];

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%]">
            <div className="flex items-center justify-between bg-white/30 backdrop-blur-lg border border-white/20 rounded-full shadow-lg px-6 py-3">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/icon/logo-t.png"
                        alt="Logo"
                        className="h-12 object-contain"
                    />
                </div>

                {/* Menu Desktop */}
                <div className="hidden md:flex flex-1 items-center justify-center space-x-6 text-gray-900 font-medium">
                    {mainMenu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="relative transition duration-300 hover:text-primary-100 font-bold text-black"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Menu Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    {authMenu.map((item) =>
                        item.name === "Login" ? (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="px-4 py-2 rounded-full bg-secondary-200 text-white font-bold shadow-md hover:bg-primary-200 transition duration-300 "
                            >
                                {item.name}
                            </Link>
                        ) : item.name === "Sign In" ? (
                            <Link
                                href={item.path}
                                className="px-4 py-2 rounded-full border-2 border-primary-200 text-primary-200 font-bold hover:bg-primary-200 hover:text-white transition duration-300"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="px-4 py-2 rounded-full border-2 border-primary-200 text-primary-200 font-bold hover:bg-primary-200 hover:text-white transition duration-300"
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </div>

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
                {[...mainMenu, ...authMenu].map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`${
                            item.name === "Login"
                                ? "w-full text-center px-4 py-2 rounded-full bg-secondary-200 text-white font-bold shadow-md hover:bg-primary-200"
                                : item.name === "Sign In"
                                ? "w-full text-center px-4 py-2 rounded-full border-2 border-primary-200 text-primary-200 font-bold hover:bg-primary-200 hover:text-white"
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
