import id from "@/utils/id";
import React from "react";
import cn from "classnames";

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
          className="flex flex-row flex-1 text-white border-t border-neutral-800 z-0"
        >
          <span
            className={cn(
              "bg-gray-200 text-neutral-950 dark:bg-neutral-950 dark:text-white",
              "-translate-y-1/3 -translate-x-1/4 md:-translate-x-0 w-8 z-40",
            )}
          >
            {START_HOUR + row - HOURS_OFFSET}h
          </span>
        </div>
      ) : (
        <div
          key={id()}
          className="flex flex-row flex-1 text-white border-b border-neutral-800 -z-0"
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
