import React from "react";
import {
    FaTwitter,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPinterestP,
    FaYoutube,
    FaTiktok,
    FaMapMarkerAlt,
    FaEnvelope,
} from "react-icons/fa";
import Cta from "./Cta";

export default function Footer() {
    return (
        <>
            <Cta />
            <footer className="relative text-white bg-[#66863E]">
                {/* Konten Footer */}
                <div className="relative z-10 container mx-auto px-6 lg:px-16 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Hubungi Kami */}
                    <div className="flex flex-col space-y-4">
                        <img
                            src="/icon/logo-footer.png"
                            alt="NutriVerse"
                            className="w-32 mb-2"
                        />
                        <h3 className="text-lg font-semibold">Hubungi kami</h3>

                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-xl text-white" />
                            <span>Universitas Negeri Jakarta (UNJ)</span>
                        </p>

                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-xl text-white" />
                            <a
                                href="mailto:Nutinutriverse@gmail.com"
                                className="hover:text-yellow-200 transition"
                            >
                                Nutinutriverse@gmail.com
                            </a>
                        </p>

                        {/* Sosial Media */}
                        <div className="flex space-x-3 mt-3">
                            {[
                                {
                                    icon: <FaTwitter />,
                                    href: "https://twitter.com/",
                                },
                                {
                                    icon: <FaFacebookF />,
                                    href: "https://facebook.com/",
                                },
                                {
                                    icon: <FaInstagram />,
                                    href: "https://instagram.com/",
                                },
                                {
                                    icon: <FaLinkedinIn />,
                                    href: "https://linkedin.com/",
                                },
                                {
                                    icon: <FaPinterestP />,
                                    href: "https://pinterest.com/",
                                },
                                {
                                    icon: <FaYoutube />,
                                    href: "https://youtube.com/",
                                },
                                {
                                    icon: <FaTiktok />,
                                    href: "https://tiktok.com/",
                                },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white text-[#4C7C18] rounded-full hover:bg-yellow-200 transition transform hover:scale-110"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Akses Konten */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-lg font-semibold">Akses konten</h3>
                        <a
                            href="/"
                            className="hover:text-yellow-200 transition"
                        >
                            Beranda
                        </a>
                        <a
                            href="/about"
                            className="hover:text-yellow-200 transition"
                        >
                            Tentang
                        </a>
                        <a
                            href="/article"
                            className="hover:text-yellow-200 transition"
                        >
                            Artikel
                        </a>
                        <a
                            href="/product"
                            className="hover:text-yellow-200 transition"
                        >
                            Komunitas
                        </a>
                        <a
                            href="/games"
                            className="hover:text-yellow-200 transition"
                        >
                            Games 1
                        </a>
                        <a
                            href="/gamess"
                            className="hover:text-yellow-200 transition"
                        >
                            Games 2
                        </a>
                    </div>

                    {/* Sumber Data */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-lg font-semibold">Sumber data</h3>
                        <a
                            href="https://www.kemdikbud.go.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            Kemendikbud.go.id
                        </a>
                        <a
                            href="https://ipb.ac.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            IPB University
                        </a>
                        <a
                            href="https://pgpradjeka.co.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            PG Pradjeka
                        </a>
                        <a
                            href="https://ub.ac.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            Univ. Brawijaya
                        </a>
                        <a
                            href="https://ugm.ac.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            UGM
                        </a>
                        <a
                            href="https://www.bbc.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            BBC
                        </a>
                    </div>

                    {/* Credit */}
                    <div className="flex flex-col space-y-3">
                        <h3 className="text-lg font-semibold">Credit</h3>
                        <a
                            href="https://www.pinterest.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-200 transition"
                        >
                            Pinterest
                        </a>
                    </div>
                </div>

                {/* Footer Bawah */}
                <div className="relative z-10 text-center text-sm py-4 bg-[#2F4F12] -mt-4">
                    © 2025 NutriVerse. All rights reserved.
                </div>
            </footer>
        </>
    );
}
