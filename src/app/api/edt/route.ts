import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PLANIF_ENDPOINT, EDTData, URLBuilder } from "@/app/api/ApiHelper";
import ical2json from "ical2json";

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

  const data = await fetch(endpoint, {
    method: "GET",
  });

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  return NextResponse.json(ical2json.convert(await data.text()));
}
