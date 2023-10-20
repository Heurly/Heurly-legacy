"use client";
import { useState } from "react";
import cn from "classnames";
import id from "@/utils/id";

type PropsColor = {
  color: string;
  changeColor: (color: string) => void;
  actualColor: string;
  key: string;
};

function Color({ color, changeColor, actualColor, key }: PropsColor) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      key={key}
      className={cn(
        "h-10 w-10 md:h-20 md:w-20 aspect-square rounded-full cursor-pointer",

        { "border-2 border-green-500": actualColor == color },
      )}
      style={{ backgroundColor: color }}
      onClick={() => {
        setIsSelected(!isSelected);
        changeColor(color);
      }}
    ></div>
  );
}

const themes = {
  white: "white",
  black: "black",
  blue: "blue",
  red: "red",
  banane: "yellow",
};

type Color = {
  name: string;
  color: string;
};

const ChangeColor: React.FunctionComponent = () => {
  const [whoIsSelected, setWhoIsSelected] = useState(themes.white);

  return (
    <div>
      <p className="text-white font-semibold">Changer de couleur de thème</p>
      <div className="flex space-x-7 mt-8 mb-8">
        {Object.keys(themes).map((theme) => (
          <Color
            key={id()}
            changeColor={setWhoIsSelected}
            color={theme}
            actualColor={whoIsSelected}
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: whoIsSelected,
          height: "70px",
          width: "100px",
        }}
      ></div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default ChangeColor;
