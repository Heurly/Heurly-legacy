import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { NextRequest } from "next/server";
import { lines2tree } from 'icalts'
import {distance} from "fastest-levenshtein";
import {parseISO} from "date-fns";
import {DAY_IN_MS} from "@/app/(layoutNavbar)/edt/const";
import ApiFilter from "@/utils/apiFilter";

interface CalendarData {
  VCALENDAR: [
    {
      VEVENT: CourseEvent[]
    }
  ]
}

const prisma = new PrismaClient();

async function setUserGroups(formData: FormData) {
  const post = await prisma.user.findFirst({
    where: {
      id: {
        equals: 1,
      },
    },
  });
}

function filterCourses(courses: CourseEvent[], dateFilter: ApiFilter<number>) {
  if (dateFilter.greater != undefined) {
    courses = courses.filter(m =>
        dateFilter.greater != undefined &&
        parseISO(m.DTSTART).getTime() >= dateFilter.greater
    ) as CourseEvent[];
  }
  if (dateFilter.lower != undefined) {
    courses = courses.filter(m =>
        dateFilter.lower != undefined &&
        parseISO(m.DTSTART).getTime() <
        dateFilter.lower
    ) as CourseEvent[];
  }
  if (dateFilter.equals != undefined) {
    courses = courses.filter(m => {
      const start = parseISO(m.DTSTART);
      start.setHours(0, 0, 0, 0);

      return dateFilter.equals != undefined &&
          start.getTime() == dateFilter.equals
        }
    ) as CourseEvent[];
  }

  return courses as CourseEvent[];
}

async function translateCoursesCodes(courses: CourseEvent[]) {
  // Retrieve necessary courses label batch
  let conditions = [];
  for (const course of courses) {
    const [subject, type]: string[] = course.SUMMARY.split(":");
    const keywords = subject.split("-");

    conditions.push({AND: keywords.map(w => ({
        code_cours: {
          contains: w
        }
      }))});
  }
  const filter = {OR: conditions};
  let labels = await prisma.course.findMany({
    where: filter
  });

  // Translate courses codes
  for (const course of courses) {
    const [subject, type]: string[] = course.SUMMARY.split(":");
    const label = labels.reduce((minLabel, currentLabel) => {
      const minDistance = distance(minLabel.code_cours, subject);
      const currentDistance = distance(currentLabel.code_cours, subject);
      return currentDistance < minDistance ? currentLabel : minLabel;
    }, labels[0]).nom_cours;

    course.SUMMARY = label != undefined ? `${label} : ${type}` : `${subject} : ${type}`;
  }
}

export async function POST(request: NextRequest) {
  const payload: {dateFilter: ApiFilter<number>, modules: number[]} = await request.json();
  if (payload.modules.length <= 0) return;

  const endpoint = PLANIF_ENDPOINT(payload.modules);

  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const VCALENDAR = await response.text();

  let res: CalendarData = lines2tree(VCALENDAR.split("\r\n")) as unknown as CalendarData;

  res.VCALENDAR[0].VEVENT = filterCourses(res.VCALENDAR[0].VEVENT, payload.dateFilter);
  await translateCoursesCodes(res.VCALENDAR[0].VEVENT);

  return NextResponse.json(res);
}
