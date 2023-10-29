import News from "@/components/News";
import Card from "@/components/Card";
import { ReactElement } from "react";
import type { News as NewsItem } from "@prisma/client";
import { fetchEDTData } from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { subDays, addDays, parseISO } from "date-fns";
import { API_URL } from "@/config/const";
import id from "@/utils/id";
import { CourseEvent } from "../edt/types";
import cn from "classnames";
import { ca } from "date-fns/locale";

export default async function Dashboard(): Promise<React.ReactElement> {
  const session: Session | null = await getServerSession(authOptions);
  const modules = session?.user?.profile?.modules ?? [];

  const ressources_upload = [
    {
      title: "test",
      description: "lorem ipsum",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "lorem ipsum",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "lorem ipsum",
      date: "2021-10-10",
    },
  ];
  let news: NewsItem[] = [];
  try {
    const resNews = await fetch(`http://localhost/api/news`);
    news = await resNews.json();
  } catch (e) {
    console.log(e);
  }

  const startHours = 8;
  const endHours = 19;

  const gridEdt: ReactElement[] = [];

  for (let i = startHours; i <= endHours; i++) {
    gridEdt.push(
      <div className="border relative">
        <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-neutral-950">
          {i}h
        </span>
      </div>,
    );
  }
  // get the cours of the current date
  const currentDate: Date = new Date();
  const currentDatePlusOneDay = addDays(currentDate.setHours(0, 0, 0, 0), 1);

  const paramsEDT: ApiFilter<number> = {
    equals: currentDatePlusOneDay.getTime(),
  };

  const edtData: CourseEvent[] = await fetchEDTData(paramsEDT, modules);

  return (
    <div className="flex flex-col md:grid grid-rows-2 grid-flow-col gap-4 md:h-[90svh]">
      <Card className="z-20 col-span-2">
        <div className="font-extrabold mb-6">
          <p>Actualité du moment :</p>
        </div>
        <div className="divide-y divide-gray-500 md:divide-y">
          {news && news.length > 0 ? (
            news.map(({ title, date, description }) => {
              return (
                <News
                  key={id()}
                  eventTitle={title}
                  date={date}
                  description={description}
                />
              );
            })
          ) : (
            <p>Aucune actualité pour le moment</p>
          )}
        </div>
      </Card>
      {/* -------------------------- FOR VERSION 0.3 -------------------------------- */}
      {/* <Card className=" self-stretch flex-auto col-span-2 flex items-stretch">
        <div className="font-extrabold mb-8 mt-4">
          Dernières ressources uploadées :<br />
        </div>
        <div className=" grid md:grid-cols-4 justify-self-start">
          {ressources_upload &&
            ressources_upload.map((resource, key) => (
              <Resource
                key={key}
                title={resource.title}
                description={resource.description}
              />
            ))}
        </div>
      </Card> */}
      {/* -------------------------- FOR VERSION 0.3 -------------------------------- */}

      <Card className="row-span-2 col-span-1">
        <p className="font-extrabold">Prochain cours :</p>
        <div className="relative justify-items-stretch grid border border-red-600 h-full">
          {gridEdt}
          {edtData &&
            edtData.map((event: CourseEvent) => {
              const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
              const courseStart: Date = parseISO(event.DTSTART);
              const courseEnd: Date = parseISO(event.DTEND);
              return (
                <div
                  key={id()}
                  className={cn(
                    "absolute flex flex-col items-center justify-center border text-ellipsis rounded-xl cursor-pointer w-10/12 md:w-5/6 z-20 right-0",
                    "bg-neutral-950 text-white border-neutral-600 -translate-x-4 md:-translate-x-0",
                  )}
                  style={{
                    height: `${
                      ((courseEnd.getHours() +
                        courseEnd.getMinutes() / 60 -
                        (courseStart.getHours() +
                          courseStart.getMinutes() / 60)) *
                        100) /
                        15 +
                      1
                    }%`,
                    top: `${
                      ((courseStart.getHours() -
                        2 +
                        courseStart.getMinutes() / 60 -
                        6) *
                        100) /
                      (15 - 1)
                    }%`,
                  }}
                >
                  <div style={{ fontSize: "80%" }}>{event.SUMMARY}</div>
                  <div className="text-neutral-400" style={{ fontSize: "60%" }}>
                    {prof !== null && prof}
                  </div>
                  <div className="text-neutral-500" style={{ fontSize: "60%" }}>
                    {event.LOCATION}
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
