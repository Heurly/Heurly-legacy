"use client";
import Actu from "@/components/Actu";
import Card from "@/components/Card";
import Resource from "@/components/resource";
import { SearchContext } from "@/context/search";
import { useContext } from "react";

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

  const { search } = useContext(SearchContext);

  const resources = [
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "lol",
      description: "caca",
      date: "2021-10-10",
    },
    {
      title: "bla",
      description: "ohhhh",
      date: "2021-10-10",
    }];

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">
      <div className="col-span-2">
        <Card>
          <div className="font-extrabold">
            <p style={styles}>
              Actualité du moment :<br />
            </p>
          </div>
          <div className="divide-y divide-gray-500 md:divide-y-2">
            <Actu>
              <div className="flex justify-between font-bold">
                <p style={styles}>Afterwork </p>
                <p style={styles_date}>date</p>
              </div>
              <p style={styles_font}>trop bien sous titre</p>
            </Actu>
            <div className="">
              <Actu>
                <div className="flex justify-between font-bold">
                  <p style={styles}>Afterwork </p>
                  <p style={styles_date}>date</p>
                </div>
                <p style={styles_font}>trop bien sous titre</p>
              </Actu>
            </div>
            <Actu>
              <div className="flex justify-between font-bold">
                <p style={styles}>Afterwork </p>
                <p style={styles_date}>date</p>
              </div>
              <p style={styles_font}>trop bien sous titre</p>
            </Actu>
          </div>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <div className=" row-span-2 col-span-2 font-extrabold">
            Dernières ressources uploadées :<br />
          </div>
          {/*<div className="p-5 grid md:grid-cols-4 grid-cols-2 gap-4">
            {resources &&
              resources
                .filter(
                  (resource) =>
                    resource.title.includes(search) ||
                    resource.description.includes(search)
                )
                .map((resource, key) => (
                  <Resource
                    key={key}
                    title={resource.title}
                    description={resource.description}
                  />
                ))}
                </div>*/}
          voilà
        </Card>
      </div>

      <div className="  grid justify-items-stretch flex items-stretch row-span-2 col-span-1 font-extrabold self-stretch justify-self-strech ">
        <Card>
          Prochain cours :<br />
          <div className="divide-y divide-gray-500 md:divide-y-2">
          <div className="z-10">
          8h
          10h
          </div>
          </div>
          <Card>Mathématiques 2h</Card>
          10h
          <Card>Réseaux 2h</Card>
          12h <br />
          <br />
          13h
          <Card>Geometry 2h</Card>
          15h
          <Card>Machine Learning 2h</Card>
          17h
          
        </Card>
      </div>
    </div>
  );
}
