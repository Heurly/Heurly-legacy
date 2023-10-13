"use client";
import React from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import CalendarElementsGrid from "@/components/edt/Calendar/CalendarElementsGrid";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { CalendarElementsSwiper } from "./Calendar/CalendarElementsSwiper";

function getTimeValue(date: Date): number {
  const offset: number = 6 + date.getTimezoneOffset() / 60;
  return (
    (date.getUTCHours() - offset) * 60 * 60 * 1000 +
    date.getUTCMinutes() * 60 * 1000
  );
}

export default function CalendarElements({
  edtData,
}: {
  edtData: CourseEvent[];
}): React.ReactElement {
  const mobilePx = 768;
  const { width } = useWindowDimensions();
  if (width > mobilePx) return <CalendarElementsGrid edtData={edtData} />;
  else return <CalendarElementsSwiper edtData={edtData} />;
}
