import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { NextRequest } from "next/server";
import { lines2tree } from 'icalts'

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

export async function POST(request: NextRequest) {
  const payload: {offset: number, modules: number[]} = await request.json();
  if (payload.modules.length <= 0) return;

  const endpoint = PLANIF_ENDPOINT(payload.offset, payload.modules);

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const VCALENDAR = await response.text();
  var res: CalendarData = lines2tree(VCALENDAR.split("\r\n")) as unknown as CalendarData;

  for (const course of res.VCALENDAR[0].VEVENT) {
    const [subject, type]: string[] = course.SUMMARY.split(":");

    const keywords = subject.split("-");

    const condition = {AND: keywords.map(w => ({
        code_cours: {
          contains: w
        }
      }))};
    let label = await prisma.course.findFirst({
      where: condition
    });

    course.SUMMARY = label?.nom_cours != undefined ? `${label.nom_cours} : ${type}` : `${subject} : ${type}`;
  }

  return NextResponse.json(res);
}
