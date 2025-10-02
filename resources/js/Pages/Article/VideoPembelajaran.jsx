import { useState, useEffect } from "react";

export default function Video() {
  const [videos] = useState([
    { id: 1, title: "Video 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Video 2", url: "https://www.w3schools.com/html/movie.mp4" },
    { id: 3, title: "Video 3", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Video 4", url: "https://www.w3schools.com/html/movie.mp4" },
  ]);

  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateButtons, setAnimateButtons] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateTitle(true), 200);
    setTimeout(() => setAnimateButtons(true), 600);
    setTimeout(() => setAnimateCard(true), 1000);
  }, []);

  const handleClick = (video) => {
    setActiveVideo(video);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#e0f7e9] via-[#c4e196] to-[#90c444] relative overflow-hidden px-6 pt-16 pb-16">

      {/* Custom Animations */}
      <style>{`
        @keyframes glow {
          0%,100% { box-shadow: 0 0 10px rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 25px rgba(34,197,94,0.6); }
        }
        .animate-glow { animation: glow 2s infinite; }
      `}</style>

      {/* Title */}
      <h1 className={`text-4xl md:text-6xl font-extrabold mb-12 text-center tracking-wide drop-shadow-lg transition-all duration-700 ease-out 
        ${animateTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        Video Pembelajaran <span className="text-green-600">Nutriverse</span>
      </h1>

      {/* Navigation Buttons */}
      <div className={`flex flex-wrap gap-4 justify-center mb-12 max-w-5xl transition-all duration-700 ease-out 
        ${animateButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleClick(video)}
            className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-sm md:text-base transition-all duration-500 transform 
              ${video.id === activeVideo.id
                ? "bg-gradient-to-r from-green-400 to-green-600 text-white scale-105 animate-glow shadow-lg"
                : "bg-white/40 backdrop-blur-md border border-green-300 text-green-900 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-400 hover:text-white hover:scale-105 hover:shadow-md"
              }`}
          >
            {video.title}
          </button>
        ))}
      </div>

      {/* Video Card */}
      <div className={`bg-white rounded-3xl shadow-2xl border-2 border-green-200 p-6 md:p-8 w-full max-w-5xl h-[400px] flex items-center justify-center transition-all duration-700 ease-out
        ${animateCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
        <video
          src={activeVideo.url}
          controls
          className="rounded-2xl w-full h-full object-cover shadow-lg"
        />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-green-900 transition-all duration-700 ease-out">
        <p className={`text-lg md:text-xl ${animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Selamat menonton! Pelajari nutrisi dengan seru & interaktif 🌱
        </p>
      </div>
    </div>
  );
}
