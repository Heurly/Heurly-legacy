import id from "@/utils/id";
import React from "react";
import { DAYS } from "@/app/(layoutNavbar)/edt/const";

interface Props {
  nbDays: number;
}

const HOURS_OFFSET = 2;
const START_HOUR = 8;
const NB_HOURS = 12;

export default function EdtGrid({ nbDays }: Props): React.ReactElement {
  const grid: React.ReactNode[] = [];

  for (let row = 0; row < NB_HOURS + HOURS_OFFSET; ++row) {
    if (row >= HOURS_OFFSET) {
      grid.push(
        <div key={id()} className="flex flex-1 border border-neutral-600">
          <span className="absolute top-full left-8 lg:left-1/2 bg-neutral-950 px-3 -translate-y-1/2 z-10 -translate-x-1/2">
            {row + START_HOUR - HOURS_OFFSET}h
          </span>
        </div>,
      );
    } else {
      grid.push(
        <div
          key={id()}
          className="w-full flex-1 hidden md:bock lg:block border border-neutral-600"
        >
          {}
        </div>,
      );
    }
  }

  return (
    <div className={`flex flex-col w-full h-full overflow-hidden px-3 md:px-0`}>
      {grid}
    </div>
  );
}
