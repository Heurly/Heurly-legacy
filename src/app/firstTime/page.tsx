import SearchBar from "@/components/search-bar";
import Image from "next/image";

export default function FirstTime() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-black w-screen h-[50vh] absolute bottom-0  items-start justify-center">
        <div className=" -mt-20 flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-3xl md:text-4xl font-black text-center text-black">
            C&apos;est la première fois ?
          </h1>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
