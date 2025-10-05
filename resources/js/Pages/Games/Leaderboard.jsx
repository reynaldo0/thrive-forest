import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function RulesLeaderboard({ schools }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 300);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 relative bg-[#F7FDEB]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl w-full">
                {/* Bagian Cara Main */}
                <div
                    className={`bg-[#F4FFE2] rounded-3xl shadow-lg p-8 md:p-10 transition-all duration-700 ease-out ${
                        animate
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-90"
                    }`}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#3A2E17] mb-6 text-center">
                        Cara main
                    </h2>
                    <ol className="list-decimal pl-5 space-y-4 text-[#3A2E17] text-lg md:text-xl leading-relaxed">
                        <li>
                            Pengguna dapat memilih produk tanaman yang tersedia
                            untuk menanam{" "}
                            <span className="text-green-600 font-semibold">
                                (Maksimal 4)
                            </span>
                        </li>
                        <li>
                            Setelah dipilih, akan diberikan bibit dari tanaman
                            tersebut. Bibit tersebut{" "}
                            <span className="text-green-600 font-semibold">
                                harus disirami
                            </span>{" "}
                            agar menjadi sebuah pohon dan menghasilkan produk
                            tanaman.
                        </li>
                        <li>
                            Ketika sudah menjadi produk, pengguna dapat menekan{" "}
                            <span className="text-green-600 font-semibold">
                                tombol donasi
                            </span>{" "}
                            untuk mendonasikan buah dan mendapatkan{" "}
                            <span className="text-green-600 font-semibold">
                                poin
                            </span>
                            .
                        </li>
                    </ol>
                </div>

                {/* Bagian Leaderboard */}
                <div
                    className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-primary-100 hover:shadow-2xl transition transform ${
                        animate
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-90"
                    }`}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center md:text-left text-secondary-200 flex items-center justify-center md:justify-start gap-2">
                        <Trophy className="w-6 md:w-8 h-6 md:h-8 text-yellow-500" />
                        Peringkat Sekolah
                    </h2>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="w-full divide-y divide-primary-100 min-w-[400px]">
                            <thead className="bg-primary-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                        Nama Sekolah
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                        Siswa
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                        Poin
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-secondary-200 uppercase tracking-wider">
                                        Team Code
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary-100">
                                {schools.map((school, i) => (
                                    <tr
                                        key={school.id}
                                        className="hover:bg-gray-100 transition transform"
                                    >
                                        <td className="px-6 py-4 text-secondary-200 font-bold">
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200">
                                            {school.name}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200">
                                            {school.users_count}
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200 font-semibold">
                                            {school.points} poin
                                        </td>
                                        <td className="px-6 py-4 text-secondary-200 truncate">
                                            {school.team_code}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden flex flex-col gap-4">
                        {schools.map((school, i) => (
                            <div
                                key={school.id}
                                className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-primary-100 hover:shadow-xl transition transform"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-secondary-200 text-lg">
                                        #{i + 1}
                                    </span>
                                    <span className="font-semibold text-primary-100">
                                        {school.points} poin
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-secondary-200 truncate">
                                    {school.name}
                                </h3>
                                <p className="text-sm text-secondary-200 mt-1 truncate">
                                    Team Code:{" "}
                                    <span className="font-medium text-primary-100">
                                        {school.team_code}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
