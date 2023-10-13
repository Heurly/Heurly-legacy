import id from "@/utils/id";

export default function Tag({
  text,
  onClickCallback,
}: {
  text: string;
  onClickCallback: (e: any) => void;
}) {
  return (
    <div
      className="border border-neutral-600 bg-neutral-950 rounded-lg text-white flex items-center justify-center px-3 py-2 cursor-pointer"
      key={id()}
      onClick={onClickCallback}
    >
      <span className="text-sm font-bold"># {text}</span>
    </div>
  );
}
