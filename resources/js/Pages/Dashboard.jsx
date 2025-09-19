import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Menu,
    BarChart2,
    Settings,
    LogOut,
    Users,
    TreePine,
    X,
} from "lucide-react";
import Earth from "@/Components/Earth";
import { useState } from "react";

export default function Dashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { label: "Overview", icon: <Users size={20} /> },
        { label: "Analytics", icon: <BarChart2 size={20} /> },
        { label: "Pohon", icon: <TreePine size={20} /> },
        { label: "Settings", icon: <Settings size={20} /> },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
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

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Navbar */}
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
                            <div className="relative group">
                                <img
                                    src="https://i.pravatar.cc/40"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-green-500 shadow-md cursor-pointer hover:scale-125 transition"
                                />
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition transform scale-95 group-hover:scale-100 overflow-hidden">
                                    <a
                                        href="profile"
                                        className="block px-4 py-2 text-sm hover:bg-green-100"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#logout"
                                        className="block px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="flex-1 p-8 space-y-10">
                        {/* Welcome Section */}
                        <section className="bg-gradient-to-r from-green-300 via-green-200 to-green-100 rounded-2xl p-10 shadow-lg text-center transition-transform">
                            <h2 className="text-3xl font-extrabold text-green-900">
                                Selamat Datang 🌱
                            </h2>
                            <p className="text-green-700 mt-2">
                                Eksplorasi insight, kontribusi lingkungan, dan
                                kelola akunmu.
                            </p>
                        </section>

                        {/* Grid Layout */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Earth */}
                            <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-green-200 hover:shadow-2xl transition">
                                <h3 className="text-xl font-semibold mb-6 text-green-800">
                                    🌍 Visualisasi Bumi
                                </h3>
                                <Earth />
                            </div>

                            {/* Stats */}
                            <div className="space-y-6">
                                {[
                                    { label: "👥 Siswa Aktif", value: "1,245" },
                                    {
                                        label: "🌳 Pohon Tertanam",
                                        value: "7,530",
                                    },
                                    {
                                        label: "🏆 Ranking Sekolah",
                                        value: "#3",
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="brutal-card bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-2xl p-6 shadow-md text-center hover:scale-110 hover:shadow-2xl transition"
                                    >
                                        <h3 className="text-lg font-bold text-green-800">
                                            {stat.label}
                                        </h3>
                                        <p className="text-3xl font-extrabold text-green-900 mt-2">
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
