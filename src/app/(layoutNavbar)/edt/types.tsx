export interface CourseEvent {
    DTSTART: string;
    DTEND: string;
    SUMMARY: string;
    LOCATION: string;
    DESCRIPTION: string;
}
  
export interface Calendar {
    VCALENDAR: {
      VEVENT: Event[];
    }[];
}