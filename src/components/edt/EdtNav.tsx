import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { EdtState } from "@/components/edt/EdtContent";
import { endOfWeek, format, startOfWeek } from "date-fns";
import Button from "@/components/Button";

interface Props {
  edtState: EdtState;
  setEdtState: (state: EdtState) => void;
}

const EdtNav: React.FunctionComponent<Props> = ({
  edtState,
  setEdtState,
}: Props) => {
  const [date, setDate] = useState<number>(Date.now());

  useEffect(() => {
    setEdtState({
      begin: startOfWeek(date).getTime(),
      end: endOfWeek(date + DAY_IN_MS * 14).getTime(),
      index: new Date(date).getDay(),
    });
  }, [date]);

  return (
    <div className="flex justify-center text-white items-center">
      <input
        className="bg-neutral-600 border border-neutral-500 text-white"
        onChange={(e) => setDate(Date.parse(e.currentTarget.value))}
        type="date"
        name="edtDate"
      />
      <Button onClick={() => setDate(Date.now())}>Recentrer</Button>
    </div>
  );
};

export default EdtNav;
