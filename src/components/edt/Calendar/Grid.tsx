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
    if (j + 8 <= 19) {
      grid.push(
        <div
          key={`${id()}`}
          className="w-full h-20 md:h-14 border-t md:border-r border-neutral-600 text-white relative"
          style={{
            gridRow: `${j + 2}`,
          }}
        >
          <span className="absolute top-full left-8 lg:left-1/2 bg-neutral-950 px-3 -translate-y-1/2 z-10 -translate-x-1/2">
            {j + 8}h
          </span>
        </div>,
      );
      continue;
    }
    grid.push(
      <div
        key={`${id()}`}
        className="w-full h-20 md:h-14 border-t md:border-r border-neutral-600"
      />,
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 lg:grid-rows-14 w-full h-full overflow-hidden px-3 md:px-0`}
    >
      {grid}
    </div>
  );
}
