import React from "react";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";
import { parseISO } from "date-fns";

export default function calendarToHTMLTable({edtData}: {edtData: CourseEvent[]}): React.ReactElement {
    return (
        <>
        {edtData && edtData.map((event: CourseEvent, key: any) => {
            const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
            const hourStart: Date = parseISO();

            return (
            <div
                key={key} className="absolute flex flex-col bg-red-300 p-0 m-0 border-2 border-black"
                style={{
                    width:`${100 / 7}%`,
                    height: `${((100 * (parseISO(event.DTEND).getTime() - parseISO(event.DTSTART).getTime()))/(15*60*60*1000))}%)}`,
                    top: `${((parseISO(event.DTSTART).getTime() - hourStart.getTime()) * 100) / (15*60*60*1000)}%`,
                    left: `${((parseISO(event.DTSTART).getTime()) * 100) / (7*60*60*1000)}%`
                    }}
            >
                <div>
                <p>{event.SUMMARY}</p>
                <p>{prof != undefined && prof}</p>
                <p>{event.LOCATION}</p>
                </div>
            </div>)
            }
        )}
        </>
    );
}