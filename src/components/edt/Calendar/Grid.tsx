import { LINES, COLUMNS } from "@/app/(layoutNavBar)/edt/const";
import React from "react";

export default function Grid(): React.ReactElement{
    const grid = [];

    for (var i = 0; i < LINES; i++) {
        for (var j = 0; j < COLUMNS; j++) {
            grid.push(
                (<div
                    key={`${i}-${j}`}
                    className="absolute flex flex-col border border-neutral-800"
                    style={{
                        width:`${100 / COLUMNS}%`,
                        height: `${100 / LINES}%`,
                        top: `${(i*100) / LINES}%`,
                        left: `${(j*100) / COLUMNS}%`
                        }}
                />)
            );
        }
    }

    return (
        <>
            {grid}
        </>
    );
}