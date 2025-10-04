import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Navbar from "@/Components/Navbar";

export default function UserEdit({
    mustVerifyEmail,
    status,
    schools,
    userSchool,
}) {
    const user = usePage().props.auth.user;

    // Profile form
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

    // Password form
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

    // Delete form
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

    // Join/Leave School
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
            <div className="max-w-6xl pt-24 mx-auto py-10 px-4 space-y-10">
                {/* Update Profile Information */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <form onSubmit={submitProfile} className="space-y-6">
                        <h2 className="text-xl font-bold text-secondary-200">
                            Profile Information
                        </h2>
                        <p className="text-sm text-gray-500">
                            Update your account's profile information, email
                            address, and profile photo.
                        </p>

                        {/* Avatar */}
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-secondary-200 font-bold text-xl">
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
                                        setPreview(URL.createObjectURL(file));
                                }}
                                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-medium
                                    file:bg-primary-100/20 file:text-secondary-200
                                    hover:file:bg-primary-100/30 transition"
                            />
                        </div>
                        <InputError
                            className="mt-2"
                            message={profileErrors.avatar}
                        />

                        {/* Name */}
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Name"
                                className="text-secondary-200"
                            />
                            <TextInput
                                id="name"
                                value={profileData.name}
                                onChange={(e) =>
                                    setProfileData("name", e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
                            />
                            <InputError
                                className="mt-2"
                                message={profileErrors.name}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-secondary-200"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) =>
                                    setProfileData("email", e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
                            />
                            <InputError
                                className="mt-2"
                                message={profileErrors.email}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <PrimaryButton
                                disabled={profileProcessing}
                                className="bg-primary-100 hover:bg-primary-100/90 text-white"
                            >
                                Save
                            </PrimaryButton>
                            {profileSaved && (
                                <p className="text-sm text-green-600">Saved.</p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Join / Leave School */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <h2 className="text-xl font-bold text-secondary-200 mb-6">
                        Sekolah
                    </h2>
                    {userSchool ? (
                        <form onSubmit={leaveSchool} className="space-y-4">
                            <p className="text-gray-600">
                                Kamu tergabung di: <b>{userSchool.name}</b>
                            </p>
                            <PrimaryButton className="bg-red-600 hover:bg-red-700 text-white">
                                Keluar
                            </PrimaryButton>
                        </form>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-primary-100/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-secondary-200">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-secondary-200">
                                            Nama
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-secondary-200">
                                            Poin
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-secondary-200">
                                            Team Code
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-secondary-200">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {schools.map((s, i) => (
                                        <tr
                                            key={s.id}
                                            className="hover:bg-primary-100/10 transition"
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
                                                        joinSchool(s.team_code)
                                                    }
                                                    className="px-3 py-1 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition"
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

                {/* Update Password */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
                    <form onSubmit={submitPassword} className="space-y-6">
                        <h2 className="text-xl font-bold text-secondary-200">
                            Update Password
                        </h2>

                        <div>
                            <InputLabel
                                htmlFor="current_password"
                                value="Current Password"
                                className="text-secondary-200"
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
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
                            />
                            <InputError
                                message={passwordErrors.current_password}
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="New Password"
                                className="text-secondary-200"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                value={passwordData.password}
                                onChange={(e) =>
                                    setPasswordData("password", e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
                            />
                            <InputError message={passwordErrors.password} />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-secondary-200"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                value={passwordData.password_confirmation}
                                onChange={(e) =>
                                    setPasswordData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
                            />
                            <InputError
                                message={passwordErrors.password_confirmation}
                            />
                        </div>

                        <PrimaryButton
                            disabled={passwordProcessing}
                            className="bg-primary-100 hover:bg-primary-100/90 text-white"
                        >
                            Update
                        </PrimaryButton>
                    </form>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 rounded-2xl shadow-lg p-8 border border-red-200 hover:shadow-xl transition">
                    <form onSubmit={submitDelete} className="space-y-6">
                        <h2 className="text-xl font-bold text-red-700">
                            Delete Account
                        </h2>
                        <p className="text-sm text-gray-600">
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted.
                        </p>

                        <div>
                            <InputLabel
                                htmlFor="password_delete"
                                value="Password"
                                className="text-secondary-200"
                            />
                            <TextInput
                                id="password_delete"
                                type="password"
                                value={deleteData.password}
                                onChange={(e) =>
                                    setDeleteData("password", e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-primary-100 focus:ring-primary-100"
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
        </>
    );
}
