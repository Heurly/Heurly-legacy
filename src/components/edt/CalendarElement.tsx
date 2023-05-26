import React from "react";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";
import { parseISO } from "date-fns";

function getTimeValue(date: Date): number{
    const offset: number = 6 + date.getTimezoneOffset() / 60;
    return (date.getUTCHours() - offset)*60*60*1000 + date.getUTCMinutes()*60*1000;
}

export default function calendarToHTMLTable({edtData}: {edtData: CourseEvent[]}): React.ReactElement {
    return (
        <>
        {edtData && edtData.map((event: CourseEvent, key: any) => {
            const courseStart: Date = parseISO(event.DTSTART);
            const courseEnd: Date = parseISO(event.DTEND);
            const hoursCount: number = 14 * 60 * 60 * 1000;
            const daysCount: number = 7;
            
            const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);

            return (
            <div
                key={key}
                className="absolute flex flex-col bg-red-300 p-0 m-0 border-2 border-black text-sm text-ellipsis"
                style={{
                    width:`${100 / 7}%`,
                    //needs fix
                    height: `${(((getTimeValue(courseEnd) - getTimeValue(courseStart)) * 100) / hoursCount)}%)}`,
                    top: `${(getTimeValue(courseStart) * 100) / hoursCount}%`,
                    left: `${(courseStart.getDay() * 100) / daysCount}%`
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