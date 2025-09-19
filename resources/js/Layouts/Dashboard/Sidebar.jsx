import {
    Menu,
    BarChart2,
    Settings,
    LogOut,
    Users,
    TreePine,
    X,
} from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { label: "Overview", icon: <Users size={20} /> },
        { label: "Analytics", icon: <BarChart2 size={20} /> },
        { label: "Pohon", icon: <TreePine size={20} /> },
        { label: "Settings", icon: <Settings size={20} /> },
    ];

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
                            isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        } lg:translate-x-0
                        transition-transform duration-500 ease-in-out
                        w-72 bg-gradient-to-b from-green-700 to-green-900 text-white
                        shadow-2xl flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-green-600">
                    <h2 className="flex items-center gap-2 font-extrabold text-2xl tracking-wide brutal-gradient bg-gradient-to-r from-green-400 via-lime-500 to-green-200 text-transparent bg-clip-text">
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
                        <a
                            key={item.label}
                            href={`#${item.label.toLowerCase()}`}
                            className="flex items-center space-x-3 px-3 py-3 rounded-xl
                                           hover:bg-green-800 brutal-card
                                           hover:shadow-[0px_0px_15px_4px_rgba(16,185,129,0.8)]
                                           transition relative group"
                        >
                            {item.icon}
                            <span className="transition-opacity duration-300">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-green-600">
                    <a
                        href="#logout"
                        className="flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-red-600 brutal-card transition group relative"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
