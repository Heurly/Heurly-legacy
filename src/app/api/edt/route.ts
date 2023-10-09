import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { NextRequest } from "next/server";
import { lines2tree } from 'icalts'
import {distance} from "fastest-levenshtein";
import {parseISO} from "date-fns";
import {DAY_IN_MS} from "@/app/(layoutNavbar)/edt/const";

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

function filterCourses(courses: CourseEvent[], weekOffset: Date) {
  weekOffset.setHours(0);
  weekOffset.setMinutes(0);

  return courses.filter(m =>
      parseISO(m.DTSTART).getTime() >= new Date(weekOffset.getTime() - (weekOffset.getDay() + 1) * (DAY_IN_MS)).getTime() &&
      parseISO(m.DTSTART).getTime() < new Date((weekOffset.getTime() + (6 * DAY_IN_MS)) - weekOffset.getDay() * (DAY_IN_MS)).getTime()
  ) as CourseEvent[];
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
  const payload: {offset: number, modules: number[]} = await request.json();
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

  res.VCALENDAR[0].VEVENT = filterCourses(res.VCALENDAR[0].VEVENT, new Date(payload.offset));
  await translateCoursesCodes(res.VCALENDAR[0].VEVENT);

  return NextResponse.json(res);
}
