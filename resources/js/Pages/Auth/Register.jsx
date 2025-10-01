import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E6F6C8] to-[#FFFDEB]">
            <Head title="Register" />
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-10 px-6 md:px-12 py-10">
                {/* Kiri */}
                <div className="flex flex-col items-center md:items-start flex-1 space-y-2">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 md:mt-[-120px] md:ml-[-200px]">
                        <img
                            src="/icon/logo.png"
                            alt="Logo"
                            className="w-20 md:w-32 h-20 md:h-32"
                        />
                        <h1 className="text-3xl md:text-6xl font-bold text-[#3F7F25]">
                            Nutriverse
                        </h1>
                    </div>

                    {/* Character images absolute */}
                    <div>
                        <img
                            src="/illustrasi/char/1.png"
                            alt="Char 1"
                            className="w-16 top-0 right-2 md:w-36 md:h-36 rounded-lg shadow absolute md:left-32 md:top-80"
                        />
                        <img
                            src="/illustrasi/char/2.png"
                            alt="Char 2"
                            className="w-12 top-0 left-2 md:w-36 md:h-36 rounded-lg shadow absolute md:left-[429px] md:top-72"
                        />
                        <img
                            src="/illustrasi/char/3.png"
                            alt="Char 3"
                            className="w-36 h-36 hidden md:block rounded-lg shadow absolute md:left-[699px] md:top-[320px]"
                        />
                        <img
                            src="/illustrasi/char/4.png"
                            alt="Char 4"
                            className="w-36 h-36 hidden md:block rounded-lg shadow absolute md:left-[299px] md:top-[520px]"
                        />
                        <img
                            src="/illustrasi/char/5.png"
                            alt="Char 5"
                            className="w-36 h-36 hidden md:block rounded-lg shadow absolute md:left-[599px] md:top-[520px]"
                        />
                    </div>
                </div>

                {/* Kanan - Form Register */}
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md flex-1 max-w-md w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3F3313] mb-8">
                        Buat Akun Baru
                    </h2>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Masukkan nama lengkap"
                                autoComplete="name"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Masukkan email"
                                autoComplete="username"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Masukkan password"
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Ulangi password"
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Tombol */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#90C444] text-white py-3 rounded-full font-bold hover:bg-[#7bb636] transition disabled:opacity-50"
                        >
                            Daftar
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-6 text-center text-sm text-gray-700">
                        Sudah punya akun?{" "}
                        <Link
                            href={route("login")}
                            className="text-orange-600 font-semibold hover:underline"
                        >
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
