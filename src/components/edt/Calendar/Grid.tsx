"use client";
import id from "@/utils/id";
import React from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface Props {
  date: Date;
}

export default function Grid(): React.ReactElement {
  const grid = [];
  const { width } = useWindowDimensions();
  const nbPxPhone = 768;
  const nbCell = width > nbPxPhone ? 98 : 14;

  for (let j = 0; j < nbCell; j++) {
    grid.push(
      <div
        key={`${id()}`}
        className="w-full h-20 md:h-14 border-t md:border border-neutral-600"
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 w-full h-full overflow-hidden px-3 md:px-0`}
    >
      {grid}
    </div>
  );
}
