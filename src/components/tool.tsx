import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Tools({
  imageLink,
  text,
  urlLink,
}: {
  imageLink: string;
  text: string;
  urlLink: string;
}) {
  return (
    <Link href={urlLink}>
      <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
        <div className="">
          <Image
            className=""
            src={imageLink}
            alt={text}
            width={20}
            height={20}
          />
        </div>
        <div className="">
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
}
