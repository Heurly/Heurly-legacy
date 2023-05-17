import cn from "classnames";
import React from "react";

export default function Button(props: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button className={cn("text-white p-3 rounded-lg", props.className)}>
      {props.children}
    </button>
  );
}
