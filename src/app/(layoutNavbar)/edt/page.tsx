import React from "react";
import { EdtData, fetchEDTData, getLocalDay } from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import Edt from "@/components/edt/Edt";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { endOfWeek, startOfWeek } from "date-fns";

export const dynamic = "force-dynamic";

const EdtPage: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const modules = session?.user?.profile?.modules ?? [];
  const initialDate = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
  const dateGreater = new Date(startOfWeek(initialDate).setHours(0, 0, 0, 0));
  const dateLower = new Date(
    endOfWeek(initialDate).setHours(0, 0, 0, 0) + DAY_IN_MS * 14,
  );

  const initialData = await fetchEDTData(
    {
      greater: dateGreater.getTime(),
      lower: dateLower.getTime(),
    } as ApiFilter<number>,
    modules,
    true,
  );

  return (
    <div className="w-full h-full">
      <Edt
        initialData={
          {
            data: initialData,
            first: dateGreater.getTime(),
            last: dateLower.getTime(),
            current: getLocalDay(initialDate),
          } as EdtData
        }
        modules={modules}
      ></Edt>
    </div>
  );
};

export default EdtPage;
