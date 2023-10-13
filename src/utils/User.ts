import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

const prisma = new PrismaClient();

export async function getDbUser(session: Session) {
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  if (user == undefined) {
    await prisma.user.create({
      data: {
        name: session.user.name,
        email: session.user.email!,
        profile: [],
      },
    });
  }

  return user;
}
