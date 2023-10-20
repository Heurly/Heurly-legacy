"use client";
import React, { useState } from "react";

const ChangeColor: React.FunctionComponent = () => {
  // Utilisez l'état pour suivre la couleur actuelle
  const [backgroundColor, setBackgroundColor] = useState("white");

  // Fonction pour changer la couleur en fonction du bouton cliqué
  const changeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div>
      <p className="text-white font-semibold">Changer de couleur de thème</p>
      <div className="flex space-x-7 mt-8 mb-8">
        <button
          className={`rounded-full bg-white w-14 h-14 ${
            backgroundColor === "white"
              ? "border-2 border-green-500"
              : "border-2 border-grey"
          }`}
          onClick={() => changeBackgroundColor("white")}
        ></button>
        <button
          className={`rounded-full bg-black w-14 h-14 ${
            backgroundColor === "black"
              ? "border-2 border-green-500"
              : "border-2 border-grey"
          }`}
          onClick={() => changeBackgroundColor("black")}
        ></button>
        <button
          className={`rounded-full bg-red-600 w-14 h-14 ${
            backgroundColor === "red"
              ? "border-2 border-green-500"
              : "border-2 border-grey"
          }`}
          onClick={() => changeBackgroundColor("red")}
        ></button>
        <button
          className={`rounded-full bg-yellow-400 w-14 h-14 ${
            backgroundColor === "yellow"
              ? "border-2 border-green-500"
              : "border-2 border-grey"
          }`}
          onClick={() => changeBackgroundColor("yellow")}
        ></button>
      </div>
      <div style={{ backgroundColor, height: "70px", width: "100px" }}>
        {/* Contenu avec la couleur de fond dynamique */}
      </div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default ChangeColor;
