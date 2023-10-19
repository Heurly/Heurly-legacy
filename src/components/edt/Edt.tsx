"use client";

import EdtForm from "@/components/edt/EdtForm";
import EdtGrid from "@/components/edt/EdtGrid";
import EdtContent from "@/components/edt/EdtContent";
import EdtNav from "@/components/edt/EdtNav";
import React, { useCallback, useState } from "react";
import { CourseEvent, ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { EdtData, fetchEDTData, isSameCourse } from "@/utils/edt";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import ApiFilter from "@/utils/apiFilter";
import { SessionProvider } from "next-auth/react";
import { parseISO } from "date-fns";

interface Props {
  initialData: EdtData;
  modules: ModuleChoice[];
}

const Edt: React.FunctionComponent<Props> = ({
  initialData,
  modules,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [edt, setEdt] = useState<EdtData>(initialData);
  const [currentModules, setCurrentModules] = useState<ModuleChoice[]>(modules);
  const [date, setDate] = useState<Date>(
    new Date(new Date(Date.now()).setHours(0, 0, 0, 0)),
  );

  const refreshEdt = useCallback(
    (newDate: Date) => {
      if (currentModules.length <= 0 || loading) return;
      setLoading(true);

      const dateGreater = new Date(
        new Date(newDate.getTime() - (newDate.getDay() - 1) * DAY_IN_MS),
      );
      const dateLower = new Date(
        new Date(
          newDate.getTime() + 6 * DAY_IN_MS - newDate.getDay() * DAY_IN_MS,
        ),
      );

      setDate(newDate);
      fetchEDTData(
        {
          greater: dateGreater.getTime(),
          lower: dateLower.getTime(),
        } as ApiFilter<number>,
        currentModules,
      ).then((data) => {
        let first = dateGreater;
        let last = dateLower;

        const storedRaw = localStorage.getItem("edt");
        const res: CourseEvent[] = [];

        if (storedRaw == null) {
          res.concat(data);
        } else {
          const stored: EdtData = JSON.parse(storedRaw) as EdtData;
          res.concat(stored.data);

          for (let course of data) {
            const existing =
              stored?.data?.length > 0
                ? stored.data.find((c) => isSameCourse(c, course))
                : undefined;

            if (existing == undefined) {
              res.push(course);
            }
          }

          const newFirst = res?.find(
            (c) => parseISO(c.DTSTART).getTime() < first.getTime(),
          )?.DTSTART;
          const newLast = res?.find(
            (c) => parseISO(c.DTSTART).getTime() > last.getTime(),
          )?.DTSTART;
          console.log(newFirst, newLast);
          if (newFirst) {
            first = parseISO(newFirst);
          }
          if (newLast) {
            last = parseISO(newLast);
          }
        }

        localStorage.setItem(
          "edt",
          JSON.stringify({ data: res, first: first, last: last }),
        );
        setEdt({ data: res, first: dateGreater, last: dateLower } as EdtData);
        setLoading(false);
      });
    },
    [currentModules],
  );

  return (
    <SessionProvider>
      <div className="w-full h-1/10">
        <EdtForm
          modules={currentModules}
          setModules={setCurrentModules}
        ></EdtForm>
      </div>
      <div className="relative w-full h-[75vh] text-center">
        {loading && (
          <div className="absolute w-full h-full bg-cyan-800 z-10 place-content-center opacity-25" />
        )}
        <EdtGrid />
        <EdtContent
          index={date.getDay() - 1}
          edtData={edt}
          date={date}
          setEdt={refreshEdt}
        />
      </div>
      <div className="hidden lg:block w-full h-1/10">
        <EdtNav date={date} setDate={refreshEdt} />
      </div>
    </SessionProvider>
  );
};

export default Edt;
