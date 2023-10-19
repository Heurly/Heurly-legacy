import id from "@/utils/id";
import React from "react";

const HOURS_OFFSET = 2;
const START_HOUR = 8;
const NB_HOURS = 12;

export default function EdtGrid(): React.ReactElement {
  const rows: React.ReactNode[] = [];

  for (let row = 0; row < NB_HOURS + HOURS_OFFSET; ++row) {
    rows.push(
      row >= HOURS_OFFSET ? (
        <div
          key={id()}
          className="flex flex-row flex-1 text-white border-t border-neutral-800"
        >
          <span className="-translate-y-1/3 bg-neutral-950 w-8">
            {START_HOUR + row - HOURS_OFFSET}h
          </span>
        </div>
      ) : (
        <div
          key={id()}
          className="flex flex-row flex-1 text-white border-b border-neutral-800"
        />
      ),
    );
  }

  return (
    <>
      <div
        className={`absolute flex flex-col w-full h-full overflow-hidden px-3 md:px-0`}
      >
        {rows}
      </div>
    </>
  );
}
