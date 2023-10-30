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
        "relative border border-neutral-600 bg-neutral-950 text-white rounded-[15px] p-7 h-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
