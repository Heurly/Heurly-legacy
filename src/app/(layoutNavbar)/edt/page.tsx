'use client'
import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import {CourseEvent, ModuleChoice} from "./types";
import { API_URL } from "@/config/const";
import React, {useEffect, useState} from "react";

export const dynamic = "force-dynamic";

async function fetchEDTData(modules: ModuleChoice[]): Promise<CourseEvent[]> {
  if (modules == undefined || modules.length <= 0) return [];

  const data = await fetch(API_URL + "/edt",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modules.map(m => m.code))
      });
  try {
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
  } catch(e) {
    console.log('[ERROR] Failed to retrieve EDT data fetching from: ' + API_URL + "/edt");
  }

  return [];
}

const Edt: React.FunctionComponent = () => {
  const [modules, setModules] = useState<ModuleChoice[]>([]);
  const [edt, setEdt] = useState<CourseEvent[]>([]);

  const getEdtData = async (modules: ModuleChoice[]) => {
    const data = await fetchEDTData(modules);
    setEdt(data);
  }

  useEffect(() => {
    getEdtData(modules);
  }, [modules]);

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

export default Edt;