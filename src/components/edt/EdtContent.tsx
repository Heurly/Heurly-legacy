import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import id from "@/utils/id";
import { DAY_IN_MS } from "@/app/(layoutNavbar)/edt/const";
import {
  CourseDay,
  EdtData,
  edtToCourseDays,
  fetchEDTData,
  getLocalDayNumber,
} from "@/utils/edt";
import ApiFilter from "@/utils/apiFilter";
import { ModuleChoice } from "@/app/(layoutNavbar)/edt/types";
import { endOfWeek, format, isSameDay, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import Button from "@/components/Button";
import Image from "next/image";
import EdtNav from "@/components/edt/EdtNav";

const SLIDES_MAX = 62;

interface Props {
  initialData: EdtData;
  modules: ModuleChoice[];
}

export type EdtState = {
  begin: number;
  end: number;
  index: number;
};

export default function EdtContent({
  initialData,
  modules,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const [edtState, setEdtState] = useState<EdtState>({
    begin: initialData.first,
    end: initialData.last,
    index: getLocalDayNumber(Date.now()),
  } as EdtState);

  const [courses, setCourses] = useState<CourseDay[]>(
    edtToCourseDays(initialData) as CourseDay[],
  );

  useEffect(() => {
    const previousState = localStorage.getItem("edtState");

    if (previousState != null)
      setEdtState(JSON.parse(previousState) as EdtState);
  }, []);

  useEffect(() => {
    if (modules.length <= 0) return;

    setLoading(true);
    fetchEDTData(
      {
        greater: edtState.begin,
        lower: edtState.end,
      } as ApiFilter<number>,
      modules,
    ).then((data) => {
      const newData: CourseDay[] = edtToCourseDays({
        data: data,
        first: edtState.begin,
        last: edtState.end,
      });

      courses.forEach((c) => {
        if (
          newData.find((e) => isSameDay(e.day, c.day)) == undefined &&
          c.day >= edtState.begin &&
          c.day <= edtState.end
        )
          newData.push(c);
      });

      setCourses(newData);
      setLoading(false);

      localStorage.setItem("edtState", JSON.stringify(edtState));
    });
  }, [modules, edtState.begin, edtState.end]);

  return (
    <div key={id()} className="absolute w-full h-full text-center">
      {loading && (
        <div className="absolute w-full h-full bg-cyan-800 z-10 place-content-center opacity-25" />
      )}
      <Swiper
        className="h-full w-full left-4 md:left-24"
        initialSlide={edtState.index}
        slidesPerView={1}
        spaceBetween={0}
        onSlideChange={(swiper) => {
          if (loading) return;
          if (
            swiper.activeIndex + swiper.slidesPerViewDynamic() ==
            swiper.slides.length
          ) {
            setEdtState({
              begin:
                swiper.slides.length >= SLIDES_MAX
                  ? edtState.begin + DAY_IN_MS * 7
                  : edtState.begin,
              end: edtState.end + DAY_IN_MS * 7,
              index:
                swiper.slides.length >= SLIDES_MAX
                  ? swiper.activeIndex - swiper.slidesPerViewDynamic()
                  : swiper.activeIndex,
            });
          } else if (swiper.activeIndex == 0) {
            setEdtState({
              begin: edtState.begin - DAY_IN_MS * 7,
              end:
                swiper.slides.length >= SLIDES_MAX
                  ? edtState.end - DAY_IN_MS * 7
                  : edtState.end,
              index: 7,
            });
          }
        }}
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
        <SwiperSlide key={id()} className="bg-neutral-600 opacity-30">
          <div className="flex flex-col align-middle justify-center items-center h-full">
            <Image
              src="/images/ChevronLeft.svg"
              alt="edt-left"
              width={64}
              height={64}
            />
          </div>
        </SwiperSlide>
        {courses
          .sort((a, b) => a.day - b.day)
          .map((courseDay) => {
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
        <SwiperSlide key={id()} className="bg-neutral-600 opacity-30">
          <div className="flex flex-col align-middle justify-center items-center h-full">
            <Image
              src="/images/ChevronRight.svg"
              alt="edt-right"
              width={64}
              height={64}
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <EdtNav setEdtState={setEdtState} />
    </div>
  );
}
