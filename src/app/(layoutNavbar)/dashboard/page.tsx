import News from "@/components/News";
import Card from "@/components/Card";
import { SearchContext } from "@/context/search";
import { ReactElement, useContext } from "react";
import Resource from "@/components/resources/resource";
import { Search } from "@/context/search";
import type { News as NewsItem } from "@prisma/client";
import { API_URL } from "@/config/const";
export default async function Dashboard(): Promise<React.ReactElement> {
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
  // need to change but work like this
  const resNews = await fetch(`http://localhost:3000/api/news`);
  const news: NewsItem[] = await resNews.json();

  const startHours = 8;
  const endHours = 19;

  const gridEdt: ReactElement[] = [];

  for (let i = startHours; i <= endHours; i++) {
    gridEdt.push(
      <div className="border-t relative h-5 mt-10">
        <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-neutral-950">
          {i}h
        </span>
      </div>,
    );
  }

  return (
    <div className="flex flex-col md:grid grid-rows-2 grid-flow-col gap-4 md:h-[700px] ">
      <Card className="z-20 col-span-2">
        <div className="font-extrabold mb-6">
          <p>Actualité du moment :</p>
        </div>
        <div className="divide-y divide-gray-500 md:divide-y">
          {news.length > 0 ? (
            news.map(({ title, date, description }) => {
              return (
                <News
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

      <Card className="overflow-auto z-20 grid justify-items-stretch row-span-2 col-span-1 font-extrabold self-stretch justify-self-strech ">
        Prochain cours :{gridEdt}
      </Card>
    </div>
  );
}
