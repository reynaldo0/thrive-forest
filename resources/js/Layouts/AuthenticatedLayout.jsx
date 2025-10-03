import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Navbar from "./Dashboard/Navbar";
import Sidebar from "./Dashboard/Sidebar";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);


    return (
        <div className="flex bg-gradient-to-br from-green-50 via-white to-green-100">
            {/* Sidebar tetap fix */}
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main content bisa discroll */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 p-8 space-y-10">{children}</div>
            </main>
        </div>
    );
}
