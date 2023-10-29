import News from "@/components/News";
import Card from "@/components/Card";
import type { News as NewsItem } from "@prisma/client";
import { fetchEDTData } from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/utils/AuthOptions";
import { addDays, parseISO } from "date-fns";
import id from "@/utils/id";
import { CourseEvent } from "../edt/types";
import cn from "classnames";
import EdtCourse from "@/components/edt/EdtCourse";
import EdtGrid from "@/components/edt/EdtGrid";
import { getAllNews } from "@/app/actions/news";

export default async function Dashboard(): Promise<React.ReactElement> {
  const session: Session | null = await getServerSession(authOptions);
  const modules = session?.user?.profile?.modules ?? [];

  const ressources_upload = [
    {
      title: "test",
      description: "lorem ipsum",
      date: "2021-10-10",
    },
  ];
  let news: NewsItem[] = [];

  try {
    news = await getAllNews();
  } catch (e) {
    console.log(e);
  }

  // get the cours of the current date
  const currentDate: number = new Date().setHours(0, 0, 0, 0);

  const paramsEDT: ApiFilter<number> = {
    equals: currentDate,
  };

  const edtData: CourseEvent[] = await fetchEDTData(paramsEDT, modules);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 h-full",
        "md:grid md:grid-rows-2 md:grid-flow-col",
      )}
    >
      <Card className="col-span-2">
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

      <Card className="row-span-2 col-span-1">
        <p className="font-extrabold">Prochain cours :</p>
        <div className="relative justify-items-stretch grid h-full">
          <EdtGrid />
          {edtData &&
            edtData.map((event: CourseEvent) => {
              const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);
              const courseStart: Date = parseISO(event.DTSTART);
              const courseEnd: Date = parseISO(event.DTEND);
              return (
                <div className="w-5/6 absolute right-0 h-full" key={id()}>
                  <EdtCourse
                    courseEnd={courseEnd}
                    courseStart={courseStart}
                    event={event}
                    prof={prof}
                  />
                </div>
              );
            })}
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
    </div>
  );
}
