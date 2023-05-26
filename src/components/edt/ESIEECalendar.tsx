import React from 'react';
import { API_URL } from '@/config';
import CalendarElement from '@/components/edt/CalendarElement';
import TimeColumn from '@/components/edt/TimeColumn';
import DaysLine from '@/components/edt/DaysLine';
import { CourseEvent } from '@/app/(layoutNavBar)/edt/types';

interface Props {
    class: string,
    engGroup?: string,
    managementGroup?: string,
}

async function getEDTData(): Promise<CourseEvent[]> {
    const data = await fetch(API_URL + '/api/edt');
    const resp = await data.json();

    return resp.VCALENDAR[0].VEVENT as CourseEvent[];
}

async function ESIEECalendar(
    props: Props
): Promise<React.ReactElement> {
    var edt = await getEDTData();

    return (
        <div>
            <div className="relative grid grid-cols-7 grid-rows-1 w-full h-full text-center">
                <div className='grid grid-rows-15'>
                    <TimeColumn />
                </div>
                <DaysLine />
                <CalendarElement edtData={edt}/>
            </div>    
        </div>
    );
}

// https://github.com/vercel/next.js/issues/42292
export default ESIEECalendar as unknown as (props: Props) => JSX.Element;