import { ReactNode } from "react";

export default function Actu({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <div className=" bg-neutral-950 text-white p-3 ">{children}</div>;
}
