import { CourseEvent, ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { API_URL } from "@/config/const";
import ApiFilter from "@/utils/apiFilter";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { addDays, isSameDay, parseISO } from "date-fns";
import EdtCourse from "@/components/edt/EdtCourse";
import React from "react";
import { number } from "prop-types";
import id from "@/utils/id";

export type EdtData = {
  data: CourseEvent[];
  first: number;
  last: number;
};

export type CourseDay = {
  day: number;
  courses: React.ReactNode[];
};

export async function fetchEDTData(
  dateFilter: ApiFilter<number>,
  modules: ModuleChoice[],
  fromServer: boolean = false,
): Promise<CourseEvent[]> {
  if (modules == undefined || modules.length <= 0) return [];

  const payload = {
    dateFilter: dateFilter,
    modules: modules.map((m) => m.code),
  };
  let endpoint = "/api/edt";
  if (typeof window === "undefined") {
    endpoint = `${API_URL}/edt`;
  }
  const data = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  try {
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
  } catch (e) {
    console.log(
      "[ERROR] Failed to retrieve EDT data fetching from: " +
        API_URL +
        "/edt\n" +
        e,
    );
  }

  return [];
}

export function isSameCourse(c1: CourseEvent, c2: CourseEvent) {
  return (
    c1.DTSTART == c2.DTSTART &&
    c1.DTEND == c2.DTEND &&
    c1.SUMMARY == c2.SUMMARY &&
    c1.DESCRIPTION == c2.DESCRIPTION &&
    c1.LOCATION == c2.LOCATION
  );
}

export function edtToCourseDays(edtData: EdtData) {
  const data: CourseDay[] = [];
  const start: number = new Date(edtData.first).setHours(0, 0, 0, 0);

  for (
    let day = start;
    day <= edtData.last;
    day = addDays(day, 1).setHours(0, 0, 0, 0)
  ) {
    data.push({ day: day, courses: [] });
  }

  for (const event of edtData.data) {
    if (event === undefined) continue;

    const courseStart: Date = parseISO(event.DTSTART);
    const courseEnd: Date = parseISO(event.DTEND);
    const dayKey: number = new Date(courseStart).setHours(0, 0, 0, 0);

    const prof: RegExpMatchArray | null =
      event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);

    const courseElement = (
      <EdtCourse
        key={id()}
        courseStart={courseStart}
        courseEnd={courseEnd}
        prof={prof}
        event={event}
      />
    );

    data.find((c) => isSameDay(c.day, dayKey))?.courses.push(courseElement);
  }
  return data;
}

export function getLocalDay(date: Date) {
  return (date.getDay() + 6) % 7;
}

export function getLocalDayNumber(date: number) {
  return getLocalDay(new Date(date));
}
