"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { distance } from "fastest-levenshtein";
import SearchIcon from "@/components/SearchIcon";
import id from "@/utils/id";
import Tag from "@/components/Tag";
import debounce from "@/utils/debounce";

interface Props {
  data: (filter: SuggestionFilter) => Promise<Suggestion[]>;
  resolveSearch: (res: Suggestion) => any;
  tags: string[];
  nbSuggestions?: number;
}

export type SuggestionFilter = {
  tags: string[];
  value: string;
};

export type Suggestion = {
  label: string;
  value: any;
};

const SearchBar: React.FunctionComponent<Props> = ({
  data,
  resolveSearch,
  tags,
  nbSuggestions = 5,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userSuggestionIndex, setUserSuggestionIndex] = useState<number>(0);

  const filterSuggestion = (suggestion: Suggestion) => {
    for (const tag of selectedTags) {
      if (!suggestion.label.includes(tag)) return false;
    }
    return false;
  };

  const sortSuggestion = (suggestion: Suggestion) => {
    const w = searchText.split(" ");
    let res = 0;

    w.forEach((e) =>
      suggestion.label.split(" - ").forEach((el) => (res += distance(e, el))),
    );
    return res;
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    resolveSearch(suggestion);
  };

  const addTag = (tag: string) => {
    setSelectedTags(selectedTags.concat([tag]));
    setSearchText("");
  };
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((e) => e != tag));
  };

  const filterModules = (text: string) =>
    debounce(
      data({ tags: selectedTags, value: text }).then((res) =>
        setSuggestions(res),
      ),
      1500,
    );

  useEffect(() => {
    if (showSuggestions) {
      document.addEventListener("click", () => {
        setShowSuggestions(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setShowSuggestions(false);
        }
        if (e.key === "ArrowDown") {
          setUserSuggestionIndex((prev) => prev + 1);
        }
      });
    }
  }, [showSuggestions]);

  return (
    <div>
      <div className="relative z-10">
        <div
          className={cn(
            "bg-neutral-700 rounded-lg text-neutral-950 flex items-center justify-center pr-3 ","dark:text-white",
            { "rounded-b-none": showSuggestions },
          )}
        >
          <input
            className="bg-transparent w-full col-span-3 h-full p-3 outline-none flex items-center"
            placeholder="Rechercher par nom / #tag / filière"
            value={searchText}
            onChange={(e) => {
              setShowSuggestions(true);
              setSearchText(e.currentTarget.value);
              filterModules(e.currentTarget.value);
            }}
          />
          <SearchIcon />
        </div>
        {showSuggestions && (
          <div className={cn("absolute top-full w-full rounded-b-lg overflow-hidden text-neutral-950","dark:text-white")}>
            <div className={cn("flex p-2 pr-8 bg-neutral-600 text-neutral","text-white")}>
              {showSuggestions &&
                tags &&
                tags
                  .filter(
                    (tag) =>
                      tag.includes(searchText) && !selectedTags.includes(tag),
                  )
                  .sort((tag) =>
                    sortSuggestion({ label: tag, value: undefined }),
                  )
                  .slice(0, 20)
                  .map((tag, index) => (
                    <Tag
                      key={id()}
                      text={tag}
                      onClickCallback={(e) =>
                        addTag(e.currentTarget.innerText.slice(2))
                      }
                    />
                  ))}
            </div>
            <div className="flex-col">
              {showSuggestions &&
                suggestions &&
                suggestions
                  .sort((sugg) => sortSuggestion(sugg))
                  .slice(0, nbSuggestions)
                  .map((suggestion, index) => (
                    <Suggestion
                      key={id()}
                      text={suggestion.label}
                      onClickCallback={() => {
                        handleSuggestionClick(suggestion);
                        setShowSuggestions(false);
                      }}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
      <div className={cn("flex py-2 text-neutral-950 items-center","dark:text-white")}>
        {selectedTags &&
          selectedTags.map((tag) => (
            <div key={id()} className="mr-1">
              <Tag
                key={id()}
                text={tag}
                onClickCallback={(e) =>
                  removeTag(e.currentTarget.innerText.slice(2))
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export function Suggestion({
  text,
  onClickCallback,
}: {
  text: string;
  onClickCallback?: () => void;
}) {
  return (
    <div
      className="bg-neutral-600 h-10 p-3 flex justify-start items-center hover:bg-neutral-700 cursor-pointer"
      onClick={onClickCallback}
    >
      {text}
    </div>
  );
}

export default SearchBar;
