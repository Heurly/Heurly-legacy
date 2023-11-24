"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

const today = new Date();

// Fonction pour créer une date avec l'heure spécifiée pour aujourd'hui
const createEventDate = (hours: number, minutes: number) => {
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
  );
};

// Créer des événements
const events = [
  {
    title: "Machine Learning",
    room: "4234",
    start: createEventDate(8, 0), // 8h00
    end: createEventDate(10, 30), // 9h00
  },
  {
    title: "Réseau",
    room: "4234",
    start: createEventDate(10, 30), // 10h30
    end: createEventDate(11, 30), // 11h30
  },
  {
    title: "Algèbre linéaire avancé",
    room: "4234",
    start: createEventDate(12, 30), // 12h30
    end: createEventDate(13, 30), // 13h30
  },
];

function renderEventContent(eventInfo: any) {
  console.log(eventInfo.event);
  return (
    <div
      onClick={() => alert(eventInfo.event.title + " " + eventInfo.timeText)}
      className="cursor-pointer p-5 bg-sky-200 border border-sky-100r rounded-xl text-black flex flex-col items-center justify-center w-full h-full"
    >
      <p className="text-center font-bold">{eventInfo.event.title}</p>
      {/* <p>{eventInfo.timeText}</p> */}
      <p className="text-sm">{eventInfo.event.extendedProps.room}</p>
    </div>
  );
}

export default function Timetable() {
  const calendarRef = useRef(null);

  const handleDateChange = (date: Date) => {
    const newDate = date.toISOString().slice(0, 10);
    const calendarApi = calendarRef?.current?.getApi();
    calendarApi.gotoDate(newDate);
  };

  const goToNextPeriod = () => {
    const calendarApi = calendarRef?.current?.getApi();
    const view = calendarApi.view;

    switch (view.type) {
      case "dayGridMonth":
        calendarApi.next();
        break;
      case "timeGridWeek":
      case "dayGridWeek":
        calendarApi.incrementDate({ weeks: 1 });
        break;
      case "timeGridDay":
      case "dayGridDay":
        calendarApi.incrementDate({ days: 1 });
        break;

      default:
        break;
    }
  };

  const goToPreviousPeriod = () => {
    const calendarApi = calendarRef?.current?.getApi();
    const view = calendarApi.view;

    switch (view.type) {
      case "dayGridMonth":
        calendarApi.prev();
        break;
      case "timeGridWeek":
      case "dayGridWeek":
        calendarApi.incrementDate({ weeks: -1 });
        break;
      case "timeGridDay":
      case "dayGridDay":
        calendarApi.incrementDate({ days: -1 });
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full h-full">
      <Card className="h-full  p-10">
        <CardHeader>
          <div className="flex md:flex-row flex-col justify-between">
            <div className="flex gap-x-3">
              <DatePicker onChange={handleDateChange} />
              <Button
                className="bg-sky-50 text-black"
                onClick={() => handleDateChange(new Date())}
              >
                Aujourd'hui
              </Button>
            </div>
            <div className="flex gap-x-3">
              <Button
                className="bg-sky-50 rounded-full aspect-square p-3"
                onClick={goToPreviousPeriod}
              >
                <ArrowLeft className="h-4 w-4 text-black" />
              </Button>
              <Button
                className="bg-sky-50 rounded-full aspect-square p-3"
                onClick={goToNextPeriod}
              >
                <ArrowRight className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={false}
            events={events}
            eventContent={renderEventContent}
            locale={frLocale}
            weekends={false}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            height="auto"
            aspectRatio={2}
          />
        </CardContent>
      </Card>
    </main>
  );
}
