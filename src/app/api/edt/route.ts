import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PLANIF_ENDPOINT, EDTData, URLBuilder } from "@/app/api/ApiHelper";
import { SUMMARY_MAP } from "@/course-config.json"
import ical2json from "ical2json";
import { CourseEvent } from "@/app/(layoutNavBar)/edt/types";

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

export async function GET(payload: { [params: string]: string }) {
  const endpoint = URLBuilder(PLANIF_ENDPOINT, payload);

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const VCALENDAR = await response.text();
  var res: CalendarData = ical2json.convert(VCALENDAR);
  res.VCALENDAR[0].VEVENT.forEach((course) => {
    const [subject, type]: string[] = course.SUMMARY.split(":")
    course.SUMMARY = `${SUMMARY_MAP[subject as keyof typeof SUMMARY_MAP] ?? subject} : ${type}`;
  });

  return NextResponse.json(res);
}
