import Earth from "@/Components/Earth";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <section className="bg-gradient-to-r from-[#60832F] via-primary-100 to-[#60832F] rounded-2xl p-10 shadow-lg text-center transition-transform">
                <h2 className="text-3xl font-extrabold text-secondary-200">
                    Selamat Datang
                </h2>
                <p className="text-secondary-200 mt-2">
                    Eksplorasi insight, kontribusi lingkungan, dan kelola
                    akunmu.
                </p>
            </section>

            {/* Grid Layout */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Earth */}
                <div className="lg:col-span-2 bg-primary-100/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-primary-100 hover:shadow-2xl transition">
                    <h3 className="text-xl font-semibold mb-6 text-secondary-200">
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
                            className="brutal-card bg-gradient-to-r from-[#60832F] via-primary-100 to-[#60832F] rounded-2xl p-6 shadow-md text-center hover:scale-110 hover:shadow-2xl transition"
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
        </AuthenticatedLayout>
    );
}
