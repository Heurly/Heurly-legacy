"use client";
import Resource from "@/components/resource";
import { SearchContext } from "@/context/search";
import "@/globals.css";
import { useContext } from "react";

export default function Hub(): React.ReactElement {
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
  ];
  console.log(search);
  return (
    <div className="p-5 grid md:grid-cols-4 grid-cols-2 gap-4">
      {resources &&
        resources
          .filter(
            (resource) =>
              resource.title.includes(search) ||
              resource.description.includes(search)
          )
          .map((resource) => (
            <Resource
              title={resource.title}
              description={resource.description}
            />
          ))}
    </div>
  );
}
