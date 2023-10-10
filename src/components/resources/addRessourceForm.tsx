import React from "react";
import { PrismaClient } from "@prisma/client";

export default function AddRessourceForm(): React.ReactElement {
  async function getAllUnits() {
    const prisma = new PrismaClient();
    const units = await prisma.unit.findMany();
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
      <input type="submit" value="valider" className="text-white border" />
    </form>
  );
}
