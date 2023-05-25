import React from "react";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";
import { parseISO } from "date-fns";

function getTimeValue(date: Date): number{
    return date.getUTCHours()*60*60*1000 + date.getUTCMinutes()*60*1000;
}

export default function calendarToHTMLTable({edtData}: {edtData: CourseEvent[]}): React.ReactElement {
    return (
        <>
        {edtData && edtData.map((event: CourseEvent, key: any) => {
            const courseStart: Date = parseISO(event.DTSTART);
            const courseEnd: Date = parseISO(event.DTEND);
            const hoursCount: Date = new Date();
            hoursCount.setHours(15);
            const daysCount: number = 7;
            
            const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
            console.log(`${(getTimeValue(courseStart) * 100) / hoursCount.getTime()}%`)

            return (
            <div
                key={key}
                className="absolute flex flex-col bg-red-300 p-0 m-0 border-2 border-black text-sm text-ellipsis"
                style={{
                    width:`${100 / 7}%`,
                    height: `${(((courseEnd.getTime() - courseStart.getTime()) * 100) / hoursCount.getTime())}%)}`,
                    //needs fix
                    top: `${(getTimeValue(courseStart) * 100) / hoursCount.getTime()}%`,
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