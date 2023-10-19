import React, { useState } from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import id from "@/utils/id";
import { fr } from "date-fns/locale";
import EdtCourse from "@/components/edt/EdtCourse";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { EdtData } from "@/utils/edt";

interface Props {
  index: number;
  edtData: EdtData;
  date: Date;
  setEdt: (date: Date) => void;
}

export default function EdtContent({
  index,
  edtData,
  date,
  setEdt,
}: Props): React.ReactElement {
  const groupedEvents: { [key: string]: React.ReactNode[] } = {};
  const start = edtData.first.setHours(0, 0, 0, 0);

  for (let day = start; day < edtData.last.getTime(); day += DAY_IN_MS) {
    if (new Date(day).getDay() == 0) {
      continue;
    }
    groupedEvents[day.toString()] = [];
  }

  for (const event of edtData.data) {
    if (event === undefined) continue;

    const courseStart: Date = parseISO(event.DTSTART);
    const courseEnd: Date = parseISO(event.DTEND);
    const dayKey: string = new Date(courseStart)
      .setHours(0, 0, 0, 0)
      .toString();

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
    <div className="absolute w-full h-full text-center">
      <Swiper
        className="h-full w-full left-4 md:left-24"
        initialSlide={index}
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
        onTouchEnd={(swiper) => {
          if (swiper.isEnd) {
            setEdt(new Date(startOfWeek(date).getTime() + DAY_IN_MS * 7));
          }
          if (swiper.isBeginning) {
            setEdt(new Date(endOfWeek(date.getTime() - DAY_IN_MS * 7)));
          }
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
            <SwiperSlide className="border-l border-neutral-800" key={id()}>
              <div className="text-white border-neutral-600">
                <p>{dayString}</p>
                <p className="text-xs text-neutral-600">{dateString}</p>
              </div>
              <div className="flex flex-col items-end">{events}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
