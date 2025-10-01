import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { User, Mail, MapPin, UploadCloud, CheckCircle2 } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

const Form = () => {
    const { flash, errors } = usePage().props;

    const [previewImage, setPreviewImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const typedRef = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        address: "",
        description: "",
        story: "",
        media: null,
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        if (typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: ["Nusantara", "Indonesia", "Budaya"],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
            });
            return () => typed.destroy();
        }
    }, []);

    useEffect(() => {
        if (flash?.success) {
            setModalOpen(true);
            reset();
            setPreviewImage(null);
        }
    }, [flash]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("media", file || null);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("mails.store"));
    };

    return (
        <section className="bg-white relative min-h-screen py-24 flex lg:pb-40">
            <div
                className="absolute inset-0 bg-[url('/wave/bg.svg')] bg-cover bg-center opacity-10"
                style={{ backgroundAttachment: "fixed" }}
            />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col-reverse xl:flex-row xl:gap-20 items-center justify-between px-8 md:px-24 xl:px-20 z-10 w-full"
            >
                {/* Form Inputs */}
                <div
                    className="space-y-6 flex-1 pt-16 xl:pt-0"
                    data-aos="zoom-in"
                >
                    <h1
                        className="font-bold text-3xl mb-4"
                        data-aos="fade-down"
                    >
                        Dari kamu untuk
                        <span
                            ref={typedRef}
                            className="text-white bg-secondary-300 mx-1 lg:px-2"
                        ></span>
                    </h1>

                    {/* Nama */}
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-lg">
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="flex-grow focus:outline-none text-gray-600"
                            required
                        />
                        <User className="text-gray-400 w-5 h-5" />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}

                    {/* Email & Asal */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-lg flex-1">
                            <input
                                type="email"
                                placeholder="Email Aktif"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="flex-grow focus:outline-none text-gray-600"
                                required
                            />
                            <Mail className="text-gray-400 w-5 h-5" />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}

                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-lg flex-1">
                            <input
                                type="text"
                                placeholder="Asal Daerah"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="flex-grow focus:outline-none text-gray-600"
                                required
                            />
                            <MapPin className="text-gray-400 w-5 h-5" />
                        </div>
                        {errors.address && (
                            <p className="text-red-500 text-sm">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <textarea
                        placeholder="Apa fitur yang ingin ditambahkan?"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 bg-white focus:outline-none resize-none text-gray-600 shadow-lg"
                        rows="4"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    )}

                    {/* Upload */}
                    <div className="flex gap-4 items-start">
                        <div className="flex items-center h-40 md:h-36 justify-center border border-gray-300 rounded-2xl bg-white shadow-lg flex-[1]">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="object-contain w-full h-full rounded-2xl"
                                />
                            ) : (
                                <div className="w-full h-40 md:h-36 flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                    <span className="text-sm">No file</span>
                                </div>
                            )}
                        </div>

                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl bg-transparent flex flex-col items-center justify-center p-6 flex-[2]"
                        >
                            <div className="text-center">
                                <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                <p className="text-gray-600">
                                    <span className="underline">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-sm text-gray-400">
                                    PNG, JPG, JPEG, PDF, DOC, MP4 supported
                                </p>
                            </div>
                            <input
                                id="fileUpload"
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                    {errors.media && (
                        <p className="text-red-500 text-sm">{errors.media}</p>
                    )}

                    {/* Story */}
                    <textarea
                        placeholder="Ceritakan pengalamanmu..."
                        value={data.story}
                        onChange={(e) => setData("story", e.target.value)}
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 bg-white focus:outline-none resize-none text-gray-600 shadow-lg"
                        rows="4"
                    />
                    {errors.story && (
                        <p className="text-red-500 text-sm">{errors.story}</p>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-secondary-300 text-white font-semibold py-3 rounded-full hover:bg-secondary-300/90 transition disabled:opacity-50"
                    >
                        {processing ? "Mengirim..." : "Kirim"}
                    </button>
                </div>

                {/* Illustration */}
                <div
                    className="flex justify-center items-center relative"
                    data-aos="zoom-in"
                >
                    <img
                        src="/illustrasi/form.png"
                        alt="Tari Nusantara"
                        className="w-80 md:w-[600px] h-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </form>

            {/* Modal Alert */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-xl w-full text-center relative"
                        data-aos="zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-2xl font-bold mb-2">
                            Pesan Terkirim!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Terima kasih sudah berbagi cerita dan ide. Tim kami
                            akan segera meninjau.
                        </p>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="bg-secondary-300 text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary-400 transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Form;
