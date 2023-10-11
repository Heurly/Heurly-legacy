import {
    LINES,
    COLUMNS,
    DAYS, DAY_IN_MS,
} from "@/app/(layoutNavbar)/edt/const";
import id from "@/utils/id";
import React from "react";

interface Props {
    date: Date;
}

export default function Grid({date}: Props): React.ReactElement {
  const grid = [];
  const week = new Date(date.getTime() - (date.getDay() - 1) * DAY_IN_MS);

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
          <div>{DAYS[i - 1]}</div>
            <div className="text-neutral-600">{i != 0 &&
                new Date(week.getTime() + i*DAY_IN_MS).toLocaleString('fr-FR', { month: 'numeric', day: 'numeric'})
            }</div>
        </div>
      );
    }
    // we put the hours in the grid
    if (i <= 13 && i != 0) {
      grid.push(
        <div
          key={`${id()}`}
          className="w-full flex flex-col items-center justify-end text-white bg-neutral-950 font-bold"
          style={{
            gridColumn: `${1} / span 1`,
            gridRow: `${i + 1} / span 1`,
          }}
        >
          <div className="relative -bottom-5 bg-neutral-950 p-2">{i + 7 == 13+7 ? '' : `${i + 7}h`}</div>
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
