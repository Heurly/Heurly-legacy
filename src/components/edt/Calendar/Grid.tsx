import id from "@/utils/id";
import React from "react";

interface Props {
  nbDays: number;
}

const HOURS_OFFSET = 2;
const NB_HOURS = 12;

export default function EdtGrid({ nbDays }: Props): React.ReactElement {
  const grid = [];
  const nbCell = (nbDays + 1) * 14; // days + time column * hours of the day

  for (let j = 0; j < nbCell; j++) {
    if (j < NB_HOURS) {
      grid.push(
        <div
          key={id()}
          className="w-full border-t md:border-r border-neutral-600 text-white relative"
          style={{
            gridRow: `${j + HOURS_OFFSET}`,
          }}
        >
          <span className="absolute top-full left-8 lg:left-1/2 bg-neutral-950 px-3 -translate-y-1/2 z-10 -translate-x-1/2">
            {j + 8}h
          </span>
        </div>,
      );
      continue;
    }
    if (j < NB_HOURS + nbDays) {
      grid.push(
        <div
          key={id()}
          className="w-full border-t-0 md:border-r border-neutral-600"
          style={{
            gridRow: `${0}`,
          }}
        />,
      );
      continue;
    }
    grid.push(
      <div
        key={id()}
        className="w-full hidden md:bock lg:block border-t md:border-r border-neutral-600"
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
