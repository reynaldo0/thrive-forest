import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const { props } = usePage();
    const user = props.auth?.user || null;

    const mainMenu = [
        { name: "Beranda", path: route("home") },
        { name: "Tentang", path: route("about") },
        { name: "Artikel", path: route("article") },
        { name: "Komunitas", path: route("product") },
        {
            name: "Games",
            children: [
                { name: "Game 1", path: route("games") },
                { name: "Game 2", path: route("gamess") },
            ],
        },
    ];

    const authMenu = [
        { name: "Login", path: route("login") },
        { name: "Sign In", path: route("register") },
    ];

    // Ambil route profile & logout sesuai role
    const profileRoute =
        user?.role === "admin"
            ? route("profile.edit")
            : route("user.profile.edit");

    const logoutRoute =
        user?.role === "admin" ? route("logout") : route("logout");

    const dashboardRoute = route("dashboard"); // khusus admin
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
                <div className="hidden md:flex flex-1 items-center justify-center space-x-6 font-bold text-xl">
                    {mainMenu.map((item) =>
                        !item.children ? (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="relative text-secondary-200 transition duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0 after:bg-secondary-200 after:transition-all
                  after:duration-300 hover:after:w-full hover:text-secondary-200"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <div key={item.name} className="relative group">
                                <button className="flex items-center space-x-1 text-secondary-200 font-bold cursor-pointer transition duration-300 hover:text-secondary-200">
                                    <span>{item.name}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown menu */}
                                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.path}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Auth / User Menu Desktop */}
                <div className="hidden md:flex items-center space-x-4 text-lg relative">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <span className="font-bold text-gray-900">
                                    {user.name}
                                </span>
                                <img
                                    src={
                                        user.avatar_url ||
                                        `https://ui-avatars.com/api/?name=${
                                            user.name?.[0] || "U"
                                        }`
                                    }
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full border border-black"
                                />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-2 z-50">
                                    {user.role === "admin" && (
                                        <Link
                                            href={dashboardRoute}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        href={profileRoute}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                    >
                                        Edit Profil
                                    </Link>
                                    <Link
                                        href={logoutRoute}
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        authMenu.map((item) =>
                            item.name === "Login" ? (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="px-5 py-2 rounded-full bg-secondary-200 text-white font-bold text-lg shadow-md hover:bg-primary-200 transition duration-300"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="px-5 py-2 rounded-full border-2 border-primary-200 text-primary-200 font-bold text-lg hover:bg-primary-200 hover:text-white transition duration-300"
                                >
                                    {item.name}
                                </Link>
                            )
                        )
                    )}
                </div>

                {/* Hamburger */}
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
                className={`md:hidden fixed top-20 right-4 w-72 bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-6 py-5 flex flex-col space-y-4 transition-all duration-300 transform origin-top-right ${
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                {/* User Info (Mobile) */}
                {user && (
                    <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
                        <img
                            src={
                                user.avatar_url ||
                                `https://ui-avatars.com/api/?name=${
                                    user.name?.[0] || "U"
                                }`
                            }
                            alt="Profile"
                            className="h-10 w-10 rounded-full border-2 border-primary-200"
                        />
                        <div>
                            <p className="font-bold text-gray-900">
                                {user.name}
                            </p>
                            <span className="text-sm text-gray-500">
                                {user.role}
                            </span>
                        </div>
                    </div>
                )}

                {/* Menu Utama */}
                {mainMenu.map((item) =>
                    !item.children ? (
                        <Link
                            key={item.name}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className="w-full text-gray-900 font-semibold hover:text-secondary-200 transition relative
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-secondary-200 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <div
                            key={item.name}
                            className="w-full flex flex-col space-y-2"
                        >
                            <span className="font-bold text-secondary-200">
                                {item.name}
                            </span>
                            {item.children.map((child) => (
                                <Link
                                    key={child.name}
                                    href={child.path}
                                    onClick={() => setIsOpen(false)}
                                    className="pl-4 text-gray-700 hover:text-secondary-200 transition"
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    )
                )}

                {/* Auth / User Actions */}
                {user ? (
                    <div className="flex flex-col w-full space-y-2 pt-2 border-t border-gray-200">
                        {user.role === "admin" && (
                            <Link
                                href={dashboardRoute}
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center px-5 py-2 rounded-full bg-primary-200 text-white font-bold hover:bg-primary-300"
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link
                            href={profileRoute}
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center px-5 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Edit Profil
                        </Link>
                        <Link
                            href={logoutRoute}
                            method="post"
                            as="button"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center px-5 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                        >
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col w-full space-y-2 pt-2 border-t border-gray-200">
                        {authMenu.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`w-full text-center px-5 py-2 rounded-full ${
                                    item.name === "Login"
                                        ? "bg-secondary-200 text-white font-bold shadow-md hover:bg-primary-200"
                                        : "border-2 border-primary-200 text-primary-200 font-bold hover:bg-primary-200 hover:text-white"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
