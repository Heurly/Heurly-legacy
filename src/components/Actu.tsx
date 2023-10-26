import { ReactNode } from "react";
import cn from "classnames";

export default function Actu({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <div className={cn("bg-gray-200 text-neutral-950  my-4",
   "dark:bg-neutral-950 dark:text-white")}>{children}</div>;
}
