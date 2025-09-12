import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Dummy data sekolah
const schools = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    lat: -6.2,
    lng: 106.816,
    students: 80,
  },
  {
    id: 2,
    name: "SMA Negeri 3 Bandung",
    lat: -6.9147,
    lng: 107.6098,
    students: 40,
  },
  {
    id: 3,
    name: "SMA Negeri 5 Surabaya",
    lat: -7.2575,
    lng: 112.7521,
    students: 95,
  },
];

export default function PetaSekolah() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Hitung level hutan berdasarkan jumlah siswa
  const getForestLevel = (students) => {
    if (students <= 20) return "🌱 Hutan kecil (kering)";
    if (students <= 50) return "🌿 Hutan sedang (mulai hijau)";
    return "🌳 Hutan lebat (subur)";
  };

  // Ranking sekolah berdasarkan jumlah siswa
  const leaderboard = [...schools].sort((a, b) => b.students - a.students);

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-green-200">
      {/* Sidebar Leaderboard */}
      <div className="w-1/4 bg-white/70 backdrop-blur-lg p-4 overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🏆 Leaderboard
        </h2>
        {leaderboard.map((school, index) => (
          <motion.div
            key={school.id}
            className="p-3 mb-2 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedSchool(school)}
          >
            <p className="font-semibold">
              #{index + 1} {school.name}
            </p>
            <p className="text-sm text-gray-600">
              {school.students} siswa aktif
            </p>
          </motion.div>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[-2.5, 118]} // tengah Indonesia
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {schools.map((school) => (
            <Marker
              key={school.id}
              position={[school.lat, school.lng]}
              eventHandlers={{
                click: () => setSelectedSchool(school),
              }}
            >
              <Popup>
                <b>{school.name}</b>
                <br />
                {school.students} siswa aktif
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Detail Sekolah */}
      {selectedSchool && (
        <motion.div
          className="w-1/4 bg-white/80 backdrop-blur-md p-6 shadow-lg flex flex-col"
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          exit={{ x: 200 }}
        >
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {selectedSchool.name}
          </h3>
          <p className="text-gray-700 mb-4">
            Jumlah siswa aktif:{" "}
            <span className="font-semibold">{selectedSchool.students}</span>
          </p>
          <p className="text-lg font-medium mb-4">
            {getForestLevel(selectedSchool.students)}
          </p>

          {/* Progress bar hutan */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-600 h-4 rounded-full"
              style={{
                width: `${Math.min(selectedSchool.students, 100)}%`,
              }}
            ></div>
          </div>

          {/* Tombol join */}
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition">
            🌱 Ikut Tanam Pohon
          </button>
        </motion.div>
      )}
    </div>
  );
}
