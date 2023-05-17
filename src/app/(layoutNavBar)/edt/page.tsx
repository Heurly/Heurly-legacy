import ESIEECalendar from '@/components/edt/ESIEECalendar';
import EDTForm from '@/components/edt/EDTForm';

export default function Edt(): React.ReactElement {
    return (
        <>
            <EDTForm></EDTForm>
            <ESIEECalendar class=''></ESIEECalendar>
        </>
    )
}