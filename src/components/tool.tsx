import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Tools({ imageLink, text, urlLink }: { imageLink: string; text: string; urlLink:string }) {
  return (
    <Link href={urlLink}> 
        <div className="flex justify-between items-center cursor-pointer"> 
            <div className="">
                <p>{text}</p>
            </div>
            <div className="">
                <Image className="" src={imageLink} alt={text} width={20} height={20} />
            </div>
        </div>
    </Link>
  );
}