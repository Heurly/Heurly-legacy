'use client'
import EDTForm from "@/components/edt/EDTForm";
import CalendarElements from "@/components/edt/CalendarElements";
import Grid from "@/components/edt/Calendar/Grid";
import {CourseEvent, ModuleChoice} from "./types";
import React, {useEffect, useState} from "react";
import Button from "@/components/Button";
import {DAY_IN_MS} from "@/app/(layoutNavbar)/edt/const";
import {fetchEDTData} from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";


export const dynamic = "force-dynamic";

const Edt: React.FunctionComponent = () => {
  const [modules, setModules] = useState<ModuleChoice[]>([]);
  const [edt, setEdt] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const changeDate = (daysCount: number) => {
      let newDate: Date = new Date(date.getTime() + daysCount * DAY_IN_MS);
      newDate.setHours(0, 0, 0, 0);
      setDate(newDate);
  }

  useEffect(() => {
      setLoading(true);
    fetchEDTData({
        greater:
            new Date(new Date(date.getTime() - (date.getDay() - 1) * (DAY_IN_MS)).getTime()).getTime(),
        lower:
            new Date(new Date((date.getTime() + (6 * DAY_IN_MS)) - date.getDay() * (DAY_IN_MS))).getTime()
    } as ApiFilter<number>
    , modules).then((data) => {
        setLoading(false);
        setEdt(data)
    });
  }, [modules, date]);

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