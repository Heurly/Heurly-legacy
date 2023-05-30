import Image from "next/image";
import { useContext } from "react";
import { SearchContext } from "@/context/search";

export default function SearchBar({
  placeholder = "Rechercher",
}: {
  placeholder?: string;
}) {

  const { search, setSearch } = useContext(SearchContext);
  return (

    <div className="border-neutral-600 border rounded-xl flex bg-transparent pr-3 w-full max-w-2xl">
      <input
        type="text"
        className="p-3 outline-none w-full rounded-l-xl bg-transparent"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Image src="/images/search.svg" alt="search" width={30} height={30} />
    </div>
  );
}
