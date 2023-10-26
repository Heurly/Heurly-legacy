import { ReactNode } from "react";

type Props = {
  eventTitle: string;
  date: string;
  description: string;
};

export default function News({
  eventTitle,
  date,
  description,
}: Props): React.ReactElement {
  return (
    <div className="bg-neutral-950 text-white my-4 ">
      <div className="flex justify-between font-bold mt-4">
        <p>{eventTitle}</p>
        <p className="text-white">{date}</p>
      </div>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}
