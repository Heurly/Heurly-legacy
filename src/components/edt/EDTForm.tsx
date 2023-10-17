"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { API_URL } from "@/config/const";
import id from "@/utils/id";
import SearchBar, {
  Suggestion,
  SuggestionFilter,
} from "@/components/common/search-bar";
import { ModuleFilter } from "@/app/api/modules/route";
import { useSession } from "next-auth/react";

async function getModules(filter: SuggestionFilter) {
  const payload = {
    contains: filter.tags.concat(filter.value.split(" ")),
  } as ModuleFilter;
  const data = await fetch(API_URL + "/modules", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const res = await data.json();
  return res.map((m: ModuleChoice) => ({
    label: m.label,
    value: m,
  })) as Suggestion[];
}

interface Props {
  modules: ModuleChoice[];
  setModules: Dispatch<SetStateAction<ModuleChoice[]>>;
}

const EDTForm: React.FunctionComponent<Props> = ({
  modules,
  setModules,
}: Props) => {
  const addModule = (module: Suggestion | undefined) => {
    if (module == undefined || modules.find((m) => m.label == module.value))
      return;

    const newModules = modules.concat([module.value]);
    setModules(newModules);
  };
  const removeModule = (module: string | undefined) => {
    if (module == undefined) return;

    const newModules = modules.filter((m) => m.label != module);
    setModules(newModules);
  };

  return (
    <>
      <SearchBar data={getModules} tags={[]} resolveSearch={addModule} />
      <div className="flex flex-row h-1/12 mb-4">
        {modules &&
          modules.length >= 0 &&
          modules.map((m) => (
            <div
              key={id()}
              className="w-fit ml-2 text-cyan-200 text-xs bg-cyan-950 rounded hover:cursor-pointer hover:text-red-400"
              onClick={(e) => removeModule(e.currentTarget.innerText)}
            >
              {m.label.split(" - ").slice(-3).join(" ")}
            </div>
          ))}
      </div>
    </>
  );
};

export default EDTForm;
