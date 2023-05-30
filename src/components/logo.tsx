import cn from "classnames";
export default function Logo(props: {className?: string}){
    return(
        <div className={cn(props.className)}>
            <p className="font-bold">
                ESIEE&nbsp;<span className="bg-white rounded px-1 py-1 text-black">HUB</span>
            </p>
        </div>
    )
}