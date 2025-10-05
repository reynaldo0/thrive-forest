import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function TeamNutriverse() {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 300);
  }, []);

  const teamData = [
    {
      id: 1,
      name: "Reynaldo Yusellino",
      role: "Backend Developer",
      img: "/team/reynaldo.jpg",
      socials: {
        github: "https://github.com/reynaldo0",
        instagram: "https://www.instagram.com/rynldysllino",
        linkedin: "https://www.linkedin.com/in/reynaldo-yusellino",
      },
    },
    {
      id: 2,
      name: "Bekhyun Aditya",
      role: "UI/UX Designer",
      img: "/team/adit.jpg",
      socials: {
        github: "https://github.com/Hzinterpol",
        instagram:
          "https://www.instagram.com/bekhyunaditya_?igsh=OGVqYXJpcDJjZzdt",
        linkedin:
          "https://www.linkedin.com/in/bekhyun-aditya-45786930a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    },
    {
      id: 3,
      name: "Zhafirah Naswa N",
      role: "Frontend Developer",
      img: "/team/zhafirah.jpg",
      socials: {
        github: "https://github.com/naswaaaa29",
        instagram:
          "https://www.instagram.com/pirnswa?igsh=MW94a3hwYnQ1a2VxdQ==",
        linkedin:
          "https://www.linkedin.com/in/zhafirah-naswa-naufariza-045771353/",
      },
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 py-20 relative bg-[#FCFFEC] overflow-hidden pb-60">
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('/background/heroabout.png')] bg-cover bg-center opacity-50"
        style={{ backgroundAttachment: "fixed" }}
      />

      {/* Judul */}
      <h2
        className={`text-5xl md:text-7xl font-extrabold text-[#2e4600] mb-16 tracking-wide drop-shadow-xl transition-all duration-700 ease-out ${
          animateCards ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Team <span className="text-[#90C444]">Nutriverse</span>
      </h2>

      {/* Cards */}
      <div
        className={`max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ease-out ${
          animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {teamData.map((member, i) => (
          <div
            key={member.id}
            className="relative group bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200 p-10 flex flex-col items-center transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            style={{
              animation: animateCards ? `fadeInUp 0.8s ease forwards` : "none",
              animationDelay: `${i * 0.3}s`,
              opacity: 0,
            }}
          >
            {/* Foto */}
            <div className="relative mb-6 w-40 h-44 md:w-48 md:h-52 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-green-300 transition-all duration-500 mt-2 bg-white flex items-center justify-center">
              <img
                src={member.img}
                alt={member.name}
                className={`w-full h-full transition-transform duration-500 transform ${
                  member.id === 1
                    ? "object-contain group-hover:scale-[1.05]" // Reynaldonya tetap object-contain & hover zoom
                    : "object-cover object-top group-hover:scale-[1.05]"
                }`}
                style={{
                  imageRendering: "auto",
                }}
                loading="lazy"
              />
              {/* Overlay Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            </div>

            {/* Nama & Role */}
            <h3 className="font-bold text-2xl md:text-3xl text-[#2e4600] mb-2 group-hover:text-[#90C444] transition">
              {member.name}
            </h3>
            <p className="text-lg md:text-xl italic text-gray-600 mb-4">
              {member.role}
            </p>

            {/* Social Icons */}
            <div className="flex gap-5 mt-2 text-xl">
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-green-100 text-green-800 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-md"
              >
                <FaGithub />
              </a>
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-green-100 text-green-800 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md"
              >
                <FaInstagram />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-green-100 text-green-800 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Animasi Custom */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
