import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function FormFooter({ animateForm = true }) {
  return (
    <section
      className={`w-full min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] py-16 px-6 rounded-t-3xl transition-all duration-700 ease-out ${
        animateForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-5xl font-bold text-brown-900 text-center mb-10">
        Tanggapan <span className="px-2 rounded">Anda</span>
      </h1>

      <h2 className="text-3xl font-bold text-green-900 text-center mb-10 animate-pulse">
        Dari kamu untuk <span className="bg-white px-2 rounded">Nutriverse</span>
      </h2>

      {/* Form */}
      <form className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full px-4 py-3 rounded-full border border-gray-200"
          />
          <input
            type="text"
            placeholder="Asal Daerah"
            className="w-full px-4 py-3 rounded-full border border-gray-200"
          />
        </div>

        <input
          type="text"
          placeholder="Fitur yang ingin ditambahkan"
          className="w-full px-4 py-3 rounded-full border border-gray-200"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="file"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
          />
          <textarea
            rows="3"
            placeholder="Ceritakan Tanggapanmu"
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
          ></textarea>
        </div>

        <textarea
          rows="3"
          placeholder="Ceritakan Pengalamanmu"
          className="w-full px-4 py-3 rounded-xl border border-gray-200"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-full hover:scale-105 transition"
        >
          Kirim
        </button>
      </form>

       {/* Maskot pojok kanan bawah */}
      <div className="fixed bottom-4 right-4 animate-bounce">
        <img
          src="/icon/maskot.png"
          alt="maskot"
          className="w-20 md:w-24 drop-shadow-xl"
        />
      </div>

      {/* Footer */}
      {/* <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-white">
        <p className="font-bold">EduForest .......................</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
          <FaYoutube />
        </div>
      </div> */}

    </section>
  );
}
