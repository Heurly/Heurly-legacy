import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import prismaClient from "@/utils/Prisma";

export type ModuleFilter = {
  contains: string[];
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as ModuleFilter;
  const condition = {
    AND: payload.contains.map((w) => ({
      full_name: {
        contains: w,
      },
    })),
  };
  let res = await prismaClient.unit.findMany({
    where: condition,
  });

  return Response.json(
    res.map((m) => ({
      label: m.full_name.replaceAll(";", " - "),
      code: m.code,
    })),
  );
}

export async function GET(request: NextRequest) {
  let res = await prismaClient.unit.findMany();

  return Response.json(
    res.map((m) => ({
      label: m.full_name.replaceAll(";", " - "),
      code: m.code,
    })),
  );
}
