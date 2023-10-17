import { CourseEvent } from "@/app/(layoutNavbar)/edt/types";
import React from "react";
import id from "@/utils/id";
import cn from "classnames";

interface Props {
  courseStart: Date;
  courseEnd: Date;
  event: CourseEvent;
  prof: RegExpMatchArray | null;
}
const EdtCourse: React.FC<Props> = ({
  courseEnd,
  courseStart,
  event,
  prof,
}: Props) => {
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

export default EdtCourse;
