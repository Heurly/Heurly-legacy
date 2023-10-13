import React from "react";

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
      <img src={imageSrc} alt={altText} />
    </button>
  );
}
