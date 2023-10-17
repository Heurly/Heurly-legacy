"use client";

import EdtForm from "@/components/edt/EdtForm";
import EdtGrid from "@/components/edt/EdtGrid";
import EdtElements from "@/components/edt/EdtContent";
import EdtNav from "@/components/edt/EdtNav";
import React, { useCallback, useEffect, useState } from "react";
import { CourseEvent, ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { fetchEDTData } from "@/utils/edt";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import ApiFilter from "@/utils/apiFilter";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { SessionProvider } from "next-auth/react";

interface Props {
  initialData: CourseEvent[];
  modules: ModuleChoice[];
}

const Edt: React.FunctionComponent<Props> = ({
  initialData,
  modules,
}: Props) => {
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState<boolean>(false);
  const [isPhoneDisplay, setIsPhoneDisplay] = useState<boolean>(false);

  const [edt, setEdt] = useState<CourseEvent[]>(initialData);
  const [currentModules, setCurrentModules] = useState<ModuleChoice[]>(modules);
  const [date, setDate] = useState<Date>(
    new Date(new Date(Date.now()).setHours(0, 0, 0, 0)),
  );

  const refreshEdt = useCallback(
    (newDate: Date) => {
      if (currentModules.length <= 0 || loading) return;

      setDate(newDate);
      setLoading(true);
      fetchEDTData(
        {
          greater: new Date(
            new Date(
              newDate.getTime() - (newDate.getDay() - 1) * DAY_IN_MS,
            ).getTime(),
          ).getTime(),
          lower: new Date(
            new Date(
              newDate.getTime() + 6 * DAY_IN_MS - newDate.getDay() * DAY_IN_MS,
            ),
          ).getTime(),
        } as ApiFilter<number>,
        currentModules,
      ).then((data) => {
        setLoading(false);
        setEdt(data);
      });
    },
    [currentModules],
  );

  useEffect(() => {
    const nbPxPhone = 768;
    setIsPhoneDisplay(width < nbPxPhone);
  }, [width]);

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
        <EdtGrid nbDays={isPhoneDisplay ? 1 : 6} />
        <EdtElements edtData={edt} setEdt={refreshEdt} />
      </div>
      <div className="hidden md:block lg:block w-full h-1/10">
        <EdtNav date={date} setDate={refreshEdt} />
      </div>
    </SessionProvider>
  );
};

export default Edt;
