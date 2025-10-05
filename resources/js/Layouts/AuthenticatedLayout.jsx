import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Navbar from "./Dashboard/Navbar";
import Sidebar from "./Dashboard/Sidebar";
import { Toaster, toast } from "react-hot-toast";

export default function AuthenticatedLayout({ children }) {
    const { props, url } = usePage();
    const { flash } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Toast notif
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                style: {
                    background: "#d1fae5",
                    color: "#065f46",
                    border: "1px solid #10b981",
                },
                icon: "✅",
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                style: {
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "1px solid #ef4444",
                },
                icon: "❌",
            });
        }
    }, [flash]);

    // Generate breadcrumb dari url
    const segments = url.split("/").filter(Boolean);

    return (
        <div className="flex h-screen overflow-hidden bg-green-50">
            {/* Sidebar tetap fixed */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-y-auto relative">
                <Navbar setSidebarOpen={setSidebarOpen} />

                {/* Toast container */}
                <Toaster position="top-right" reverseOrder={false} />

                {/* Breadcrumb */}
                <div className="px-8 py-3 bg-white/70 backdrop-blur-sm border-b border-green-200 shadow-sm flex items-center gap-2 text-sm text-primary-100 z-20 relative">
                    <span className="text-primary-100 font-semibold">Home</span>
                    {segments.map((seg, idx) => {
                        const path = "/" + segments.slice(0, idx + 1).join("/");
                        const isLast = idx === segments.length - 1;
                        return (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="text-gray-400">/</span>
                                {isLast ? (
                                    <span className="font-medium text-gray-800 capitalize">
                                        {seg.replace("-", " ")}
                                    </span>
                                ) : (
                                    <a
                                        href={path}
                                        className="text-primary-100 hover:underline capitalize"
                                    >
                                        {seg.replace("-", " ")}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Kontainer utama dengan background & overlay */}
                <div className="relative flex-1">
                    {/* Background image */}
                    <div className="absolute inset-0 top-0 bg-[url('/background/dashboard.png')] bg-cover bg-center bg-no-repeat"></div>

                    {/* Overlay dengan blur */}
                    <div className="absolute inset-0 top-0 bg-black/10 backdrop-blur-md"></div>

                    {/* Konten utama */}
                    <div className="relative z-10 p-8 space-y-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
