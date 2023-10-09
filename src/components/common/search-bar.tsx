'use client'
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import {distance} from 'fastest-levenshtein';
import SearchIcon from "@/components/SearchIcon";
import id from "@/utils/id";
import Tag from "@/components/Tag";

interface Props {
  suggestions: string[];
  tags: string[];
  resolveSearch: (s: string) => void;
  nbSuggestions?: number;
}

const SearchBar: React.FunctionComponent<Props> = ({suggestions, tags, resolveSearch, nbSuggestions = 5}) => {
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userSuggestionIndex, setUserSuggestionIndex] = useState<number>(0);

  const filterSuggestion = (suggestion: string) => {
    for (const tag of selectedTags) {
      if (!suggestion.includes(tag)) return false;
    }
    for (const word of searchText.split(/[ ,]+/)) {
      if (suggestion.includes(word)) {
        return true;
      }
    }

    return false;
  }

  const sortSuggestion = (s: string) => {
    const w = searchText.split(' ');
    let res = 0;

    w.forEach(e => s.split(' - ').forEach(el => res += distance(e, el)));
    return res;
  }

  const handleSuggestionClick = (suggestion: string) => {
    resolveSearch(suggestion);
  };

  const addTag = (tag: string) => {
    setSelectedTags(selectedTags.concat([tag]));
    setSearchText('');
  }
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(e => e != tag));
  }

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
        {isSuggestions && (<div className="absolute top-full w-full rounded-b-lg overflow-hidden text-white">
          <div className="flex p-2 pr-8 bg-neutral-600 text-white">
            {isSuggestions &&
                tags &&
                tags
                    .filter((tag) => tag.includes(searchText) && !selectedTags.includes(tag))
                    .sort((tag) => sortSuggestion(tag))
                    .slice(0, nbSuggestions)
                    .map((tag, index) => (
                        <Tag
                            key={id()}
                            text={tag}
                            onClickCallback={(e) => addTag(e.currentTarget.innerText.slice(2))}
                        />
                    ))
            }
          </div>
          <div className="flex-col">
            {isSuggestions &&
                suggestions &&
                suggestions
                    .filter((sugg) => filterSuggestion(sugg))
                    .sort((sugg) => sortSuggestion(sugg))
                    .slice(0, nbSuggestions)
                    .map((suggestion, index) => (
                        <Suggestion
                            key={id()}
                            text={suggestion}
                            onClickCallback={() => {
                              handleSuggestionClick(suggestion);
                              setIsSuggestions(false);
                            }}
                        />
                    ))}
          </div>
        </div>)}
      </div>
      <div className="flex py-2 text-white items-center">
        {selectedTags &&
            selectedTags.map((tag) => (
            <div key={id()} className="mr-1">
              <Tag key={id()} text={tag} onClickCallback={(e) => removeTag(e.currentTarget.innerText.slice(2))} />
            </div>
          ))}
      </div>
    </div>
  );
}

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