import { NextResponse } from "next/server";
import {Course, PrismaClient} from "@prisma/client";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { NextRequest } from "next/server";
import { lines2tree } from 'icalts'
import {distance} from "fastest-levenshtein";

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

  const weekOffset: number = 1;
  const endpoint = PLANIF_ENDPOINT(weekOffset, payload.modules);

  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const VCALENDAR = await response.text();

  var res: CalendarData = lines2tree(VCALENDAR.split("\r\n")) as unknown as CalendarData;

  await translateCoursesCodes(res.VCALENDAR[0].VEVENT);

  return NextResponse.json(res);
}
