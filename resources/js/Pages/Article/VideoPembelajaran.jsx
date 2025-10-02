import { useState } from "react";

export default function Video() {
  const [videos] = useState([
    { id: 1, title: "Video 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Video 2", url: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Video 3", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Video 4", url: "https://www.w3schools.com/html/movie.mp4" },
  ]);

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const handleClick = (video) => {
    setActiveVideo(video);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#FCFFEC] via-[#C4E196] to-[#90C444] relative">
      {/* Animasi Custom */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(34,197,94,0.4), 0 0 10px rgba(34,197,94,0.3); }
          50% { box-shadow: 0 0 15px rgba(34,197,94,0.7), 0 0 25px rgba(34,197,94,0.5); }
          100% { box-shadow: 0 0 5px rgba(34,197,94,0.4), 0 0 10px rgba(34,197,94,0.3); }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
      `}</style>

      {/* Judul */}
      <h1 className="text-4xl font-extrabold text-green-900 mt-10 mb-8 drop-shadow-md tracking-wide">
        Video Pembelajaran
      </h1>

      {/* Tombol Navigasi */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleClick(video)}
            className={`relative px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-500
              ${
                video.id === activeVideo.id
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white scale-105 animate-glow"
                  : "bg-white/30 backdrop-blur-md border border-green-300 text-green-900 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-400 hover:text-green-900"
              }
            `}
          >
            {video.title}
          </button>
        ))}
      </div>

      {/* Card Video */}
      <div className="bg-white rounded-2xl shadow-2xl p-5 w-[720px] h-[400px] flex items-center justify-center animate-fade-in hover:shadow-green-500/40 transition-shadow duration-500 mb-16">
        <video
          src={activeVideo.url}
          controls
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
