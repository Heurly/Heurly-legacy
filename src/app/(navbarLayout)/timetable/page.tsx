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
import CalendarApi from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
} from "date-fns";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

const today = new Date();

const createEventDate = (dayOffset: number, hours: number, minutes: number) => {
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + dayOffset,
    hours,
    minutes,
  );
};

const events = [
  // Lundi
  {
    title: "Algèbre linéaire avancé",
    room: "4234",
    start: createEventDate(-4, 8, 0),
    end: createEventDate(-4, 10, 30),
  },
  {
    title: "Programmation Fonctionnelle",
    room: "4234",
    start: createEventDate(-4, 11, 0),
    end: createEventDate(-4, 18, 30),
  },
  // Mardi
  {
    title: "Machine Learning",
    room: "4234",
    start: createEventDate(-3, 8, 0),
    end: createEventDate(-3, 10, 0),
  },
  {
    title: "Systèmes Distribués",
    room: "4234",
    start: createEventDate(-3, 10, 30),
    end: createEventDate(-3, 16, 0),
  },
  // Ajoutez d'autres jours et cours ici
];

function renderEventContent(eventInfo: any) {
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
  const calendarRef = useRef<FullCalendar>(null);
  const [periodDisplay, setPeriodDisplay] = useState("");
  const [initialView, setInitialView] = useState("timeGridWeek");

  const handleDateChange = (date: Date) => {
    const newDate = date.toISOString().slice(0, 10);
    if (calendarRef.current) calendarRef.current.getApi().gotoDate(newDate);
  };

  const updatePeriodDisplay = (view: any) => {
    let display = "";
    if (view.type.includes("Week")) {
      const start = startOfWeek(view.currentStart, { weekStartsOn: 1 });
      display = `Semaine du ${format(start, "dd/MM/yyyy", { locale: fr })}`;
    } else if (view.type.includes("Day")) {
      display = `Jour du ${format(view.currentStart, "dd/MM/yyyy", {
        locale: fr,
      })}`;
    } else if (view.type.includes("Month")) {
      display = `Mois de ${format(view.currentStart, "MMMM yyyy", {
        locale: fr,
      })}`;
    }
    setPeriodDisplay(display);
  };
  const goToNextPeriod = () => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
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
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
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

  const onDatesSet = (info: any) => {
    updatePeriodDisplay(info.view);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth < 768;
      setInitialView(isMobile ? "timeGridDay" : "timeGridWeek");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Force la mise à jour de la vue de FullCalendar
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(initialView);
    }
  }, [initialView]);

  return (
    <main className="w-full h-full">
      <Card className="h-full p-10">
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

            <div className="flex gap-x-3 items-center">
              {periodDisplay}
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

        <CardContent className="h-[97%]">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView={initialView}
            headerToolbar={false}
            events={events}
            eventContent={renderEventContent}
            locale={frLocale}
            weekends={true}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            height={"90%"}
            contentHeight="100%"
            aspectRatio={1.5}
            datesSet={onDatesSet}
          />
        </CardContent>
      </Card>
    </main>
  );
}
