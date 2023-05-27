import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PLANIF_ENDPOINT } from "@/app/api/ApiHelper";
import { SUMMARY_MAP } from "@/course-config.json"
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";
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

export async function GET(request: NextRequest) {
  // const endpoint = URLBuilder(PLANIF_ENDPOINT, payload);
  const endpoint = PLANIF_ENDPOINT;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const VCALENDAR = await response.text();
  var res: CalendarData = lines2tree(VCALENDAR.split("\r\n")) as unknown as CalendarData;
  res.VCALENDAR[0].VEVENT.forEach((course) => {
    const [subject, type]: string[] = course.SUMMARY.split(":")
    course.SUMMARY = `${SUMMARY_MAP[subject as keyof typeof SUMMARY_MAP] ?? subject} : ${type}`;
  });

  return NextResponse.json(res);
}
