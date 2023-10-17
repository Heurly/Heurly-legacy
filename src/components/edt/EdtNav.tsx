import Button from "@/components/Button";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import React from "react";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const EdtNav: React.FunctionComponent<Props> = ({ date, setDate }: Props) => {
  const changeDate = (daysCount: number) => {
    let newDate: Date = new Date(date.getTime() + daysCount * DAY_IN_MS);
    newDate.setHours(0, 0, 0, 0);
    setDate(newDate);
  };

  return (
    <div className="flex text-white p-4">
      <Button onClick={() => changeDate(-7)}>Semaine Précédente</Button>
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
      <Button onClick={() => changeDate(7)} className="ml-auto">
        Semaine Prochaine
      </Button>
    </div>
  );
};

export default EdtNav;
