import prismaClient from "@/utils/Prisma";
import { tr } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

type Message = {
  client: string;
  message: string;
};

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Message;
  console.log(payload);

  // Check if the client has sent a message in the last 24 hours
  let lastMessage = await prismaClient.support.findFirst({
    where: {
      name: payload.client,
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  if (lastMessage) {
    return NextResponse.json(
      {
        message: "You have already sent a message in the last 24 hours",
      },
      {
        status: 400,
      },
    );
  }

  // If the client has not sent a message, send it then
  let res = await prismaClient.support.create({
    data: {
      name: payload.client,
      message: payload.message,
    },
  });

  return NextResponse.json(res);
}
