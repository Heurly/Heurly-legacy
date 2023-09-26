'use client'
import React, {useState} from "react";
import Button from "@/components/Button";

interface Props {
    data: ModuleChoice[];
}

type ModuleChoice = {
    label: string;
    code: number;
}

const ModuleInput: React.FunctionComponent<Props> = (props: Props) => {
    const [modules, setModules] = useState<ModuleChoice[]>(props.data);

    const addModule = (module: ModuleChoice) => {
        if (module == undefined) return;

        modules.push(module);
        setModules(modules);
    }

    return (
        <div className="text-red flex-col w-full align-middle justify-center pb-4">
            <div>
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
            </div>
            <div>
                {modules.map(m => (
                    <>
                        <div>{m.label}</div>
                        <button>X</button>
                    </>
                ))}
            </div>
            <input type="submit" />
            <button>Add</button>
        </div>
    );
}

export default ModuleInput;