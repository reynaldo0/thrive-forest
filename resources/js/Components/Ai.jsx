import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head } from "@inertiajs/react";

export default function Ai() {
  return (
    <>
      <div className="fixed bottom-4 right-4 animate-bounce hover:scale-110 transition-transform duration-300">
        <img
          src="/icon/maskot.png"
          alt="maskot"
          className="w-28 md:w-36 drop-shadow-xl"
        />
      </div>
    </>
  );
}
