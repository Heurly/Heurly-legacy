import { createContext, useState } from "react";

export type Search = {
    search: string;
    setSearch: (search: string) => void;
}



export const SearchContext = createContext({
    search:"",
}as Search)
