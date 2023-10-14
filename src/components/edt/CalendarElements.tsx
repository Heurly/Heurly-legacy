"use strict"; // Use strict mode to catch common coding bugs

import React from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { parseISO } from "date-fns";
import id from "@/utils/id";
import cn from "classnames";

export default function CalendarElements({
  edtData,
}: {
  edtData: CourseEvent[];
}): React.ReactElement {
  const groupedEvents: { [key: string]: React.ReactNode[] } = {};
  for (const event of edtData) {
    if (event === undefined) continue;

    const courseStart: Date = parseISO(event.DTSTART);
    const courseEnd: Date = parseISO(event.DTEND);
    const dayKey: string = courseStart.toISOString().split("T")[0];

    if (!groupedEvents[dayKey]) {
      groupedEvents[dayKey] = [];
    }

    const prof = event.DESCRIPTION.match(/[A-Z]* [A-Z]\./);

    const courseElement = (
      <div
        key={id()}
        className={cn(
          "absolute flex flex-col items-center justify-center border text-sm text-ellipsis rounded-xl cursor-pointer w-10/12 md:w-full",
          "bg-neutral-900 text-white border-neutral-600",
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
            ((courseStart.getHours() + courseStart.getMinutes() / 60 - 6) *
              100) /
            (15 - 1)
          }%`,
        }}
      >
        <p>{event.SUMMARY}</p>
        <p className="text-neutral-400">{prof !== null && prof}</p>
        <p className="text-neutral-500">{event.LOCATION}</p>
      </div>
    );

    groupedEvents[dayKey].push(courseElement);
  }
  const sortedGroups = Object.entries(groupedEvents).sort(([aKey], [bKey]) => {
    return new Date(aKey).getTime() - new Date(bKey).getTime();
  });

  return (
    <Swiper
      className="absolute w-full h-full text-center  top-[-100%]"
      slidesPerView={1}
      spaceBetween={0}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
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
      {sortedGroups.map(([dayKey, events]) => (
        <SwiperSlide key={id()} className="border">
          <div className="text-white">{dayKey}</div>
          <div className="flex flex-col items-center">{events}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
