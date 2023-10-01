"use client";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Tag from "./Tag";

enum SuggestionType {
  TAG,
  NAME,
  FILIERE,
}

export default function SearchBar() {
  const isTag = (text: string) => {
    const regex = /#(\w+)/g;
    // if there is a word mathing the regex we put this word in the a tag component
    if (text.match(regex)) {
      const tag = text.match(regex);
    }
  };
  const [isSuggestions, setIsSuggestions] = useState(false);

  const suggestions = [
    {
      text: "#test",
      type: SuggestionType.TAG,
    },
    {
      text: "E4FI",
      type: SuggestionType.FILIERE,
    },
    {
      text: "Algèbre linéaire",
      type: SuggestionType.NAME,
    },
  ];

  useEffect(() => {
    if (isSuggestions) {
      document.addEventListener("click", () => {
        setIsSuggestions(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setIsSuggestions(false);
        }
      });
    }
  }, [isSuggestions]);

  const search = useRef(null);
  return (
    <div className="relative">
      <div
        className={cn(
          "bg-neutral-700 rounded-lg text-white flex items-center justify-center pr-3",
          { "rounded-b-none": isSuggestions }
        )}
        ref={search}
      >
        <div
          className="bg-transparent w-full col-span-3 h-full p-3 outline-none"
          placeholder="Rechercher par nom / #tag / filière"
          contentEditable="true"
          role="textbox"
          onInput={(e) => {
            setIsSuggestions(true);
            // e.currentTarget.textContent = e.currentTarget.textContent.replace(
            //   /#(\w+)/g,
            //   (match, p1) => {
            //     return `<Tag>#${p1}</Tag>`;
            //   }
            // );
          }}
          onFocus={(e)=>{
            e.currentTarget.textContent = ""
          }}
        >
          Recherche par nom / #tag / filière
        </div>
        <SearchIcon />
      </div>
      <div className="absolute top-full w-full rounded-b-lg overflow-hidden text-white">
        {suggestions &&
          isSuggestions &&
          suggestions.map((suggestion) => (
            <Suggestion
              text={suggestion.text}
              type={suggestion.type}
              onClickCallback={() => {
                setIsSuggestions(false);
                if (suggestion.type === SuggestionType.TAG) {
                  console.log("tag");
                  // insert a tag component with the text in the input
                  search.current.value = suggestion.text;
                }
              }}
            />
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
      {text}
    </div>
  );
}

export function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}
