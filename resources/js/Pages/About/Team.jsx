import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function TeamNutriverse() {
  const [animateCards, setAnimateCards] = useState(false);

  // Trigger animasi
  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 300);
  }, []);

  const teamData = [
    {
      id: 1,
      name: "Reynaldo",
      role: "Backend Developer",
      img: "/team/team2.png",
      socials: { facebook: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 2,
      name: "Aditya",
      role: "UI/UX Designer",
      img: "/team/bob.jpg",
      socials: { facebook: "#", instagram: "#", linkedin: "#" },
    },
    {
      id: 3,
      name: "Zhafirah",
      role: "Frontend Developer",
      img: "/team/team1.png",
      socials: { facebook: "#", instagram: "#", linkedin: "#" },
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center w-full px-6 py-16 bg-[#fafbe9] relative">
      {/* Judul */}
      <h2
        className={`text-6xl md:text-7xl font-extrabold text-[#3B3B0E] mb-12 transition-all duration-700 ease-out ${
          animateCards ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Team Nutriverse
      </h2>

      {/* Cards */}
      <div
        className={`max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-14 transition-all duration-700 ease-out ${
          animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {teamData.map((member, i) => (
          <div
            key={member.id}
            className="bg-[#f3fbdc] rounded-3xl shadow-2xl border-2 border-green-200 p-12 md:p-16 flex flex-col items-center transition-all duration-700 ease-out hover:scale-105"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl mb-6"
            />
            <h3 className="font-bold text-2xl md:text-3xl text-[#3B3B0E] mb-2">
              {member.name}
            </h3>
            <p className="text-lg md:text-xl italic text-gray-600">{member.role}</p>
            <div className="flex gap-4 mt-4 text-[#3B3B0E] text-xl">
              <a href={member.socials.facebook}><FaFacebookF /></a>
              <a href={member.socials.instagram}><FaInstagram /></a>
              <a href={member.socials.linkedin}><FaLinkedinIn /></a>
            </div>
          </div>
        ))}
      </div>

      {/* Animasi Custom */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
