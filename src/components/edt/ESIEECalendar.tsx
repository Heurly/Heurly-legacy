import React from 'react';

async function getEDTData() {
    const data = await fetch('/api/edt');
    const resp = data.json();

    return resp;
}

export default function ESIEECalendar(
    props: {
        class: string,
        engGroup?: string,
        managementGroup?: string,
    } 
): React.ReactElement {
    return (
        <>
            <h1>Emploi du temps</h1>
            <div>{getEDTData()}</div>
        </>
    );
}