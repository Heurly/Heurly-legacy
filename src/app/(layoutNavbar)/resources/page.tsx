import Resource from "@/components/resources/resource";
import { SearchContext } from "@/context/search";
import "@/globals.css";
import { useContext } from "react";
import SearchBar from "@/components/common/search-bar";
import { PrismaClient } from "@prisma/client";
import AddRessourceForm from "@/components/resources/addRessourceForm";



export default function Hub(): React.ReactElement {
  const resources = [
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
    {
      title: "test",
      description: "test",
      date: "2021-10-10",
    },
  ];

  return (
    <div>
      {/* <SearchBar suggestions={[]} tags={[]} resolveSearch={() => {}} /> */}
      <div className="grid md:grid-cols-7 grid-cols-2 gap-4">
        {resources &&
          resources.map((resource, key) => (
            <Resource
              key={key}
              title={resource.title}
              description={resource.description}
            />
          ))}
      </div>
      <AddRessourceForm />
    </div>
  );
}
