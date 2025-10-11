import { ArrowUp } from "lucide-react";

const Cta = () => {
    return (
        <>
            <div className="relative">
                <div className="absolute md:-bottom-2 w-full">
                    <img
                        src="/background/footer.png"
                        className="w-full h-full object-cover"
                        alt="Footer Background"
                    />
                </div>
            </div>
            <section className="relative pt-10 bg-[#66863E]">
                <div className="-top-12 relative inset-0 flex justify-center items-center">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl h-auto mx-8 md:mx-24 lg:mx-20 flex flex-col sm:flex-row items-center justify-between px-6 py-4 md:py-8">
                        {/* Teks di sebelah kiri */}
                        <div className="text-center sm:text-left">
                            <h1
                                className="text-gray-900 font-bold text-lg sm:text-xl"
                                data-aos="fade-up"
                                data-aos-duration="700"
                            >
                                Ingin menjelajahi lebih detail?
                            </h1>
                            <p
                                className="text-gray-500 text-sm sm:text-base"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                Kunjungi Games dan kumpulkan point untuk menjadikan sekolah anda menjadi yang terbaik!
                            </p>
                        </div>

                        {/* Tombol di sebelah kanan */}
                        <a
                            href="/games"
                            className="bg-secondary-200 text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary-300/90 transition mt-4 sm:mt-0 sm:ml-4 flex items-center"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                        >
                            Jelajahi Sekarang
                            <ArrowUp className="ml-2 w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cta;
