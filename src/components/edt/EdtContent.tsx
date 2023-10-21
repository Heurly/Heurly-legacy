import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import id from "@/utils/id";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import { CourseDay, EdtData, edtToCourseDays, fetchEDTData } from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import Button from "@/components/Button";
import EdtCourse from "@/components/edt/EdtCourse";
import { Swiper as SwiperInterface } from "swiper";

interface Props {
  initialData: EdtData;
  modules: ModuleChoice[];
}

export default function EdtContent({
  initialData,
  modules,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseDay[]>(
    edtToCourseDays(initialData),
  );
  const [firstDay, setFirstDay] = useState<number>(initialData.first);
  const [lastDay, setLastDay] = useState<number>(initialData.last);

  useEffect(() => {
    if (modules.length <= 0) return;

    setLoading(true);
    fetchEDTData(
      {
        greater: firstDay,
        lower: lastDay,
      } as ApiFilter<number>,
      modules,
    ).then((data) => {
      const newData: CourseDay[] = [];
      edtToCourseDays({
        data: data,
        first: firstDay,
        last: lastDay,
      }).forEach((c) => {
        if (courses.find((e) => e.day === c.day) == undefined) newData.push(c);
      });
      setCourses(courses.concat(newData));
      setLoading(false);
    });
  }, [modules, firstDay, lastDay]);

  return (
    <div key={id()} className="absolute w-full h-full text-center">
      {loading && (
        <div className="absolute w-full h-full bg-cyan-800 z-10 place-content-center opacity-25" />
      )}
      <Swiper
        className="h-full w-full left-4 md:left-24"
        initialSlide={((lastDay - firstDay) % DAY_IN_MS) - 6}
        slidesPerView={1}
        spaceBetween={0}
        onReachEnd={() => setLastDay(lastDay + DAY_IN_MS * 7)}
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
        keyboard
      >
        {courses
          .sort((a, b) => a.day - b.day)
          .map((courseDay, index) => {
            const dayString = format(new Date(courseDay.day), "EEEE", {
              locale: fr,
            });
            const dateString = format(new Date(courseDay.day), "dd/MM/yy", {
              locale: fr,
            });
            return (
              <SwiperSlide key={id()} className="border-l border-neutral-800">
                <div className="text-white border-neutral-600">
                  <p>{dayString}</p>
                  <p className="text-xs text-neutral-600">{dateString}</p>
                </div>
                <div className="flex flex-col items-end">
                  {courseDay.courses}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
