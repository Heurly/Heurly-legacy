"use client";

import EdtForm from "@/components/edt/EdtForm";
import EdtGrid from "@/components/edt/EdtGrid";
import EdtContent from "@/components/edt/EdtContent";
import React, { useState } from "react";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { EdtData } from "@/utils/edt";
import { SessionProvider } from "next-auth/react";

interface Props {
  initialData: EdtData;
  modules: ModuleChoice[];
}

const Edt: React.FunctionComponent<Props> = ({
  initialData,
  modules,
}: Props) => {
  const [currentModules, setCurrentModules] = useState<ModuleChoice[]>(modules);

  return (
    <SessionProvider>
      <div className="relative w-full h-[100svh] text-center">
        <EdtContent initialData={initialData} modules={modules} />
      </div>
    </SessionProvider>
  );
};

export default Edt;
