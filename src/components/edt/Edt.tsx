"use client";

import EdtForm from "@/components/edt/EdtForm";
import EdtGrid from "@/components/edt/EdtGrid";
import EdtContent from "@/components/edt/EdtContent";
import React, { useEffect, useState } from "react";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { CourseDay, EdtData } from "@/utils/edt";
import { SessionProvider } from "next-auth/react";
import EdtNav from "@/components/edt/EdtNav";

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
      <div className="w-full h-1/10">
        <EdtForm modules={currentModules} setModules={setCurrentModules} />
      </div>
      <div className="relative w-full h-[75vh] text-center">
        <EdtGrid />
        <EdtContent initialData={initialData} modules={modules} />
      </div>
    </SessionProvider>
  );
};

export default Edt;
