import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Navbar from "@/Components/Navbar";
import { FaSchool, FaLock, FaUser, FaTrashAlt } from "react-icons/fa";

export default function UserEdit({ mustVerifyEmail, status, schools, userSchool }) {
    const user = usePage().props.auth.user;

    const [offsetY, setOffsetY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY * 0.3);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // === Profile form ===
    const {
        data: profileData,
        setData: setProfileData,
        processing: profileProcessing,
        errors: profileErrors,
        recentlySuccessful: profileSaved,
    } = useForm({
        name: user.name,
        email: user.email,
        avatar: null,
    });

    const [preview, setPreview] = useState(user.avatar_url || null);

    const submitProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", profileData.name);
        formData.append("email", profileData.email);
        if (profileData.avatar) formData.append("avatar", profileData.avatar);
        formData.append("_method", "patch");

        router.post(route("user.profile.update"), formData, {
            preserveScroll: true,
            onSuccess: () => router.reload({ only: ["auth"] }),
        });
    };

    // === Password form ===
    const {
        data: passwordData,
        setData: setPasswordData,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitPassword = (e) => {
        e.preventDefault();
        router.put(route("password.update"), passwordData, {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    // === Delete form ===
    const {
        data: deleteData,
        setData: setDeleteData,
        processing: deleteProcessing,
        errors: deleteErrors,
    } = useForm({
        password: "",
    });

    const submitDelete = (e) => {
        e.preventDefault();
        router.delete(route("user.profile.destroy"), {
            data: deleteData,
            preserveScroll: true,
        });
    };

    // === Join/Leave School ===
    const joinSchool = (teamCode) => {
        router.post(route("profile.join-school"), { team_code: teamCode });
    };

    const leaveSchool = (e) => {
        e.preventDefault();
        router.post(route("profile.leave-school"));
    };

    return (
        <>
            <Head title="Profile" />
            <Navbar />

            <div className="relative min-h-screen w-full bg-[#FCFFEC] overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-60"
                    style={{ backgroundAttachment: "fixed" }}
                />
                <div className="absolute inset-0 bg-white/40 backdrop-md" />

                {/* Dekorasi Matahari */}
                <img
                    src="/illustrasi/matahari.png"
                    alt="Sun"
                    className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 md:w-[600px] opacity-70"
                    style={{
                        transform: `translate(-50%, calc(-120px + ${offsetY}px))`,
                        transition: "transform 0.2s linear",
                    }}
                />

                {/* === MAIN CONTENT === */}
                <div className="relative z-10 max-w-5xl mx-auto pt-48 pb-24 px-6 space-y-14">
                    {/* PROFILE INFO */}
                    <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#E8F5CF] hover:shadow-2xl transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <FaUser className="text-[#7FB23B] text-2xl" />
                            <h2 className="text-2xl font-bold text-[#3B3B0E]">
                                Profile Information
                            </h2>
                        </div>

                        <form onSubmit={submitProfile} className="space-y-6">
                            {/* Avatar */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-[#EAF8CC] flex items-center justify-center shadow-md border border-green-200">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <span className="text-[#3B3B0E] font-bold text-2xl">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setProfileData("avatar", file);
                                        if (file)
                                            setPreview(
                                                URL.createObjectURL(file)
                                            );
                                    }}
                                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-[#A6E272]/40 file:text-[#224C14]
                                        hover:file:bg-[#A6E272]/60 transition"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setProfileData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError message={profileErrors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError message={profileErrors.email} />
                            </div>

                            <div className="flex items-center gap-3">
                                <PrimaryButton
                                    disabled={profileProcessing}
                                    className="bg-[#90C444] hover:bg-[#7FB23B] text-white"
                                >
                                    Save Changes
                                </PrimaryButton>
                                {profileSaved && (
                                    <p className="text-sm text-green-600">
                                        Profile Updated!!
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* SCHOOL SECTION */}
                    <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#E8F5CF] hover:shadow-2xl transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <FaSchool className="text-[#7FB23B] text-2xl" />
                            <h2 className="text-2xl font-bold text-[#3B3B0E]">
                                Sekolah
                            </h2>
                        </div>

                        {userSchool ? (
                            <form onSubmit={leaveSchool} className="space-y-4">
                                <p className="text-gray-600 text-lg">
                                    Kamu tergabung di{" "}
                                    <b className="text-[#3B3B0E]">
                                        {userSchool.name}
                                    </b>
                                </p>
                                <PrimaryButton className="bg-red-600 hover:bg-red-700 text-white">
                                    Keluar
                                </PrimaryButton>
                            </form>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-[#A6E272]/40">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-[#3B3B0E]">
                                                #
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-[#3B3B0E]">
                                                Nama
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-[#3B3B0E]">
                                                Poin
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-[#3B3B0E]">
                                                Kode Tim
                                            </th>
                                            <th className="px-4 py-3 text-center font-semibold text-[#3B3B0E]">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {schools.map((s, i) => (
                                            <tr
                                                key={s.id}
                                                className="hover:bg-[#D8F5A2]/30 transition"
                                            >
                                                <td className="px-4 py-3">
                                                    {i + 1}
                                                </td>
                                                <td className="px-4 py-3 font-medium">
                                                    {s.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {s.points}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {s.team_code}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            joinSchool(
                                                                s.team_code
                                                            )
                                                        }
                                                        className="px-3 py-1 bg-[#90C444] text-white rounded-lg hover:bg-[#7FB23B] transition"
                                                    >
                                                        Join
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* PASSWORD UPDATE */}
                    <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#E8F5CF] hover:shadow-2xl transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <FaLock className="text-[#7FB23B] text-2xl" />
                            <h2 className="text-2xl font-bold text-[#3B3B0E]">
                                Update Password
                            </h2>
                        </div>

                        <form onSubmit={submitPassword} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="current_password"
                                    value="Current Password"
                                />
                                <TextInput
                                    id="current_password"
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "current_password",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError
                                    message={passwordErrors.current_password}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="New Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError message={passwordErrors.password} />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={
                                        passwordData.password_confirmation
                                    }
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError
                                    message={
                                        passwordErrors.password_confirmation
                                    }
                                />
                            </div>

                            <PrimaryButton
                                disabled={passwordProcessing}
                                className="bg-[#90C444] hover:bg-[#7FB23B] text-white"
                            >
                                Update Password
                            </PrimaryButton>
                        </form>
                    </div>

                    {/* DELETE ACCOUNT */}
                    <div className="bg-red-50 rounded-3xl shadow-lg p-8 border border-red-200 hover:shadow-2xl transition-all">
                        <div className="flex items-center gap-3 mb-6">
                            <FaTrashAlt className="text-red-600 text-2xl" />
                            <h2 className="text-2xl font-bold text-red-700">
                                Delete Account
                            </h2>
                        </div>

                        <form onSubmit={submitDelete} className="space-y-6">
                            <p className="text-gray-600 text-sm">
                                Setelah akun kamu dihapus, semua data akan
                                hilang secara permanen. Pastikan kamu sudah yakin.
                            </p>

                            <div>
                                <InputLabel
                                    htmlFor="password_delete"
                                    value="Password"
                                />
                                <TextInput
                                    id="password_delete"
                                    type="password"
                                    value={deleteData.password}
                                    onChange={(e) =>
                                        setDeleteData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#90C444] focus:ring-[#90C444]"
                                />
                                <InputError message={deleteErrors.password} />
                            </div>

                            <PrimaryButton
                                disabled={deleteProcessing}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete Account
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
