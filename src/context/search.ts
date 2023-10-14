import { createContext } from "react";

export type Search = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchContext = createContext({
  search: "",
} as Search);
