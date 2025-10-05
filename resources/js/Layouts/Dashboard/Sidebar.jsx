import {
    BarChart2,
    Settings,
    LogOut,
    Users,
    TreePine,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    X,
    Gamepad,
    Mail,
    Presentation,
    LayoutDashboard,
    Apple,
    User2,
    PresentationIcon,
    FileText,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { PresenceContext } from "framer-motion";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); // collapse desktop

    const menuItems = [
        {
            label: "Overview",
            icon: <LayoutDashboard size={20} />,
            href: "/admin/overview",
        },
        {
            label: "Kolaborasi Sekolah",
            icon: <Users size={20} />,
            children: [
                { label: "Buat Kode Sekolah", href: "/admin/schools" },
                { label: "Join Kode Sekolah", href: "/admin/join-school" },
                { label: "Leaderboard", href: "/admin/leaderboard" },
            ],
        },
        {
            label: "Permainan Tanaman",
            icon: <TreePine size={20} />,
            children: [
                { label: "Lihat Tanaman", href: "/admin/fruits" },
                { label: "Buat Tanaman", href: "/admin/fruits/create" },
            ],
        },
        {
            label: "Permainan Gizi",
            icon: <Apple size={20} />,
            children: [
                { label: "Tebak Gizi Item", href: "/admin/gizi" },
                { label: "Tambah Item", href: "/admin/gizi/create" },
            ],
        },
        {
            label: "Kelola Seminar",
            icon: <Presentation size={20} />,
            children: [
                { label: "Daftar Seminar", href: "/admin/seminars" },
                { label: "Tambah Seminar", href: "/admin/seminars/create" },
            ],
        },
        {
            label: "Kelola Artikel",
            icon: <FileText size={20} />,
            children: [
                { label: "Daftar Artikel", href: "/admin/artikels" }, //masih belum bisa
                { label: "Tambah Artikel", href: "/admin/artikels/create" },
            ],
        },

        { label: "Pesan", icon: <Mail size={20} />, href: "/admin/mails" },
        {
            label: "Kelola Pengguna",
            icon: <Settings size={20} />,
            href: "/admin/users",
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
                    }
                    lg:translate-x-0
                    transition-all duration-500 ease-in-out
                    ${isCollapsed ? "lg:w-20" : "lg:w-72"}
                    w-72 bg-[url('/background/sidebar.png')] bg-cover bg-center bg-no-repeat text-white
                    shadow-2xl flex flex-col h-screen`}
            >
                <div className="absolute inset-0 h-auto bg-black/30"></div>
                <div className="relative z-10 flex flex-col h-full overflow-y-auto">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white">
                        {!isCollapsed && (
                            <a href="/">
                                <h2 className="flex items-center gap-2 font-extrabold text-2xl tracking-wide text-white">
                                    <img
                                        src="/icon/logo.png"
                                        alt="Nutriverse Logo"
                                        className="w-12 h-12 object-contain hover:scale-125 transition-transform duration-300"
                                    />
                                    Nutriverse
                                </h2>
                            </a>
                        )}

                        {/* Tombol Close Mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 lg:hidden rounded-full bg-white/10
             hover:bg-red-500/80 hover:text-white
             transition-colors duration-200
             focus:outline-none focus:ring-2 focus:ring-red-400"
                            aria-label="Tutup Sidebar"
                        >
                            <X size={22} />
                        </button>

                        {/* Tombol Collapse Desktop */}
                        <div className="hidden lg:flex relative group">
                            <button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="p-2 rounded-full bg-white/10
               hover:bg-primary-100/80 hover:text-white
               transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-primary-100"
                                aria-label={
                                    isCollapsed
                                        ? "Perbesar Sidebar"
                                        : "Perkecil Sidebar"
                                }
                            >
                                {isCollapsed ? (
                                    <ChevronRight size={22} />
                                ) : (
                                    <ChevronLeft size={22} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 px-2 mt-6 space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                toggleSubmenu(item.label)
                                            }
                                            className="group relative flex items-center justify-between w-full pl-4 pr-3 py-3 rounded-md transition-all duration-300"
                                        >
                                            {/* garis kiri */}
                                            <span className="absolute left-0 top-0 h-full w-1 bg-primary-100 scale-y-0 group-hover:scale-y-100 origin-top transition-transform rounded-r"></span>

                                            {/* icon + label */}
                                            <div className="flex items-center space-x-3 text-white group-hover:text-primary-100 hover:font-medium">
                                                {item.icon}
                                                {!isCollapsed && (
                                                    <span>{item.label}</span>
                                                )}
                                            </div>

                                            {!isCollapsed &&
                                                (openMenu === item.label ? (
                                                    <ChevronDown
                                                        size={18}
                                                        className="text-white group-hover:text-primary-100 hover:font-medium"
                                                    />
                                                ) : (
                                                    <ChevronRight
                                                        size={18}
                                                        className="text-white group-hover:text-primary-100 hover:font-medium"
                                                    />
                                                ))}
                                        </button>

                                        {/* Submenu */}
                                        {openMenu === item.label &&
                                            !isCollapsed && (
                                                <div className="ml-8 mt-1 space-y-1">
                                                    {item.children.map(
                                                        (sub) => (
                                                            <Link
                                                                key={sub.label}
                                                                href={sub.href}
                                                                className="block px-3 py-2 text-sm text-white/80 hover:text-primary-100 hover:font-medium transition-colors"
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="group relative flex items-center w-full pl-4 pr-3 py-3 rounded-md transition-all duration-300 text-white hover:text-primary-100 hover:font-medium"
                                    >
                                        {/* garis kiri */}
                                        <span className="absolute left-0 top-0 h-full w-1 bg-primary-100 scale-y-0 group-hover:scale-y-100 origin-top transition-transform rounded-r"></span>

                                        {/* icon + label */}
                                        <div className="flex items-center space-x-3">
                                            {item.icon}
                                            {!isCollapsed && (
                                                <span>{item.label}</span>
                                            )}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center space-x-3 px-3 py-3 w-full text-left rounded-xl bg-red-600 hover:bg-red-700 transition"
                        >
                            <LogOut size={20} />
                            {!isCollapsed && <span>Keluar</span>}
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
