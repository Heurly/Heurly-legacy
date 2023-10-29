import id from "@/utils/id";
import { format } from "date-fns";
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
  const formatDate = format(date, "dd/MM/yyyy");

  return (
    <div className="bg-neutral-950 text-white my-4" key={key}>
      <div className="flex justify-between font-bold mt-4">
        <p>{eventTitle}</p>
        <p className="text-white">{formatDate}</p>
      </div>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}
