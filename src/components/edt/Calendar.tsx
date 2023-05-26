import React from 'react';
import TimeColumn from '@/components/edt/Calendar/TimeColumn';
import DaysLine from '@/components/edt/Calendar/DaysLine';
import Grid from '@/components/edt/Calendar/Grid';

export default function Calendar(): React.ReactElement {
    return (
        <>
            <TimeColumn />
            <DaysLine />
            < Grid />
        </>
    );
}