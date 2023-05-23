import Image from "next/image";
export default function SearchBar({
  placeholder = "Rechercher",
}: {
  placeholder?: string;
}) {
  return (
    <div className="border-black border-4 rounded-xl flex bg-white pr-3 w-full max-w-2xl">
      <input
        type="text"
        className="p-3 outline-none w-full rounded-l-xl"
        placeholder={placeholder}
      />
      <Image src="/images/search.svg" alt="search" width={30} height={30} />
    </div>
  );
}
