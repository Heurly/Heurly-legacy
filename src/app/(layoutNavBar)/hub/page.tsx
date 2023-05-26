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
    },
    {
      title: "lol",
      description: "caca",
    },
    {
      title: "bla",
      description: "ohhhh",
    },
    {
      title: "test",
      description: "test",
    },
    {
      title: "apagnan",
      description: "feur",
    },
    {
      title: "quoi",
      description: "test",
    },
    {
      title: "test",
      description: "chocolat",
    },
    {
      title: "test",
      description: "test",
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
