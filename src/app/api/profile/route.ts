import { NextRequest } from "next/server";
import prisma from "@/utils/Prisma";

export interface UpdateProfilePayload {
  email: string;
  modules: number[];
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as UpdateProfilePayload;

  const update = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      profile: payload.modules,
    },
  });

  return new Response();
}
