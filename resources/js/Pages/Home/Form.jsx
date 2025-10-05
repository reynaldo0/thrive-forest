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
                strings: ["Nutriverse", "Bumi Kita", "Alam Semesta"],
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
        <section className="relative min-h-screen flex items-center justify-center bg-[#F0FCD7] px-6 py-24 pb-60">
            <div
                className="absolute inset-0 bg-[url('/background/herohome.png')] bg-cover bg-center opacity-50"
                style={{ backgroundAttachment: "fixed" }}
            />

            {/* Form Container */}
            <form
                onSubmit={handleSubmit}
                className="relative flex flex-col-reverse xl:flex-row items-center gap-10 md:bg-white/80 md:backdrop-blur-xl md:rounded-3xl md:shadow-2xl md:px-8 md:px-16 py-12 w-full md:max-w-7xl z-10"
                data-aos="zoom-in"
            >
                {/* Form Inputs */}
                <div className="space-y-6 flex-1">
                    <h1 className="font-bold text-3xl mb-6 text-gray-800">
                        Dari kamu untuk
                        <span
                            ref={typedRef}
                            className="bg-[#3F3313] text-white mx-2 px-2 py-1 rounded-md"
                        ></span>
                    </h1>

                    {/* Nama */}
                    <div className="flex items-center rounded-full bg-gray-100 px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#90C444]">
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="flex-grow border-none bg-transparent appearance-none focus:outline-none text-gray-700 placeholder-gray-400 focus:ring-0"
                            required
                        />
                        <User className="text-gray-400 w-5 h-5" />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}

                    {/* Email & Alamat */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center rounded-full bg-gray-100 px-5 py-3 shadow-sm flex-1 focus-within:ring-2 focus-within:ring-[#90C444]">
                            <input
                                type="email"
                                placeholder="Email Aktif"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="flex-grow bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 focus:ring-0"
                                required
                            />
                            <Mail className="text-gray-400 w-5 h-5" />
                        </div>

                        <div className="flex items-center rounded-full bg-gray-100 px-5 py-3 shadow-sm flex-1 focus-within:ring-2 focus-within:ring-[#90C444]">
                            <input
                                type="text"
                                placeholder="Asal Daerah"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="flex-grow bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 focus:ring-0"
                                required
                            />
                            <MapPin className="text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <textarea
                        placeholder="Apa fitur yang ingin ditambahkan?"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full rounded-2xl bg-gray-100 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#90C444] text-gray-700 placeholder-gray-400 shadow-sm resize-none border-0"
                        rows="3"
                    />

                    {/* Upload */}
                    <div className="flex gap-4 items-start">
                        <div className="flex items-center justify-center h-36 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner flex-[1] overflow-hidden">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="object-cover w-full h-full rounded-2xl"
                                />
                            ) : (
                                <span className="text-sm text-gray-400">
                                    No file
                                </span>
                            )}
                        </div>

                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center p-6 flex-[2] transition"
                        >
                            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-gray-600">
                                <span className="underline">
                                    Click to upload
                                </span>{" "}
                                or drag & drop
                            </p>
                            <p className="text-sm text-gray-400">
                                PNG, JPG, JPEG, PDF, DOC, MP4 supported
                            </p>
                            <input
                                id="fileUpload"
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>

                    {/* Cerita */}
                    <textarea
                        placeholder="Ceritakan pengalamanmu..."
                        value={data.story}
                        onChange={(e) => setData("story", e.target.value)}
                        className="w-full rounded-2xl bg-gray-100 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#90C444] text-gray-700 placeholder-gray-400 shadow-sm resize-none border-0"
                        rows="4"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#90C444] text-white font-semibold shadow-md hover:bg-[#7CB13B] py-4 rounded-full transition disabled:opacity-50"
                    >
                        {processing ? "Mengirim..." : "Kirim"}
                    </button>
                </div>

                {/* Illustration */}
                <div className="flex justify-center items-center">
                    <img
                        src="/illustrasi/form.png"
                        alt="Nuti Ayunan"
                        className="w-46 md:w-[300px] object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </form>

            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-gradient-to-b from-[#E8F8D5] to-[#90C444] text-[#3F3313] rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckCircle2 className="text-[#3F3313] w-12 h-12 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-2xl font-bold mb-2 text-[#3F3313]">
                            Pesan Terkirim!
                        </h2>
                        <p className="text-[#3F3313]/80 mb-6">
                            Terima kasih sudah berbagi cerita dan ide!! Tim kami
                            akan segera meninjau kirimanmu.
                        </p>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="bg-[#3F3313] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
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