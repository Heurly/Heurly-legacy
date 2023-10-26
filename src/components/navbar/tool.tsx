import React from "react";
import Link from "next/link";
import SvgIcon from "../common/svgIcon";

type Props={
  iconName: string;
  text: string;
  urlLink: string;
}

export default function Tools({
  iconName,
  text,
  urlLink,
}:Props) {
  return (
    <Link href={urlLink}>
      <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
        <div className="">
          <SvgIcon name={iconName} classNameStyle="text-neutral-950"/>
        </div>
        <div className="">
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
}
