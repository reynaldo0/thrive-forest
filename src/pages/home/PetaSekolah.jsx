import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy data
const schools = [
  {
    id: 1,
    name: "SMA 1 Jakarta",
    lat: -6.2,
    lng: 106.816,
    studentsActive: 85,
    treesPlanted: 420,
  },
  {
    id: 2,
    name: "SMA 3 Bandung",
    lat: -6.9147,
    lng: 107.6098,
    studentsActive: 42,
    treesPlanted: 200,
  },
  {
    id: 3,
    name: "SMA 5 Surabaya",
    lat: -7.2575,
    lng: 112.7521,
    studentsActive: 120,
    treesPlanted: 1000,
  },
];

export default function PetaSekolah() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  const getForestLevel = (s) => {
    if (s <= 20) return "🌱 Hutan kecil";
    if (s <= 50) return "🌿 Hutan sedang";
    if (s <= 100) return "🌳 Hutan lebat";
    return "🌳🌳 Hutan super";
  };

  const leaderboard = [...schools].sort(
    (a, b) => b.studentsActive - a.studentsActive
  );

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-100 to-green-200">
      {/* Sidebar Leaderboard */}
      <div className="w-full md:w-1/4 bg-white/80 backdrop-blur-md p-4 shadow-xl overflow-y-auto order-2 md:order-1">
        <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4">
          🏆 Leaderboard
        </h2>
        {leaderboard.map((school, i) => (
          <div
            key={school.id}
            className="p-3 mb-2 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer transform transition duration-200 hover:scale-105"
            onClick={() => setSelectedSchool(school)}
          >
            <p className="font-semibold text-sm md:text-base">
              #{i + 1} {school.name}
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              {school.studentsActive} siswa aktif
            </p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 relative order-1 md:order-2">
        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {schools.map((s) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              eventHandlers={{ click: () => setSelectedSchool(s) }}
            >
              <Popup>
                <b>{s.name}</b>
                <br />
                {s.studentsActive} siswa aktif
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Detail Sekolah */}
      {selectedSchool && (
        <div
          className="w-full md:w-1/4 bg-white/90 backdrop-blur-md p-6 shadow-lg flex flex-col order-3 
          transform transition-transform duration-500 translate-x-0 md:translate-x-0"
        >
          <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">
            {selectedSchool.name}
          </h3>
          <p className="text-gray-700 mb-2">
            Siswa aktif:{" "}
            <span className="font-semibold">
              {selectedSchool.studentsActive}
            </span>
          </p>
          <p className="text-gray-700 mb-2">
            Pohon ditanam:{" "}
            <span className="font-semibold">{selectedSchool.treesPlanted}</span>
          </p>
          <p className="text-base md:text-lg font-medium mb-4">
            {getForestLevel(selectedSchool.studentsActive)}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{
                width: `${Math.min(selectedSchool.studentsActive, 100)}%`,
              }}
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition">
              🌱 Join Tanam Pohon
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition">
              🤝 Gabung Aliansi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
