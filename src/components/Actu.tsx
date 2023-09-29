

export default async function Actu({children}): Promise<React.ReactElement> {

    return (<div className="border-b-2 border-zinc-700 bg-neutral-950 text-white p-3 ">
      {children}
    </div>
    );
  }
  