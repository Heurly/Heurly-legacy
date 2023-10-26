import cn from "classnames";
export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "relative border border-neutral-600 bg-gray-200 text-neural-950 rounded-[15px] p-7",
        "dark:bg-neutral-950 dark:text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
