import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function TeamNutriverse() {
  // Data tim
  const teamData = [
    {
      id: 1,
      name: "Reynaldo",
      role: "Backend Developer",
      img: "/team/team2.png",
      socials: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "Aditya",
      role: "UI/UX Designer",
      img: "/team/bob.jpg",
      socials: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "Zhafirah",
      role: "Frontend Developer",
      img: "/team/team1.png",
      socials: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <section className="w-full bg-[#fafbe9] py-16 font-sans relative overflow-hidden min-h-screen flex flex-col">
      {/* Judul */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#3B3B0E] text-center mb-12">
        Team Nutriverse
      </h2>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 relative z-10">
        {teamData.map((member, i) => (
          <div
            key={member.id}
            className="bg-[#f3fbdc] rounded-2xl shadow-[6px_6px_0px_#d9e3c1] p-8 flex flex-col items-center animate-fadeInUp"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {/* Foto */}
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 object-cover border-2 border-[#d9e3c1] rounded-xl mb-4"
            />

            {/* Nama */}
            <h3 className="font-bold text-[#3B3B0E]">{member.name}</h3>

            {/* Jabatan */}
            <p className="text-sm italic text-gray-600">{member.role}</p>

            {/* Ikon Sosmed */}
            <div className="flex gap-3 mt-4 text-[#3B3B0E]">
              <a href={member.socials.facebook} className="hover:scale-110 transition">
                <FaFacebookF />
              </a>
              <a href={member.socials.instagram} className="hover:scale-110 transition">
                <FaInstagram />
              </a>
              <a href={member.socials.linkedin} className="hover:scale-110 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .animate-fadeInUp {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
