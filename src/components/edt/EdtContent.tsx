import React, { useState } from "react";
import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { format, parseISO } from "date-fns";
import id from "@/utils/id";
import { fr } from "date-fns/locale";
import EdtCourse from "@/components/edt/EdtCourse";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";

interface Props {
  nbToDisplay: number;
  edtData: CourseEvent[];
  date: Date;
  setEdt: (date: Date) => void;
}

export default function EdtContent({
  nbToDisplay,
  edtData,
  date,
  setEdt,
}: Props): React.ReactElement {
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const groupedEvents: { [key: string]: React.ReactNode[] } = {};

  const weekStart = new Date(date.getTime() - (date.getDay() - 1) * DAY_IN_MS);
  const firstKey = weekStart.setHours(0, 0, 0, 0);

  for (
    let key = firstKey;
    key < firstKey + DAY_IN_MS * nbToDisplay;
    key += DAY_IN_MS
  ) {
    groupedEvents[key] = [];
  }

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
    <div className="absolute w-full h-full text-center">
      <Swiper
        className="h-full w-full left-4 md:left-24"
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
          date.setHours(0, 0, 0, 0);

          if (swiper.activeIndex == slideIdx && swiper.isEnd && end) {
            setEdt(new Date(date.getTime() + DAY_IN_MS * 7));
          }
          if (swiper.activeIndex == slideIdx && swiper.isBeginning && start) {
            setEdt(new Date(date.getTime() - DAY_IN_MS * 7));
          }

          setEnd(swiper.isEnd);
          setStart(swiper.isBeginning);
          setSlideIdx(swiper.activeIndex);
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
