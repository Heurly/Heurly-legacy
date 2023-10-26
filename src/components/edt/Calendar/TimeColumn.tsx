import React from "react";
import cn from "classnames";

export default function TimeColumn(): React.ReactElement {
  var timestamps: string[] = [];

  for (var i = 7; i <= 20; i++) {
    timestamps.push(i.toString() + ":00");
  }

  return (
    <div className={cn("grid grid-rows-15 text-neutral-950 place-items-center bg-gray-200 rounded-tl-xl rounded-bl-xl",
      "dark:bg-neutral-950 dark:text-white")}>
      <div key={"Heure"}>Heure</div>
      {timestamps.map((timestamp: string, key: any) => {
        return (
          <>
            <div key={key}>{timestamp}</div>
          </>
        );
      })}
    </div>
  );
}
