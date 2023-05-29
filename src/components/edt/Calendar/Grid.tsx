import {
  LINES,
  COLUMNS,
  DAYS,
  HOURS_COUNT,
} from "@/app/(layoutNavBar)/edt/const";
import id from "@/utils/id";
import React from "react";

export default function Grid(): React.ReactElement {
  const grid = [];

  for (let i = 0; i < LINES - 1; i++) {
    // we put the days in the grid
    if (i == 0) {
      // we push the empty case
      grid.push(
        <div
          key={`${id()}`}
          className="w-full flex flex-col items-center justify-center text-white bg-neutral-950"
          style={{
            gridColumn: `${1} / span 1`,
            gridRow: `${1} / span 1`,
          }}
        />
      );
    }
    if (i <= DAYS.length) {
      grid.push(
        <div
          key={`${id()}`}
          className="w-full flex flex-col items-center justify-center text-white bg-neutral-950 font-bold"
          style={{
            gridColumn: `${i + 1} / span 1`,
            gridRow: `${1} / span 1`,
          }}
        >
          {DAYS[i - 1]}
        </div>
      );
    }
    // we put the hours in the grid
    if (i <= 13 && i != 0) {
      grid.push(
        <div
          key={`${id()}`}
          className="w-full flex flex-col items-center justify-center text-white bg-neutral-950 font-bold"
          style={{
            gridColumn: `${1} / span 1`,
            gridRow: `${i + 1} / span 1`,
          }}
        >
          {i + 7}h
        </div>
      );
    }

    for (let j = 0; j < COLUMNS - 1; j++) {
      grid.push(
        <div key={`${id()}`} className="w-full h-full" />
      );
    }
  }

  return (
    <div className="grid grid-cols-7 grid-rows-14 w-full h-full rounded-xl overflow-hidden border border-neutral-800 divide-neutral-800 divide-x divide-y">
      {grid}
    </div>
  );
}
