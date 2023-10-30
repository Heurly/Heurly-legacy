import { News } from "@prisma/client";
import prismaClient from "@/utils/Prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const getAll = searchParams.get("all") ?? false;
  if (getAll) {
    const news: News[] = await prismaClient.news.findMany();
    return Response.json(news);
  } else {
    const news: News[] = await prismaClient.news.findMany({
      take: 3,
    });
    return Response.json(news);
  }
}
