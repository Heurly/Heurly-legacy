import React from "react";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";
import { parseISO } from "date-fns";
import { HOURS_COUNT, COLUMNS } from "@/app/(layoutNavBar)/edt/const";

function getTimeValue(date: Date): number{
    const offset: number = 6 + date.getTimezoneOffset() / 60;
    return (date.getUTCHours() - offset)*60*60*1000 + date.getUTCMinutes()*60*1000;
}

export default function CalendarElements({edtData}: {edtData: CourseEvent[]}): React.ReactElement {
    return (
        <>
        {edtData && edtData.map((event: CourseEvent, key: any) => {
            const courseStart: Date = parseISO(event.DTSTART);
            const courseEnd: Date = parseISO(event.DTEND);
            
            const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
            return (
            <div
                key={key}
                className="absolute flex flex-col  items-center justify-center p-1 m-0 bg-neutral-950 text-white border text-sm text-ellipsis rounded-xl border-neutral-600 cursor-pointer"
                style={{
                    width:`${100 / COLUMNS}%`,
                    height: `${(((getTimeValue(courseEnd) - getTimeValue(courseStart)) * 100) / HOURS_COUNT)}%`,
                    top: `${(getTimeValue(courseStart) * 100) / HOURS_COUNT}%`,
                    left: `${(courseStart.getDay() * 100) / COLUMNS}%`
                    }}
            >
                <p>{event.SUMMARY}</p>
                <p>{prof != undefined && prof}</p>
                <p>{event.LOCATION}</p>
            </div>)
            }
        )}
        </>
    );
}