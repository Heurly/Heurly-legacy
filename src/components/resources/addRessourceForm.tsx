import React from "react";
import { PrismaClient } from "@prisma/client";
import prismaClient from "@/utils/Prisma";
import cn from "classnames";

export default function AddRessourceForm(): React.ReactElement {
  async function getAllUnits() {
    const units = await prismaClient.unit.findMany();
    return units;
  }
  return (
    <form className="flex flex-col">
      <select name="" id="">
        <option value="1" key="">
          test
        </option>
      </select>
      <input type="text" placeholder="titre du document" />
      <input type="file" />
      <input type="submit" value="valider" className={cn("text-neutral-950 border","dark:text-white")}/>
    </form>
  );
}
