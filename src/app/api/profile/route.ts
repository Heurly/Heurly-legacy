import { NextRequest } from "next/server";
import prismaClient from "@/utils/Prisma";

export interface UpdateProfilePayload {
  email: string;
  modules: number[];
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as UpdateProfilePayload;

  const prismaBullshit = await prismaClient.user.findFirst({
    where: { email: payload.email },
  });

  if (prismaBullshit == undefined) return Response.error();

  const update = await prismaClient.user.update({
    where: {
      id: prismaBullshit.id,
      email: payload.email,
    },
    data: {
      profile: payload.modules,
    },
  });

  return new Response();
}
