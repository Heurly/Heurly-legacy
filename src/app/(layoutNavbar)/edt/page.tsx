'use client'
import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import {CourseEvent, ModuleChoice} from "./types";
import { API_URL } from "@/config/const";
import {useEffect, useState} from "react";

export const dynamic = "force-dynamic";

async function getEDTData(modules: ModuleChoice[]): Promise<CourseEvent[]> {
  const data = await fetch(API_URL + "/edt");
  try {
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
  } catch(e) {
    console.log('[ERROR] Failed to retrieve EDT data fetching from: ' + API_URL + "edt");
  }

  return [];
}

export default async function Edt(): Promise<React.ReactElement> {
  const [modules, setModules] = useState<ModuleChoice[]>([]);
  const edt = await getEDTData(modules);

  return (
    <>
      <EDTForm modules={modules} setModules={setModules}></EDTForm>
      <div className="relative w-full h-full text-center">
        <Grid />
        <CalendarElements edtData={edt} />
      </div>
    </>
  );
}
