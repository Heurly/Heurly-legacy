import React from "react";
import Image from "next/image";

export default function ButtonNavBar({
  onClick,
  imageSrc,
  altText,
}: {
  onClick: () => void;
  imageSrc: string;
  altText: string;
}) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Image src={imageSrc} alt={altText} />
    </button>
  );
}
