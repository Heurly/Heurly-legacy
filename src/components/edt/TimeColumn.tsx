import React from "react";

export default function TimeColumn(): React.ReactElement {
    var timestamps: string[] = [];

    for (var i = 7; i <= 20; i++) {
        timestamps.push(i.toString() + ":00");
    }

    return (
        <>
            <div>
                Heure
            </div>
            {timestamps.map((timestamp: string, key: any) => {
                return (
                <>
                <div key={key}>
                    {timestamp}
                </div>
                </>
                )}
            )}
        </>
    );
}