import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Earth from '@/Components/Earth';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-green-800 dark:text-green-200">
                    🌍 Dashboard SDGs
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Sidebar */}
                <aside className="w-72 bg-white/70 dark:bg-gray-800/80 backdrop-blur-xl border-r border-green-200 dark:border-gray-700 shadow-xl p-6 hidden md:block">
                    <h3 className="text-lg font-bold mb-6 text-green-700 dark:text-green-300">
                        📂 Menu
                    </h3>
                    <ul className="space-y-4">
                        <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-medium">
                            Overview
                        </li>
                        <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-medium">
                            Analytics
                        </li>
                        <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-medium">
                            Settings
                        </li>
                    </ul>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">
                            Selamat Datang di Dashboard 🌱
                        </h1>
                        <p className="text-green-700 dark:text-green-400 mt-2">
                            Eksplorasi insight, kontribusi lingkungan, dan kelola akunmu
                        </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Earth Component */}
                        <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">
                                🌍 Visualisasi Bumi
                            </h2>
                            <Earth />
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-6">
                            <div className="bg-green-100 dark:bg-green-900/50 rounded-2xl p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                    👥 Siswa Aktif
                                </h3>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">
                                    1,245
                                </p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/50 rounded-2xl p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                    🌳 Pohon Tertanam
                                </h3>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">
                                    7,530
                                </p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/50 rounded-2xl p-6 shadow-md">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                    🏆 Ranking Sekolah
                                </h3>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-2">
                                    #3
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
