

export default async function Card({children}): Promise<React.ReactElement> {

    return (<div className=" border border-neutral-600 bg-neutral-950 text-white rounded-[15px] p-7">

      {children}
    </div>
  
    );
  }
  