"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { API_URL } from "@/config/const";
import id from "@/utils/id";
import Button from "@/components/Button";
import { Session } from "next-auth";
import { UpdateProfilePayload } from "@/app/api/profile/route";
import EditIcon from "@/components/profile/EditIcon";
import cn from "classnames";
import SelectedIcon from "@/components/profile/SelectedIcon";
import TagIcon from "@/components/profile/TagIcon";

interface Props {
  session: Session;
}

const ModuleSelector: React.FunctionComponent<Props> = ({ session }) => {
  const router = useRouter();
  const [modules, setModules] = useState<ModuleChoice[]>();
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<string[]>([]);
  const [isAddable, setIsAddable] = useState<boolean>(false);

  const addModule = useCallback(() => {
    if (modules == undefined) return;
    const toAdd = modules.find((m) => m.label === selected);

    if (
      toAdd == undefined ||
      session.user.profile.modules.find((m) => m.code === toAdd.code)
    )
      return;

    const newProfile: number[] = session.user.profile.modules.map(
      (m) => m.code,
    );
    const payload = {
      email: session.user.email,
      modules: newProfile.concat([toAdd.code]),
    } as UpdateProfilePayload;
    fetch("/api/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      router.refresh();
    });
  }, [selected, modules]);

  const select = (selection: string) => {
    if (selected == undefined) setSelected(selection);

    setSelected(selected?.concat(` - ${selection}`));
  };

  const unselect = (level: number) => {
    if (selected == undefined || level == 0) return;

    setSelected(selected.split(" - ").slice(0, level).join(" - "));
  };

  useEffect(() => {
    fetch("/api/modules", { method: "GET" }).then(async (res) => {
      const data = (await res.json()) as ModuleChoice[];
      setModules(data);
      setSelected(data[0].label.split(" - ")[0]);
    });
  }, []);

  useEffect(() => {
    if (modules == undefined || selected == undefined) return;
    const opts: string[] = [];
    const selection = selected.split(" - ");

    modules.forEach((m) => {
      if (m.label.includes(selected)) {
        const current = m.label.split(" - ");
        if (current.length <= selection.length) return;

        const opt = current.at(selection.length);
        if (opt == undefined) return;

        const existing = opts.find((o) => o === opt);

        if (existing == undefined) {
          opts.push(opt);
        }
      }
    });

    setOptions(opts);
    setIsAddable(modules.find((m) => m.label === selected) != undefined);
  }, [selected, modules]);

  return (
    <div className="flex flex-col text-white">
      <div className="flex flex-wrap m-4 bg-emerald-950 p-4 rounded-xl">
        {selected != undefined &&
          selected.split(" - ").map((s, index) => (
            <div
              key={id()}
              className={cn(
                "flex p-1.5 w-fit mb-1 mr-1.5",
                "bg-emerald-900 border border-emerald-600 rounded-xl",
                "hover:text-red-400 cursor-pointer",
              )}
            >
              <SelectedIcon />
              <span
                className="pl-2 cursor-pointer"
                onClick={() => unselect(index)}
              >
                {s}
              </span>
            </div>
          ))}
      </div>
      <div className="flex flex-wrap w-full">
        {options.length > 0 &&
          options.map((o) => (
            <div
              key={id()}
              className={cn(
                "flex p-1.5 w-fit m-1.5",
                "bg-cyan-900 border border-cyan-600 rounded-xl",
                "hover:text-cyan-400 cursor-pointer",
              )}
            >
              <TagIcon />
              <span className="pl-2 cursor-pointer" onClick={() => select(o)}>
                {o}
              </span>
            </div>
          ))}
      </div>
      {isAddable && <Button onClick={addModule}>Ajouter le module</Button>}
    </div>
  );
};

export default ModuleSelector;
