import { IconProps } from "@/app/(layoutNavbar)/edt/types";

function LogoutIcon({ isFill }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="33"
      fill={isFill ? "#334155" : "none"}
      viewBox="0 0 34 33"
      data-cy="logoutIcon"
    >
      <path
        stroke="#334155"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.672"
        d="M12.992 28.076H7.65a2.672 2.672 0 01-2.672-2.672V6.702A2.672 2.672 0 017.65 4.03h5.343M22.343 22.732l6.68-6.679-6.68-6.68"
      ></path>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.672"
        d="M29.023 16.053h-16.03"
      ></path>
    </svg>
  );
}

export default LogoutIcon;
