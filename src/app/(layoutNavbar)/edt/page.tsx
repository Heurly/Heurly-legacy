import React from "react";
import { EdtData, fetchEDTData } from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import Edt from "@/components/edt/Edt";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { getServerSession, Session } from "next-auth";
import authOptions from "@/utils/AuthOptions";

export const dynamic = "force-dynamic";

const EdtPage: React.FunctionComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const modules = session?.user?.profile?.modules ?? [];
  const initialDate = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
  const dateGreater = new Date(
    new Date(
      initialDate.getTime() - (initialDate.getDay() - 1) * DAY_IN_MS,
    ).getTime(),
  );
  const dateLower = new Date(
    new Date(
      initialDate.getTime() + 6 * DAY_IN_MS - initialDate.getDay() * DAY_IN_MS,
    ),
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
            current: initialDate.getDay() - 1,
          } as EdtData
        }
        modules={modules}
      ></Edt>
    </div>
  );
};

export default EdtPage;
