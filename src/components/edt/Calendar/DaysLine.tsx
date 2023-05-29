import { DAYS } from "@/app/(layoutNavBar)/edt/const";

export default function DaysLine(): React.ReactElement {
    return (
    <>
        {DAYS.map((day: string, key: any) => {
            return (
            <>
                <div key={key} className="border m-0 p-0 text-white">
                    {day}
                </div>
            </>
            );
        })}
    </>
    );
}