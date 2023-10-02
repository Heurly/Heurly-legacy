"use client";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import SearchBar, {Suggestion, SuggestionType} from "@/components/search-bar";
import {API_URL} from "@/config/const";

async function getModules() {
    const data = await fetch(API_URL + "/modules");
    const res = await data.json();
    return res as ModuleChoice[];
}

interface Props {
  modules: ModuleChoice[];
  setModules: Dispatch<SetStateAction<ModuleChoice[]>>;
}

const EDTForm: React.FunctionComponent<Props> = ({modules, setModules}: Props) => {
    const [moduleList, setModuleList] = useState<ModuleChoice[]>([]);

    const getModuleList = async () => {
        const data = await getModules();
        setModuleList(data);
    }

    useEffect(() => {
        getModuleList();
    }, []);

  const addModule = (module: Suggestion | undefined) => {
    if (module == undefined) return;

    const newModule = moduleList.find(m => m.label == module.text);
    if (newModule == undefined) return;

    const newModules = modules.concat([newModule]);
    setModules(newModules);
  }
  const removeModule = (module: string | undefined) => {
    if (module == undefined) return;

    const newModules = modules.filter(m => m.label != module);
    setModules(newModules);
  }

  return (
      <>
          <SearchBar
              suggestions={moduleList.map(m => ({text: m.label, type: SuggestionType.MODULE} as Suggestion))}
              resolveSearch={addModule}
          />
          <div className="flex-col mb-4">
              {modules && modules.length >= 0 &&
                  modules.map(m => (
                      <div
                          key={m.label}
                          className="w-fit p-0.5 text-cyan-200 text-xs bg-cyan-950 backdrop-sepia rounded hover:cursor-pointer hover:text-red-400"
                          onClick={(e) => removeModule(e.currentTarget.innerText)}
                      >
                          {m.label}
                      </div>
              ))}
          </div>
      </>
  );
}

export default EDTForm;