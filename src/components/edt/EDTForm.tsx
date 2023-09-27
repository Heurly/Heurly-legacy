"use client";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import { CLASS_VALUES } from "@/app/(layoutNavbar)/edt/const";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import Button from "@/components/Button";

interface Props {
  modules: ModuleChoice[];
  setModules: Dispatch<SetStateAction<ModuleChoice[]>>;
}

const EDTForm: React.FunctionComponent<Props> = ({modules, setModules}) => {
  const moduleList: ModuleChoice[] = [{label: "E4FI - 1Ia", code: 3345}, {label: "E4FI - Anglais - A", code: 3333}]
  const currentEntry = useRef<string>();

  const addModule = (module: ModuleChoice | undefined) => {
    if (module == undefined) return;

    const newModules = modules.concat([module]);
    setModules(newModules);
  }
  const removeModule = (module: string | undefined) => {
    if (module == undefined) return;

    const newModules = modules.filter(m => m.label != module);
    setModules(newModules);
  }

  return (
      <div className="flex-col w-fullpb-4">
        <div className="flex-row">
          <input type="text" name="product" list="productName" />
          <datalist
              id="productName"
              onChange={(event) => {currentEntry.current = event.currentTarget.innerText}}
          >
              {moduleList.map(m => (<option key={m.code} value={m.label} />))}
          </datalist>
          <Button
              className="text-white"
              onClick={() => addModule(moduleList.find(m => m.label == currentEntry.current))}>
              Ajouter
          </Button>
        </div>
        <div className="flex flex-row p-2 text-white">
          {modules.length >= 0 && modules.map(m => (
              <>
                <div
                    onClick={(event) => removeModule(event.currentTarget.innerText)}
                    className="h:cursor-pointer p-2"
                >
                  {m.label}
                </div>
              </>
          ))}
          {modules.length == 0 && (<div>Aucun module sélectionné</div>)}
        </div>
      </div>
  );
}

export default EDTForm;