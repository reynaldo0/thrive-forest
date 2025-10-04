import { Menu, Bell } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ setSidebarOpen }) => {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Tutup dropdown kalau klik di luar
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between
                           bg-white/70 backdrop-blur-xl border-b border-primary-100
                           px-6 py-4 shadow-md">
            {/* Left: Hamburger + Title */}
            <div className="flex items-center space-x-3">
                {/* Hamburger for mobile */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-full bg-white/10
                               hover:bg-primary-100 transition-colors duration-200"
                    aria-label="Open Sidebar"
                >
                    <Menu size={24} className="text-primary-100" />
                </button>

                <h1 className="text-2xl font-extrabold text-primary-100">
                    Dashboard
                </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button
                    className="relative p-2 rounded-full bg-white/10
                               hover:bg-primary-100 transition-colors duration-200"
                    aria-label="Notifications"
                >
                    <Bell size={22} className="text-primary-100" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                                `https://ui-avatars.com/api/?name=${user?.name ?? "U"}`
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-primary-100
                                       shadow-md transition-transform hover:scale-105"
                        />
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            {user?.name}
                        </span>
                    </div>

                    {/* Dropdown */}
                    <div
                        className={`absolute right-0 mt-3 w-44 bg-white border border-primary-100
                                   rounded-xl shadow-lg overflow-hidden transition-all duration-200 ease-out
                                   ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                    >
                        <Link
                            href="/admin/profile"
                            className="block px-4 py-2 text-sm hover:bg-primary-100transition"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full text-left block px-4 py-2 text-sm
                                       text-red-600 hover:bg-red-50 transition"
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
