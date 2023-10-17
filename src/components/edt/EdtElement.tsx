import React from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { format, parseISO } from "date-fns";
import id from "@/utils/id";
import cn from "classnames";
import { fr } from "date-fns/locale";

interface Props {
  edtData: CourseEvent[];
  setEdt: (date: Date) => void;
}

export default function EdtElement({
  edtData,
  setEdt,
}: Props): React.ReactElement {
  const groupedEvents: { [key: string]: React.ReactNode[] } = {};
  for (const event of edtData) {
    if (event === undefined) continue;

    const courseStart: Date = parseISO(event.DTSTART);
    const courseEnd: Date = parseISO(event.DTEND);
    const dayKey: string = new Date(courseStart)
      .setHours(0, 0, 0, 0)
      .toString();

    if (!groupedEvents[dayKey]) {
      groupedEvents[dayKey] = [];
    }

    const prof: RegExpMatchArray | null =
      event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);

    const courseElement = (
      <CourseElement
        courseStart={courseStart}
        courseEnd={courseEnd}
        prof={prof}
        event={event}
      />
    );

    groupedEvents[dayKey].push(courseElement);
  }
  const sortedGroups = Object.entries(groupedEvents).sort(([aKey], [bKey]) => {
    return parseInt(aKey) - parseInt(bKey);
  });

  return (
    <Swiper
      className={cn(
        "absolute w-full h-full text-center top-[-100%]",
        "lg:left-[14.28571428571429%] lg:w-full",
        "md:w-3/4 md:left-[12.3%]",
      )}
      slidesPerView={1}
      spaceBetween={0}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 0,
        },
      }}
    >
      {sortedGroups.map(([dayKey, events]) => {
        const dayString = format(new Date(parseInt(dayKey)), "EEEE", {
          locale: fr,
        });
        const dateString = format(new Date(parseInt(dayKey)), "dd/MM/yy", {
          locale: fr,
        });
        return (
          <SwiperSlide key={id()}>
            <div className="text-white">
              <p>{dayString}</p>
              <p className="text-xs text-neutral-600">{dateString}</p>
            </div>
            <div className="flex flex-col items-end">{events}</div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
interface CourseElementProps {
  courseStart: Date;
  courseEnd: Date;
  event: CourseEvent;
  prof: RegExpMatchArray | null;
}
const CourseElement: React.FC<CourseElementProps> = ({
  courseEnd,
  courseStart,
  event,
  prof,
}: CourseElementProps) => {
  return (
    <div
      key={id()}
      className={cn(
        "absolute flex flex-col items-center justify-center border  text-ellipsis rounded-xl cursor-pointer w-10/12 md:w-full z-20",
        "bg-neutral-950 text-white border-neutral-600",
      )}
      style={{
        height: `${
          ((courseEnd.getHours() +
            courseEnd.getMinutes() / 60 -
            (courseStart.getHours() + courseStart.getMinutes() / 60)) *
            100) /
            15 +
          1
        }%`,
        top: `${
          ((courseStart.getHours() + courseStart.getMinutes() / 60 - 6) * 100) /
          (15 - 1)
        }%`,
      }}
    >
      <div style={{ fontSize: "80%" }}>{event.SUMMARY}</div>
      <div className="text-neutral-400" style={{ fontSize: "60%" }}>
        {prof !== null && prof}
      </div>
      <div className="text-neutral-500" style={{ fontSize: "60%" }}>
        {event.LOCATION}
      </div>
    </div>
  );
};
