"use client";
import React, { useState } from "react";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import id from "@/utils/id";
import cn from "classnames";
import { Session } from "next-auth";
import ProfileIcon from "@/components/profile/ProfileIcon";

interface Props {
  session: Session;
}

const ModuleList: React.FunctionComponent<Props> = ({ session }) => {
  const [modules, setModules] = useState<ModuleChoice[]>(
    session.user.profile.modules,
  );
  const removeModule = (code: number) => {
    const payload: ModuleChoice[] = modules.filter((m) => m.code != code);

    fetch("/api/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        modules: payload.map((m) => m.code),
      }),
    }).then(() => {
      setModules(payload);
    });
  };

  return (
    <>
      {modules?.length > 0 && (
        <div className="text-white">
          {modules.map((m) => (
            <div
              key={id()}
              className={cn(
                "flex p-1.5 w-fit mb-1",
                "bg-neutral-800 border border-neutral-600 rounded-xl",
                "hover:text-red-400 cursor-pointer",
              )}
            >
              <ProfileIcon />
              <span className="pl-2" onClick={() => removeModule(m.code)}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ModuleList;
