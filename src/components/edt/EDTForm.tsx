"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { CLASS_VALUES } from "@/app/api/edt/const";

const prisma = new PrismaClient();

async function setUserGroups(formData: FormData) {
  "use server";
  const post = await prisma.user.findFirst({
    where: {
      id: {
        equals: 1,
      },
    },
  });
}

export default function EDTForm(): React.ReactElement {
  const [classValue, setClassValue] = useState(CLASS_VALUES.E3FI.value);

  return (
    <form>
      <select onChange={(event) => setClassValue(event.target.value)}>
        <option value={CLASS_VALUES.E3FI.value}>
          {CLASS_VALUES.E3FI.name}
        </option>
      </select>
    </form>
  );
}
