import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import React, { useCallback } from "react";
import Image from "next/image";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const EdtNav: React.FunctionComponent<Props> = ({ date, setDate }: Props) => {
  const changeDate = useCallback(
    (daysCount: number) => {
      let newDate: Date = new Date(date.getTime() + daysCount * DAY_IN_MS);
      newDate.setHours(0, 0, 0, 0);
      setDate(newDate);
    },
    [date],
  );

  return (
    <div className="flex text-white items-center">
      <Image
        className="hover:cursor-pointer"
        alt="edt-left-nav"
        src="/images/ChevronLeft.svg"
        onClick={() => changeDate(-7)}
        width={32}
        height={32}
      />
      <div className="ml-auto">
        {`${new Date(
          date.getTime() - (date.getDay() - 1) * DAY_IN_MS,
        ).toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        {` - `}
        {`${new Date(
          date.getTime() + 6 * DAY_IN_MS - date.getDay() * DAY_IN_MS,
        ).toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
      </div>
      <Image
        className="ml-auto hover:cursor-pointer"
        alt="edt-right-nav"
        src="/images/ChevronRight.svg"
        onClick={() => changeDate(7)}
        width={32}
        height={32}
      />
    </div>
  );
};

export default EdtNav;
