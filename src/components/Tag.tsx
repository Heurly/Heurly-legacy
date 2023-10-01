export default function Tag({ text, key }: { text:string, key: number}) {
  return (
    <div className="bg-neutral-800 rounded-lg text-white flex items-center justify-center pr-3" key={key}>
      <span className="text-sm">#{text}</span>
    </div>
  );
}
