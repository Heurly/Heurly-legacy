import React from "react";

export default function TimeColumn(): React.ReactElement {
  var timestamps: string[] = [];

  for (var i = 7; i <= 20; i++) {
    timestamps.push(i.toString() + ":00");
  }

  return (
    <div className="grid grid-rows-15 text-white place-items-center bg-neutral-950 rounded-tl-xl rounded-bl-xl">
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
