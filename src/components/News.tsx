import id from "@/utils/id";
import { ReactNode } from "react";

type Props = {
  eventTitle: string;
  date: Date;
  description: string;
  key: string;
};

export default function News({
  eventTitle,
  date,
  description,
  key,
}: Props): React.ReactElement {
  return (
    <div className="bg-neutral-950 text-white my-4" key={key}>
      <div className="flex justify-between font-bold mt-4">
        <p>{eventTitle}</p>
        <p className="text-white">{date.toISOString()}</p>
      </div>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}
