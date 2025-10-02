import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E6F6C8] to-[#FFFDEB]">
            <Head title="Login" />
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

                    <div>
                        <img
                            src="/illustrasi/char/1.png"
                            alt="Char 1"
                            className="w-16 top-0 right-2 md:w-36 md:h-36 rounded-lg shadow absolute  md:left-32 md:top-80"
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

                {/* Kanan */}
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md flex-1 max-w-md w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3F3313] mb-8">
                        Masuk ke Dashboard
                    </h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
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
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Checkbox + Lupa password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                ingat saya
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 hover:underline"
                                >
                                    Lupa kata sandi ?
                                </Link>
                            )}
                        </div>

                        {/* Tombol */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#90C444] text-white py-3 rounded-full font-bold hover:bg-[#7bb636] transition disabled:opacity-50"
                        >
                            Masuk
                        </button>
                    </form>

                    {/* Daftar */}
                    <p className="mt-6 text-center text-sm text-gray-700">
                        Belum punya akun ?{" "}
                        <Link
                            href={route("register")}
                            className="text-orange-600 font-semibold hover:underline"
                        >
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
