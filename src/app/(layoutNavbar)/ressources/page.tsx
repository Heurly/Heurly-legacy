"use client";
import Resource from "@/components/ressources/resource";
import { SearchContext } from "@/context/search";
import "@/globals.css";
import { useContext } from "react";
import { Storage } from "megajs";
import SearchBar from "@/components/common/search-bar";

async function getAllFiles() {
  const storage = new Storage({
    email: "esiee.ressources@gmail.com",
    password: process.env.MEGA_PASSWORD ?? "", 
  });

  // await storage.ready;
  // storage.once("ready",(
  //   storage.root.children[0].link()
  // ))
}

export default function Hub(): React.ReactElement {


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
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "apagnan",
      description: "feur",
      date: "2021-10-10",
    },
    {
      title: "quoi",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "chocolat",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "quoi",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "chocolat",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "quoi",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "chocolat",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "quoi",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "chocolat",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
  ];
  console.log(search);
  return (
    <div>
      <SearchBar suggestions={[]} tags={[]} resolveSearch={() => {}} />
      <div className="grid md:grid-cols-7 grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
