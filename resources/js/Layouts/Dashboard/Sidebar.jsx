import {
    BarChart2,
    Settings,
    LogOut,
    Users,
    TreePine,
    ChevronDown,
    ChevronRight,
    X,
    Gamepad,
    Mail,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // submenu yg terbuka

    const menuItems = [
        {
            label: "Overview",
            icon: <Users size={20} />,
            href: "/admin/overview",
        },
        {
            label: "Manajemen Tanaman",
            icon: <TreePine size={20} />,
            children: [
                { label: "Lihat Tanaman", href: "/admin/fruits" },
                { label: "Buat Tanaman", href: "/admin/fruits/create" },
            ],
        },
        {
            label: "Manajemen Seminar",
            icon: <BarChart2 size={20} />,
            children: [
                { label: "Daftar Seminar", href: "/admin/seminars" },
                { label: "Tambah Seminar", href: "/admin/seminars/create" },
            ],
        },
        {
            label: "Kolaborasi Tanaman",
            icon: <BarChart2 size={20} />,
            children: [
                { label: "Buat Kode Sekolah", href: "/admin/schools" },
                { label: "Join Kode Sekolah", href: "/admin/join-school" },
                { label: "Leaderboard", href: "/admin/leaderboard" },
            ],
        },
        {
            label: "Game",
            icon: <Gamepad size={20} />,
            href: "/admin/game",
        },
        {
            label: "Pesan",
            icon: <Mail size={20} />,
            href: "/admin/mails",
        },
        {
            label: "Settings",
            icon: <Settings size={20} />,
            href: "/admin/settings",
        },
    ];

    const toggleSubmenu = (label) => {
        setOpenMenu(openMenu === label ? null : label);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50
                    transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0
                    transition-transform duration-500 ease-in-out
                    w-72 bg-gradient-to-b from-green-700 to-green-900 text-white
                    shadow-2xl flex flex-col overflow-y-auto h-screen`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-green-600">
                    <h2 className="flex items-center gap-2 font-extrabold text-2xl tracking-wide bg-gradient-to-r from-green-400 via-lime-500 to-green-200 text-transparent bg-clip-text">
                        <img
                            src="/icon/logo.png"
                            alt="Nutriverse Logo"
                            className="w-12 h-12 object-contain hover:scale-125 transition-transform duration-300"
                        />
                        Nutriverse
                    </h2>

                    {/* Close btn for mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-green-800 transition lg:hidden"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 space-y-2 mt-6">
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() =>
                                            toggleSubmenu(item.label)
                                        }
                                        className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-green-800 transition"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </div>
                                        {openMenu === item.label ? (
                                            <ChevronDown size={18} />
                                        ) : (
                                            <ChevronRight size={18} />
                                        )}
                                    </button>

                                    {/* Submenu */}
                                    {openMenu === item.label && (
                                        <div className="ml-10 mt-2 space-y-2">
                                            {item.children.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="block px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-xl hover:bg-green-800 transition"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-green-600">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center space-x-3 px-3 py-3 w-full text-left rounded-xl hover:bg-red-600 transition"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
