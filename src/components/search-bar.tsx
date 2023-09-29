"use client";
import cn from "classnames";

export default function SearchBar() {
  const isTag = (text: string) => {
    const regex = /#(\w+)/g;
    // if there is a word mathing the regex we put this word in the a tag component
    if (text.match(regex)) {
      const tag = text.match(regex);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "border border-white rounded-lg text-white flex items-center justify-center pr-3"
        )}
      >
        <input
          type="text"
          className="bg-transparent w-full col-span-3 h-full p-3 outline-none"
          placeholder="Rechercher par nom / #tag / filière"
          onChange={(e) => {
            isTag(e.target.value);
          }}
        />
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
      </div>
      <div className="absolute">
        <div className="absolute top-full bg-neutral-600 h-10 w-full p-3">
          test
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
