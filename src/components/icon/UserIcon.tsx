import { IconProps } from "@/app/(layoutNavbar)/edt/types";

function UserIcon({ isFill }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      fill={isFill ? "#334155" : "none"}
      viewBox="0 0 33 33"
      data-cy="userIcon"
    >
      <path
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.672"
        d="M26.255 28.053v-2.672a5.344 5.344 0 00-5.344-5.343h-8.015a5.344 5.344 0 00-5.343 5.343v2.672M16.904 14.695a5.343 5.343 0 100-10.687 5.343 5.343 0 000 10.687z"
      ></path>
    </svg>
  );
}

export default UserIcon;
