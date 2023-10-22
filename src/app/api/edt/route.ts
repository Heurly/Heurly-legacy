import { NextResponse } from "next/server";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { NextRequest } from "next/server";
import { lines2tree } from "icalts";
import { distance } from "fastest-levenshtein";
import { parseISO } from "date-fns";
import ApiFilter from "@/utils/apiFilter";
import prismaClient from "@/utils/Prisma";

const COURSES_EXCEPTIONS = ["BDE"];

interface CalendarData {
  VCALENDAR: [
    {
      VEVENT: CourseEvent[];
    },
  ];
}

async function setUserGroups(formData: FormData) {
  const post = await prismaClient.user.findFirst({
    where: {
      id: {
        equals: 1,
      },
    },
  });
}

function filterCourses(courses: CourseEvent[], dateFilter: ApiFilter<number>) {
  if (dateFilter.equals != undefined) {
    courses = courses.filter((m) => {
      const start = parseISO(m.DTSTART);
      start.setHours(0, 0, 0, 0);

      return (
        dateFilter.equals != undefined && start.getTime() == dateFilter.equals
      );
    }) as CourseEvent[];
  }

  return courses as CourseEvent[];
}

function distanceToCourseCode(target: string, entry: string) {
  if (entry.length > target.length) {
    const strippedEntry = entry.slice(0, entry.length - 1);

    if (strippedEntry == target) {
      return 0;
    }
  }

  return distance(target, entry);
}

async function translateCoursesCodes(courses: CourseEvent[]) {
  // Retrieve necessary courses label batch
  let conditions = [];
  for (const course of courses) {
    const [subject, type]: string[] = course.SUMMARY.split(":");
    const keywords = subject.split("-");

    conditions.push({
      AND: keywords.map((w) => ({
        code_cours: {
          contains: w,
        },
      })),
    });
  }
  const filter = { OR: conditions };
  let labels = await prismaClient.course.findMany({
    where: filter,
  });

  // Translate courses codes
  for (const course of courses) {
    const [subject, type]: string[] = course.SUMMARY.split(":");

    if (COURSES_EXCEPTIONS.includes(subject)) {
      course.SUMMARY = course.SUMMARY.replace(":", " : ");
      continue;
    }

    const label = labels.reduce((minLabel, currentLabel) => {
      let minDistance = 0;
      let currentDistance = 0;
      subject.split("-").forEach((w1) => {
        minLabel.code_cours
          .split("_")
          .slice(2)
          .forEach((w2) => (minDistance += distanceToCourseCode(w1, w2)));
        currentLabel.code_cours
          .split("_")
          .slice(2)
          .forEach((w2) => (currentDistance += distanceToCourseCode(w1, w2)));
      });

      return currentDistance < minDistance ? currentLabel : minLabel;
    }, labels[0]).nom_cours;

    course.SUMMARY =
      label != undefined ? `${label} : ${type}` : `${subject} : ${type}`;
  }
}

export async function POST(request: NextRequest) {
  const payload: { dateFilter: ApiFilter<number>; modules: number[] } =
    await request.json();
  if (payload.modules.length <= 0) return;

  try {
    const endpoint = PLANIF_ENDPOINT(payload.dateFilter, payload.modules);

    const response = await fetch(endpoint, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const VCALENDAR = await response.text();

    let res: CalendarData = lines2tree(
      VCALENDAR.split("\r\n"),
    ) as unknown as CalendarData;

    res.VCALENDAR[0].VEVENT = filterCourses(
      res.VCALENDAR[0].VEVENT,
      payload.dateFilter,
    );
    await translateCoursesCodes(res.VCALENDAR[0].VEVENT);

    return NextResponse.json(res);
  } catch (error) {
    console.log("Error in api/edt:\n" + error);
    return NextResponse;
  }
}
