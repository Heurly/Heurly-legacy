import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import { CourseEvent } from "./types";
import { API_URL } from "@/config";

export const dynamic = "force-dynamic";

async function getEDTData(): Promise<CourseEvent[]> {
  const data = await fetch(API_URL + "/api/edt");
  try {
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
  } catch(e) {
    console.log('[ERROR] Failed to retrieve EDT data fetching from: ' + API_URL + "api/edt");
  }

  return [];
}

export default async function Edt(): Promise<React.ReactElement> {
  const edt = await getEDTData();
  return (
    <>
      <EDTForm></EDTForm>
      <div className="relative w-full h-full text-center">
        <Grid />
        <CalendarElements edtData={edt} />
      </div>
    </>
  );
}
