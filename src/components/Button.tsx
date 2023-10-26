"use client";
import cn from "classnames";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode | undefined;
  onClick?: () => {} | void;
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "p-3 rounded-lg border-neutral-600 border bg-gray-200 hover:bg-gray-300 transition",
        "dark:border-neutral-600 border bg-neutral-900 hover:bg-neutral-950",
        props.className,
      )}
    >
      {props.children != undefined && props.children}
    </button>
  );
}
