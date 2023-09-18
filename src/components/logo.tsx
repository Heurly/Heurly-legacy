import cn from "classnames";
import Link from "next/link";
export default function Logo(props: {className?: string}){
    return(
        <Link href="/dashboard">
            <div className={cn(props.className)}>
                <p className="font-bold text-3xl">
                    ESIEE&nbsp;<span className="bg-white rounded px-1 py-1 text-black">HUB</span>
                </p>
            </div>
        </Link>
    )
}