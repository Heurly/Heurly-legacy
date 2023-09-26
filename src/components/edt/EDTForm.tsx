"use client";
import React, { useState } from "react";
import { CLASS_VALUES } from "@/app/(layoutNavbar)/edt/const";
import ModuleInput from "@/components/edt/ModuleInput";

export default function EDTForm(): React.ReactElement {
  const [classValue, setClassValue] = useState(CLASS_VALUES.E3FI.value);

  return (
      <ModuleInput data={[]} ></ModuleInput>
  );
}
