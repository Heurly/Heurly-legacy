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
    <div className="rounded-xl bg-neutral-700 border-2 border-neutral-600 grid grid-rows-[1fr_40px] cursor-pointer aspect-square w-48 md:w-72 justify-self-center">
      <div className="flex items-center justify-center">
        <Image src={src} alt="image de title" width={50} height={50} />
      </div>
      <div className="text-center text-white p-3 w-full">{title}</div>
    </div>
  );
}
