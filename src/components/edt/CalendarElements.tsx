import React from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { parseISO } from "date-fns";
import {COLUMNS, DAY_IN_MS, HOURS_OFFSET, LINES} from "@/app/(layoutNavbar)/edt/const";

function getTimeValue(date: Date): number {
  const offset: number = 6 + date.getTimezoneOffset() / 60;
  return (
    (date.getUTCHours() - offset) * 60 * 60 * 1000 +
    date.getUTCMinutes() * 60 * 1000
  );
}

export default function CalendarElements({
  edtData,
}: {
  edtData: CourseEvent[];
}): React.ReactElement {
  return (
    <>
      {edtData &&
        edtData.map((event: CourseEvent, key: any) => {
          if (event == undefined) {
            return;
          }
          const courseStart: Date = parseISO(event.DTSTART);
          const courseEnd: Date = parseISO(event.DTEND);

          const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
          return (
            <div
              key={key}
              className="absolute flex flex-col items-center justify-center bg-neutral-950 text-white border text-sm text-ellipsis rounded-xl border-neutral-600 cursor-pointer"
              style={{
                width: `${100 / COLUMNS}%`,
                height: `${
                    (((courseEnd.getHours()+courseEnd.getMinutes()/60) - (courseStart.getHours()+courseStart.getMinutes()/60)) *
                    100) /
                    LINES + 1
                }%`,
                top: `${((((courseStart.getHours()+courseStart.getMinutes()/60) - HOURS_OFFSET) * 100) / (LINES - 1))}%`,
                left: `${(courseStart.getDay() * 100) / COLUMNS}%`,
              }}
            >
              <p>{event.SUMMARY}</p>
              <p className="text-neutral-400">{prof != undefined && prof}</p>
              <p className="text-neutral-500">{event.LOCATION}</p>
            </div>
          );
        })}
    </>
  );
}
