import React from "react";
import Link from "next/link";
import SvgIcon from "../common/svgIcon";
import cn from "classnames";

type Props = {
  iconName: string;
  text: string;
  urlLink: string;
};

export default function Tools({ iconName, text, urlLink }: Props) {
  return (
    <Link href={urlLink}>
      <div className="flex gap-x-3 p-1 rounded-lg hover:bg-neutral-600 transition duration-200 cursor-pointer">
        <div className={cn("text-neutral-950", "dark:text-white")}>
          <SvgIcon name={iconName} classNameStyle="" />
        </div>
        <div className="">
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
}
