import React from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { format, parseISO } from "date-fns";
import id from "@/utils/id";
import cn from "classnames";
import { fr } from "date-fns/locale";
import EdtCourse from "@/components/edt/EdtCourse";

interface Props {
  edtData: CourseEvent[];
  setEdt: (date: Date) => void;
}

export default function EdtContent({
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
      <EdtCourse
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
