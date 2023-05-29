import React from "react";
import { API_URL } from "@/config";
import CalendarElements from "@/components/edt/CalendarElements";
import Calendar from "@/components/edt/Calendar";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";

interface Props {
  class: string;
  engGroup?: string;
  managementGroup?: string;
}

async function getEDTData(): Promise<CourseEvent[]> {
  const data = await fetch(API_URL + "/api/edt");
  const resp = await data.json();

  return resp.VCALENDAR[0].VEVENT as CourseEvent[];
}

export default async function ESIEECalendar(): Promise<React.ReactElement> {
  const edt = await getEDTData();

  return (
    <div>
      <div className="relative grid grid-cols-7 grid-rows-1 w-full h-full text-center">
        <Calendar />
        <CalendarElements edtData={edt} />
      </div>
    </div>
  );
}
