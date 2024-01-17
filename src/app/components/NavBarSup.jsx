import React from "react";
import Img from "next/image";
import iconTrello from "../../../public/iconTrello.jpeg";
import IconTeam from "@/app/icons/EquipoIcons";

export const NavBarSup = () => {
  return (
    <nav className="fixed top-0 w-full h-14 bg-black text-white flex items-center justify-between z-10">
      <div className="flex justify-center items-center gap-10 ml-3">
        <div className="flex justify-center items-center gap-2">
          <Img className="h-6 w-6 rounded-sm" src={iconTrello} alt="icon" />
          <h3 className="font-bold text-xl">miniTrello</h3>
        </div>
        <button className="text-sm bg-blue-800 font-bold p-1 rounded-sm">
          Crear nuevo espacio
        </button>
      </div>
      <div className="text-lg uppercase font-bold ">
        Trabajo final Coderhouse
      </div>
      <div className="flex justify-center items-center gap-2">
        <IconTeam />
        <div className="flex justify-center items-center gap-1">
          <div className="bg-white min-h-8 min-w-8 rounded-full">1</div>
          <div className="bg-white min-h-8 min-w-8 rounded-full">1</div>
          <div className="bg-white min-h-8 min-w-8 rounded-full">1</div>
          <div className="bg-white min-h-8 min-w-8 rounded-full">1</div>
        </div>
      </div>
      <div className="gap-4 mr-4">
        <button className="text-sm bg-gray-700 font-bold p-1 rounded-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};
