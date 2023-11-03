import { endOfWeek, startOfWeek } from "date-fns";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { getLocalDayNumber } from "@/utils/edt";
import Button from "@/components/Button";
import React from "react";
import { EdtState } from "@/components/edt/EdtContent";

interface Props {
  setEdtState: (value: EdtState) => void;
}

const EdtNav: React.FunctionComponent<Props> = ({ setEdtState }) => {
  return (
    <div className="flex justify-center text-white items-center">
      <input
        className="bg-neutral-600 border border-neutral-500 text-white"
        onChange={(e) => {
          const newDate = Date.parse(e.currentTarget.value);
          setEdtState({
            begin: startOfWeek(newDate, { weekStartsOn: 1 }).getTime(),
            end: endOfWeek(newDate + DAY_IN_MS * 14, {
              weekStartsOn: 1,
            }).getTime(),
            index: getLocalDayNumber(newDate) + 1, // +1 for the arrow slide
          });
        }}
        type="date"
        name="edtDate"
      />
      <Button
        onClick={() => {
          const newDate = Date.now();
          setEdtState({
            begin: startOfWeek(newDate, { weekStartsOn: 1 }).getTime(),
            end: endOfWeek(newDate + DAY_IN_MS * 14, {
              weekStartsOn: 1,
            }).getTime(),
            index: getLocalDayNumber(newDate) + 1, // +1 for the arrow slide
          });
        }}
      >
        Recentrer
      </Button>
    </div>
  );
};

export default EdtNav;
