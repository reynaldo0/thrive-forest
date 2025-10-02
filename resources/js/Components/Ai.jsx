// resources/js/Pages/Ai.jsx
import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

export default function Ai() {
  return (
    <>
      {/* Floating Maskot di pojok */}
      <div className="fixed bottom-4 right-4 animate-bounce">
        <img
          src="/icon/maskot.png"
          alt="maskot"
          className="w-20 md:w-24 drop-shadow-xl"
        />
      </div>
    </>
  );
}
