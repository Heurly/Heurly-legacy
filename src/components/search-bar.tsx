import React, { useEffect, useRef, useState } from "react";
import Tag from "./Tag";
import cn from "classnames";
import id from "../utils/id";
import SearchIcon from "./SearchIcon";
import {distance} from 'fastest-levenshtein';

export enum SuggestionType {
  TAG,
  NAME,
  MODULE,
}
export type Suggestion = {
  text: string;
  type: SuggestionType;
};

interface Props {
  suggestions: Suggestion[];
  resolveSearch: (s: Suggestion) => void;
  nbSuggestions?: number;
}

const SearchBar: React.FunctionComponent<Props> = ({suggestions, resolveSearch, nbSuggestions = 10}) => {
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [userSuggestionIndex, setUserSuggestionIndex] = useState<number>(0);

  const filterSuggestion = (s: string) => {
    const w = searchText.split(' ');

    for (let i = 0; i < w.length; i++) {
      if (!s.includes(w[i])) return false;
    }

    return true;
  }

  const sortSuggestion = (s: string) => {
    const w = searchText.split(' ');
    let res = 0;

    w.forEach(e => s.split(' - ').forEach(el => res += distance(e, el)));
    return res;
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    resolveSearch(suggestion);
  };

  useEffect(() => {
    if (isSuggestions) {
      document.addEventListener("click", () => {
        setIsSuggestions(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsSuggestions(false);
        }
        if (e.key === "ArrowDown") {
          setUserSuggestionIndex((prev) => prev + 1);
        }
      });
    }
  }, [isSuggestions]);

  return (
    <div>
      <div className="relative z-10">
        <div
          className={cn(
            "bg-neutral-700 rounded-lg text-white flex items-center justify-center pr-3 ",
            { "rounded-b-none": isSuggestions }
          )}
        >
          <input
            className="bg-transparent w-full col-span-3 h-full p-3 outline-none flex items-center"
            placeholder="Rechercher par nom / #tag / filière"
            value={searchText}
            onChange={(e) => {
              setIsSuggestions(true);
              setSearchText(e.currentTarget.value);
            }}
          />
          <SearchIcon />
        </div>
        <div className="absolute top-full w-full rounded-b-lg overflow-hidden text-white">
          {isSuggestions &&
            suggestions &&
            suggestions.filter((sugg) => sugg.text.includes(searchText)) &&
            suggestions
              .filter((sugg) => filterSuggestion(sugg.text))
              .sort((sugg) => sortSuggestion(sugg.text))
              .slice(0, nbSuggestions)
              .map((suggestion, index) => (
                <Suggestion
                  key={index}
                  text={suggestion.text}
                  type={suggestion.type}
                  onClickCallback={() => {
                    handleSuggestionClick(suggestion);
                    setIsSuggestions(false);
                  }}
                />
              ))}
        </div>
      </div>
      <div className="flex py-2">
        {tags &&
          tags.map((tag) => (
            <div className="mr-1">
              <Tag key={id()} text={tag} />
            </div>
          ))}
      </div>
    </div>
  );
}

export function Suggestion({
  text,
  type,
  onClickCallback,
}: {
  text: string;
  type: SuggestionType;
  onClickCallback?: () => void;
}) {
  return (
    <div
      className="bg-neutral-600 h-10 p-3 flex justify-start items-center hover:bg-neutral-700 cursor-pointer"
      onClick={onClickCallback}
    >
      {type == SuggestionType.TAG ? <Tag text={text} key={id()} /> : text}
    </div>
  );
}

export default SearchBar;