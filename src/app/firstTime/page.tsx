import Image from "next/image";

export default function FirstTime() {
  return (
    <div className="flex items-center justify-center h-full relative">
      <div className="bg-black w-screen h-[50vh] absolute bottom-0 -z-20  items-start justify-center">
        <div className=" -mt-20 flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-3xl md:text-4xl font-black text-center text-black">
            C'est la première fois ?
          </h1>
          <div className="border-black border-4 rounded-xl flex bg-white pr-3 md:w-96">
            <input
              type="text"
              className="p-3 outline-none w-full rounded-l-xl"
            />
            <Image
              src="/images/search.svg"
              alt="search"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
