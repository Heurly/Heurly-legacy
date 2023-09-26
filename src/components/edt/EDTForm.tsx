"use client";
import React, {Dispatch, SetStateAction, useState} from "react";
import { CLASS_VALUES } from "@/app/(layoutNavbar)/edt/const";
import {ModuleChoice} from "@/app/(layoutNavbar)/edt/types";
import Button from "@/components/Button";

interface Props {
  modules: ModuleChoice[];
  setModules: Dispatch<SetStateAction<ModuleChoice[]>>;
}

const EDTForm: React.FunctionComponent<Props> = ({modules, setModules}) => {
  const [classValue, setClassValue] = useState(CLASS_VALUES.E3FI.value);

  const addModule = (module: ModuleChoice) => {
    if (module == undefined) return;

    const newModules = modules.concat([module]);
    setModules(newModules);
  }
  const removeModule = (module: string) => {
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
              onInput={(event) =>
                  addModule({label: event.currentTarget.innerText, code: parseInt(event.currentTarget.id)})
              }>
            <option value="Pen">Pen</option>
            <option value="Pencil">Pencil</option>
            <option value="Paper">Paper</option>
          </datalist>
          <Button className="text-white">Ajouter</Button>
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