import React from "react";
import { useSession } from "next-auth/react";
import { fetchEDTData } from "@/utils/edt";
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

  const initialData = await fetchEDTData(
    {
      greater: new Date(
        new Date(
          initialDate.getTime() - (initialDate.getDay() - 1) * DAY_IN_MS,
        ).getTime(),
      ).getTime(),
      lower: new Date(
        new Date(
          initialDate.getTime() +
            6 * DAY_IN_MS -
            initialDate.getDay() * DAY_IN_MS,
        ),
      ).getTime(),
    } as ApiFilter<number>,
    modules,
    true,
  );

  return (
    <div className="w-full h-full">
      <Edt initialData={initialData} modules={modules}></Edt>
    </div>
  );
};

export default EdtPage;
