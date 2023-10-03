'use client'
import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import {CourseEvent, ModuleChoice} from "./types";
import { API_URL } from "@/config/const";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button";

export const dynamic = "force-dynamic";

const Edt: React.FunctionComponent = () => {
  const [modules, setModules] = useState<ModuleChoice[]>([]);
  const [edt, setEdt] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(Date.now()));

    async function fetchEDTData(offset: Date, modules: ModuleChoice[]): Promise<CourseEvent[]> {
        if (modules == undefined || modules.length <= 0) return [];
        setLoading(true);

        const payload = {offset: offset.getUTCDate(), modules: modules.map(m => m.code)}
        const data = await fetch(API_URL + "/edt",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        try {
            const resp = await data.json();

            setLoading(false);
            return resp.VCALENDAR[0].VEVENT as CourseEvent[];
        } catch(e) {
            console.log('[ERROR] Failed to retrieve EDT data fetching from: ' + API_URL + "/edt");
        }
        finally {
            setLoading(false);
        }

        setLoading(false);
        return [];
    }

  const getEdtData = async (modules: ModuleChoice[]) => {
    const data = await fetchEDTData(date, modules);
    setEdt(data);
  }

  const changeDate = (daysCount: number) => {
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate() + daysCount);
      setDate(newDate);
  }

  useEffect(() => {
    getEdtData(modules);
  }, [modules]);

  return (
    <>

      <EDTForm modules={modules} setModules={setModules}></EDTForm>
      <div className="relative w-full h-full text-center">
          {loading && <div className="absolute w-full h-full bg-cyan-800 z-10 place-content-center opacity-25" />}
        <Grid />
        <CalendarElements edtData={edt} />
      </div>
      <div className="flex text-white p-4">
          <Button onClick={() => changeDate(-7)}>Semaine Précédente</Button>
          <div className="ml-auto">{date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>
          <Button onClick={() => changeDate(7)} className="ml-auto">Semaine Prochaine</Button>
      </div>
    </>
  );
}

export default Edt;