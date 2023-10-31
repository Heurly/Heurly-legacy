import id from "@/utils/id";
import cn from "classnames";

export default function Tag({
  text,
  onClickCallback,
}: {
  text: string;
  onClickCallback: (e: any) => void;
}) {
  return (
    <div
      className={cn(
        "border border-neutral-600 bg-gray-200 text-neutral-950 rounded-lg flex items-center justify-center px-3 py-2 cursor-pointer",
        "dark:bg-neutral-950 dark:text-white",
      )}
      key={id()}
      onClick={onClickCallback}
    >
      <span className="text-sm font-bold"># {text}</span>
    </div>
  );
}
