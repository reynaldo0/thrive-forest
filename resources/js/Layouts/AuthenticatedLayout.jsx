import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Navbar from "./Dashboard/Navbar";
import Sidebar from "./Dashboard/Sidebar";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main content langsung tanpa header */}
            <main className="flex-1 flex flex-col">
                <Navbar />
                <div className="flex-1 p-8 space-y-10">{children}</div>
            </main>
        </div>
    );
}
