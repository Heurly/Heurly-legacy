"use client"
import cn from "classnames";
import React from "react";

export default function Button(props: {
  className?: string;
  children: React.ReactNode;
  onClick: () => {}
}) {
  return (
    <button onClick={props.onClick} className={cn("p-3 rounded-lg border-neutral-600 border bg-neutral-900 hover:bg-neutral-950 transition", props.className)}>
      {props.children}
    </button>
  );
}
