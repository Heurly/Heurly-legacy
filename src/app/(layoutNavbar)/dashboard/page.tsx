import Actu from "@/components/Actu";
import Card from "@/components/Card";
import { SearchContext } from "@/context/search";
import { useContext } from "react";
import Resource from "@/components/resources/resource";
import { Search } from "@/context/search";

export default async function Dashboard(): Promise<React.ReactElement> {
  const styles = {
    marginTop: "0px",
    //marginBottom: '20px',
    //lineHeight: 4,
  };

  const styles_date = {
    color: "rgb(75 85 99)",
    //lineHeight: 4,
  };

  const styles_nextcours = {
    marginLeft: "20px",
  };

  const styles_font = {
    color: "rgb(163 163 163)",
  };

  const ressources_upload = [
    {
      title: "test",
      description: "early ou quoi",
      date: "2021-10-10",
    },
    {
      title: "lol",
      description: "early ou quoi",
      date: "2021-10-10",
    },
    {
      title: "bla",
      description: "ohhhh",
      date: "2021-10-10",
    },
  ];

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 h-[700px] ">
      <Card className="z-20 col-span-2">
        <div className="font-extrabold mb-6 ">
          <p style={styles}>Actualité du moment :</p>
        </div>
        <div className="divide-y divide-gray-500 md:divide-y-2">
          <Actu>
            <div className="flex justify-between font-bold mt-4">
              <p style={styles}>Afterwork </p>
              <p style={styles_date}>date</p>
            </div>
            <p style={styles_font}>trop bien sous titre</p>
          </Actu>
          <Actu>
            <div className="flex justify-between font-bold mt-4">
              <p style={styles}>Afterwork </p>
              <p style={styles_date}>date</p>
            </div>
            <p style={styles_font}>trop bien sous titre</p>
          </Actu>
          <Actu>
            <div className="flex justify-between font-bold mt-4">
              <p style={styles}>Afterwork </p>
              <p style={styles_date}>date</p>
            </div>
            <p style={styles_font}>trop bien sous titre</p>
          </Actu>
        </div>
      </Card>

      <div className="col-span-2 flex items-stretch">
        <Card className=" self-stretch flex-auto">
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
        </Card>
      </div>

      <Card className="overflow-auto z-20 grid justify-items-stretch row-span-2 col-span-1 font-extrabold self-stretch justify-self-strech ">
        Prochain cours :
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-gray-200 dark:bg-neutral-950">
            8h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-gray-200 dark:bg-neutral-950">
            9h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-gray-200 dark:bg-neutral-950">
            10h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-25px] left-[10px] py-2 px-3 bg-gray-200 dark:bg-neutral-950">
            11h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            12h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            13h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            14h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            15h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            16h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            17h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            18h
          </span>
        </div>
        <div className="border-t relative h-5 mt-10">
          <span className="absolute top-[-30px] left-[10px] py-5 px-3 bg-gray-200 dark:bg-neutral-950">
            19h
          </span>
        </div>
        <div className="border-t relative mt-10">
          <span className="absolute top-[-20px] left-[10px] py-2 px-3 bg-gray-200 dark:bg-neutral-950">
            20h
          </span>
        </div>
      </Card>
    </div>
  );
}
