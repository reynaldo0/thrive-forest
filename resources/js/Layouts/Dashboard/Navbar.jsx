import { Menu } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ setSidebarOpen }) => {
    const { auth } = usePage().props;
    const user = auth?.user; // ambil user dari Inertia
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-green-200 px-6 py-4 shadow-md">
            <div className="flex items-center space-x-3">
                {/* Hamburger for mobile */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-lg hover:bg-green-100"
                >
                    <Menu size={24} className="text-green-700" />
                </button>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-600 via-lime-400 to-green-400 text-transparent bg-clip-text animate-pulse">
                    Dashboard 🌍
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-green-100 brutal-card transition">
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    🔔
                </button>

                {/* Profile */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <img
                            src={
                                user?.avatar_url ??
                                `https://ui-avatars.com/api/?name=${
                                    user?.name?.[0] || "U"
                                }`
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-green-500 shadow-md transition-transform hover:scale-105"
                        />
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            {user?.name}
                        </span>
                    </div>

                    {/* Dropdown */}
                    <div
                        className={`absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-out ${
                            open
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                        <Link
                            href="/admin/profile"
                            className="block px-4 py-2 text-sm hover:bg-green-100"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full text-left block px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
