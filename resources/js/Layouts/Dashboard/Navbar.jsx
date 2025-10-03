import { Menu } from "lucide-react";

const Navbar = ({ setSidebarOpen }) => {
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
                <div className="relative group">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-green-500 shadow-md cursor-pointer hover:scale-125 transition"
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition transform scale-95 group-hover:scale-100 overflow-hidden">
                        <a
                            href="/profile"
                            className="block px-4 py-2 text-sm hover:bg-green-100"
                        >
                            Profile
                        </a>
                        <a
                            href="/logout"
                            className="block px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
