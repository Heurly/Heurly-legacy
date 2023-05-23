import cn from "classnames";
import React from "react";

export default function Button(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button className={cn("p-3 rounded-lg border-gray-600 border-2 bg-black", props.className)}>
      {props.children}
    </button>
  );
}
