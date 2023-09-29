export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-800 rounded-lg text-white flex items-center justify-center pr-3 ">
      <p className="text-sm">#{children}</p>
    </div>
  );
}
