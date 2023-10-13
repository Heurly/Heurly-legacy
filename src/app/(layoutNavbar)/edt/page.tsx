'use client'
import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import {CourseEvent, ModuleChoice} from "./types";
import { API_URL } from "@/config/const";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button";
import {DAY_IN_MS} from "@/app/(layoutNavbar)/edt/const";
import authOptions from "@/utils/AuthOptions";
import {getServerSession} from "next-auth";
import {SessionProvider, useSession} from "next-auth/react";


export const dynamic = "force-dynamic";

const Edt: React.FunctionComponent = () => {
    const {data: session} = useSession();

    const [modules, setModules] = useState<ModuleChoice[]>([]);
    const [edt, setEdt] = useState<CourseEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date(Date.now()));

    async function fetchEDTData(offset: Date, modules: ModuleChoice[]): Promise<CourseEvent[]> {
        if (modules == undefined || modules.length <= 0) return [];
        setLoading(true);

        const payload = {offset: offset, modules: modules.map(m => m.code)}
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

    const changeDate = (daysCount: number) => {
      setDate(new Date(date.getTime() + daysCount * DAY_IN_MS));
    }

    useEffect(() => {
        if (modules.length > 0)
            fetchEDTData(date, modules).then((data) => setEdt(data));
    }, [modules, date]);

    useEffect(() => {
        let newModules: ModuleChoice[] = [];
        let changed: boolean = false;
        if (session?.user?.profile?.modules != undefined)
        {
            for (const m of session.user.profile?.modules) {
                if (modules.find(e => e.code == m.code) == undefined) {
                    changed = true;
                    newModules = newModules.concat([m]);
                }
            }

            if (changed) setModules(newModules);
        }
    }, [session]);

  return (
    <>
      <EDTForm modules={modules} setModules={setModules}></EDTForm>
      <div className="relative w-full h-full text-center">
          {loading && <div className="absolute w-full h-full bg-cyan-800 z-10 place-content-center opacity-25" />}
        <Grid date={date} />
        <CalendarElements edtData={edt} />
      </div>
      <div className="flex text-white p-4">
          <Button onClick={() => changeDate(-7)}>Semaine Précédente</Button>
          <div className="ml-auto">
              {`${new Date(date.getTime() - (date.getDay() - 1) * DAY_IN_MS)
                  .toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}`}
              {` - `}
              {`${new Date((date.getTime() + 6*DAY_IN_MS) - date.getDay() * DAY_IN_MS)
                  .toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}`}
          </div>
          <Button onClick={() => changeDate(7)} className="ml-auto">Semaine Prochaine</Button>
      </div>
    </>
  );
}

export default Edt;