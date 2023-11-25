import { IconProps } from "@/app/(layoutNavbar)/edt/types";

function TimeTableIcon({ isFill }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="33"
      fill={isFill ? "#334155" : "none"}
      viewBox="0 0 34 33"
      data-cy="timetableIcon"
    >
      <path
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.665"
        d="M26.351 6.207H7.649A2.672 2.672 0 004.977 8.88v18.702a2.672 2.672 0 002.672 2.672h18.702a2.672 2.672 0 002.672-2.672V8.879a2.672 2.672 0 00-2.672-2.672zM22.343 3.535V8.88M11.656 3.535V8.88M4.977 14.222h24.046M11.656 19.566h.014M17 19.566h.013M22.343 19.566h.014M11.656 24.91h.014M17 24.91h.013M22.343 24.91h.014"
      ></path>
    </svg>
  );
}

export default TimeTableIcon;
