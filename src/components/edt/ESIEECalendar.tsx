import React from 'react';
import { API_URL } from '@/config';
import CalendarElement from '@/components/edt/CalendarElement';
import TimeColumn from '@/components/edt/TimeColumn';

async function getEDTData(): Promise<Record<string, any>> {
    const data = await fetch(API_URL + '/api/edt');
    const resp = await data.json();
    return resp;
}

export default async function ESIEECalendar(
    props: {
        class: string,
        engGroup?: string,
        managementGroup?: string,
    } 
): Promise<React.ReactElement> {
    var edt = await getEDTData();

    return (
        <div>
            <div className="relative grid grid-cols-7 grid-rows-1 w-full h-full">
                <div className='grid grid-rows-15'>
                    <p>Heure</p>
                    <TimeColumn />
                </div>
                <div>Lundi</div>
                <div>Mardi</div>
                <div>Mercredi</div>
                <div>Jeudi</div>
                <div>Vendredi</div>
                <div>Samedi</div>
                <CalendarElement edtData={edt.VCALENDAR[0].VEVENT}/>
            </div>    
        </div>
    );
}