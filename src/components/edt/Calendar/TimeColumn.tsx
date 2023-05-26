import React from "react";

export default function TimeColumn(): React.ReactElement {
    var timestamps: string[] = [];

    for (var i = 7; i <= 20; i++) {
        timestamps.push(i.toString() + ":00");
    }

    return (
        <div className='grid grid-rows-15'>
            <div className="border-2 m-0 p-0">
                Heure
            </div>
            {timestamps.map((timestamp: string, key: any) => {
                return (
                <>
                <div key={key} className="border-2 m-0 p-0">
                    {timestamp}
                </div>
                </>
                )}
            )}
        </div>
    );
}