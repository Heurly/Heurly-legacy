import Image from "next/image";
export default function Resource({
  title,
  description,
  src = "/images/image-placeholder.svg",
}: {
  title: string;
  src?: string;
  description: string;
}): React.ReactElement {
  return (
    <div className="flex flex-col text-white items-center cursor-pointer">
      <div className="p-5 bg-neutral-800 rounded-xl flex items-center justify-center aspect-square md:w-32 md:h-32">
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
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
      </div>
      <p className="text-sm">test</p>
    </div>
  );
}
