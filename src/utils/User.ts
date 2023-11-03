import { Session } from "next-auth";
import prismaClient from "@/utils/Prisma";

export async function getDbUser(session: Session) {
  const user = await prismaClient.user.findFirst({
    where: {
      email: session.user.email!,
    },
  });

  if (user == undefined) {
    await prismaClient.user.create({
      data: {
        name: session.user.name,
        email: session.user.email!,
        profile: [],
      },
    });
  }

  return user;
}
