import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#4C7A09] text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo + Alamat */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/icon/logo-t.png" alt="Nutriverse" className="w-14" />
            <span className="font-bold text-xl md:text-2xl text-white">
              Nutriverse
            </span>
          </div>
          <p className="text-base text-black leading-relaxed">
            PT. Resanoma Inovasi Sehat <br />
            Gedung AD Premier lt 9 <br />
            Jl TB. Simatupang No. 5 <br />
            Jakarta Selatan
          </p>
        </div>

        {/* Tautan Penting */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg md:text-xl text-black">
            Tautan Penting
          </h3>
          <ul className="space-y-2 text-base text-black">
            <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:underline">Syarat dan Ketentuan</a></li>
            <li><a href="#" className="hover:underline">Emergency Service</a></li>
            <li><a href="#" className="hover:underline">Tentang Kami</a></li>
            <li><a href="#" className="hover:underline">Bergabung dengan Nutriverse</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg md:text-xl text-black">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E1306C] text-white hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0077B5] text-white hover:scale-110 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#BD081C] text-white hover:scale-110 transition">
              <FaPinterestP />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:scale-110 transition">
              <FaYoutube />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#010101] text-white hover:scale-110 transition">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}