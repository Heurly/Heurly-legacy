"use server";
import prismaClient from "@/utils/Prisma";
import { News } from "@prisma/client";

export async function getAllNews(take: number = 3): Promise<News[]> {
  const news: News[] = await prismaClient.news.findMany({
    take: take,
    orderBy: {
      date: "desc",
    },
  });
  return news;
}
