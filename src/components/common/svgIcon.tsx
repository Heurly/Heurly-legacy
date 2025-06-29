import React, { SVGProps } from "react";
import classNames from "classnames";

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  name: string;
  classNameStyle: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, classNameStyle }) => {
  const svgClassName = classNames(classNameStyle);
  //To add your svg icon,
  //please create a case with name of the icon,
  //and add className={svgClassName} in your svg code for the style of svg
  switch (name) {
    case "dashboard":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 5.5C9.01664 5.5 7.5666 5.93987 6.33323 6.76398C5.09986 7.58809 4.13856 8.75943 3.57091 10.1299C3.00325 11.5003 2.85472 13.0083 3.14411 14.4632C3.4335 15.918 4.14781 17.2544 5.1967 18.3033C6.2456 19.3522 7.58197 20.0665 9.03683 20.3559C10.4917 20.6453 11.9997 20.4968 13.3701 19.9291C14.7406 19.3614 15.9119 18.4001 16.736 17.1668C17.5601 15.9334 18 14.4834 18 13H10.5V5.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 10H21C21 8.01088 20.2098 6.10322 18.8033 4.6967C17.3968 3.29018 15.4891 2.5 13.5 2.5V10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "edt":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.75 1.5V3.75M15.25 1.5V3.75M1 17.25V6C1 5.40326 1.23705 4.83097 1.65901 4.40901C2.08097 3.98705 2.65326 3.75 3.25 3.75H16.75C17.3467 3.75 17.919 3.98705 18.341 4.40901C18.7629 4.83097 19 5.40326 19 6V17.25M1 17.25C1 17.8467 1.23705 18.419 1.65901 18.841C2.08097 19.2629 2.65326 19.5 3.25 19.5H16.75C17.3467 19.5 17.919 19.2629 18.341 18.841C18.7629 18.419 19 17.8467 19 17.25M1 17.25V9.75C1 9.15326 1.23705 8.58097 1.65901 8.15901C2.08097 7.73705 2.65326 7.5 3.25 7.5H16.75C17.3467 7.5 17.919 7.73705 18.341 8.15901C18.7629 8.58097 19 9.15326 19 9.75V17.25M10 11.25H10.008V11.258H10V11.25ZM10 13.5H10.008V13.508H10V13.5ZM10 15.75H10.008V15.758H10V15.75ZM7.75 13.5H7.758V13.508H7.75V13.5ZM7.75 15.75H7.758V15.758H7.75V15.75ZM5.5 13.5H5.508V13.508H5.5V13.5ZM5.5 15.75H5.508V15.758H5.5V15.75ZM12.25 11.25H12.258V11.258H12.25V11.25ZM12.25 13.5H12.258V13.508H12.25V13.5ZM12.25 15.75H12.258V15.758H12.25V15.75ZM14.5 11.25H14.508V11.258H14.5V11.25ZM14.5 13.5H14.508V13.508H14.5V13.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "forum":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.25 7.011C20.134 7.295 20.75 8.139 20.75 9.108V13.394C20.75 14.53 19.903 15.494 18.77 15.587C18.43 15.614 18.09 15.639 17.75 15.659V18.75L14.75 15.75C13.396 15.75 12.056 15.695 10.73 15.587C10.4413 15.5637 10.1605 15.4813 9.905 15.345M19.25 7.011C19.0955 6.96127 18.9358 6.92939 18.774 6.916C16.0959 6.69368 13.4041 6.69368 10.726 6.916C9.595 7.01 8.75 7.973 8.75 9.108V13.394C8.75 14.231 9.21 14.974 9.905 15.345M19.25 7.011V5.137C19.25 3.516 18.098 2.111 16.49 1.902C14.4208 1.63379 12.3365 1.49951 10.25 1.5C8.135 1.5 6.052 1.637 4.01 1.902C2.402 2.111 1.25 3.516 1.25 5.137V11.363C1.25 12.984 2.402 14.389 4.01 14.598C4.587 14.673 5.167 14.738 5.75 14.792V19.5L9.905 15.345"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "actu":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5H11.5M10 8H11.5M4 11H11.5M4 14H11.5M14.5 5H17.875C18.496 5 19 5.504 19 6.125V15.5C19 16.0967 18.7629 16.669 18.341 17.091C17.919 17.5129 17.3467 17.75 16.75 17.75M14.5 5V15.5C14.5 16.0967 14.7371 16.669 15.159 17.091C15.581 17.5129 16.1533 17.75 16.75 17.75M14.5 5V2.375C14.5 1.754 13.996 1.25 13.375 1.25H2.125C1.504 1.25 1 1.754 1 2.375V15.5C1 16.0967 1.23705 16.669 1.65901 17.091C2.08097 17.5129 2.65326 17.75 3.25 17.75H16.75M4 5H7V8H4V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ressource":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3.54199C8.35161 2.06335 6.2144 1.24694 4 1.24999C2.948 1.24999 1.938 1.42999 1 1.76199V16.012C1.96362 15.672 2.97816 15.4989 4 15.5C6.305 15.5 8.408 16.367 10 17.792M10 3.54199C11.6483 2.06327 13.7856 1.24684 16 1.24999C17.052 1.24999 18.062 1.42999 19 1.76199V16.012C18.0364 15.672 17.0218 15.4989 16 15.5C13.7856 15.4969 11.6484 16.3134 10 17.792M10 3.54199V17.792"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "blackboard":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.666 2.888C12.5327 2.4163 12.2489 2.00105 11.858 1.70538C11.467 1.40972 10.9902 1.24982 10.5 1.25H7.5C6.47 1.25 5.6 1.943 5.334 2.888M12.666 2.888C12.721 3.082 12.75 3.288 12.75 3.5C12.75 3.69891 12.671 3.88968 12.5303 4.03033C12.3897 4.17098 12.1989 4.25 12 4.25H6C5.80109 4.25 5.61032 4.17098 5.46967 4.03033C5.32902 3.88968 5.25 3.69891 5.25 3.5C5.25 3.288 5.28 3.082 5.334 2.888M12.666 2.888C13.312 2.937 13.954 2.998 14.593 3.072C15.693 3.2 16.5 4.149 16.5 5.257V18.5C16.5 19.0967 16.2629 19.669 15.841 20.091C15.419 20.5129 14.8467 20.75 14.25 20.75H3.75C3.15326 20.75 2.58097 20.5129 2.15901 20.091C1.73705 19.669 1.5 19.0967 1.5 18.5V5.257C1.5 4.149 2.306 3.2 3.407 3.072C4.04804 2.99778 4.6905 2.93643 5.334 2.888"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bdeInsta":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.813 15.904L9 18.75L8.187 15.904C7.97687 15.1689 7.5829 14.4994 7.04226 13.9587C6.50162 13.4181 5.83214 13.0241 5.097 12.814L2.25 12L5.096 11.187C5.83114 10.9769 6.50062 10.5829 7.04126 10.0423C7.5819 9.50162 7.97587 8.83214 8.186 8.097L9 5.25L9.813 8.096C10.0231 8.83114 10.4171 9.50062 10.9577 10.0413C11.4984 10.5819 12.1679 10.9759 12.903 11.186L15.75 12L12.904 12.813C12.1689 13.0231 11.4994 13.4171 10.9587 13.9577C10.4181 14.4984 10.0241 15.1679 9.814 15.903L9.813 15.904ZM18.259 8.715L18 9.75L17.741 8.715C17.5927 8.12159 17.286 7.57962 16.8536 7.14703C16.4212 6.71444 15.8794 6.40749 15.286 6.259L14.25 6L15.286 5.741C15.8794 5.59251 16.4212 5.28556 16.8536 4.85297C17.286 4.42038 17.5927 3.87841 17.741 3.285L18 2.25L18.259 3.285C18.4073 3.87854 18.7142 4.42059 19.1468 4.85319C19.5794 5.28579 20.1215 5.59267 20.715 5.741L21.75 6L20.715 6.259C20.1215 6.40733 19.5794 6.71421 19.1468 7.14681C18.7142 7.57941 18.4073 8.12147 18.259 8.715ZM16.894 20.567L16.5 21.75L16.106 20.567C15.9955 20.2356 15.8094 19.9345 15.5625 19.6875C15.3155 19.4406 15.0144 19.2545 14.683 19.144L13.5 18.75L14.683 18.356C15.0144 18.2455 15.3155 18.0594 15.5625 17.8125C15.8094 17.5655 15.9955 17.2644 16.106 16.933L16.5 15.75L16.894 16.933C17.0045 17.2644 17.1906 17.5655 17.4375 17.8125C17.6845 18.0594 17.9856 18.2455 18.317 18.356L19.5 18.75L18.317 19.144C17.9856 19.2545 17.6845 19.4406 17.4375 19.6875C17.1906 19.9345 17.0045 20.2356 16.894 20.567Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "instraEsiee":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.28801 15.038C9.27255 14.0536 10.6078 13.5006 12 13.5006C13.3922 13.5006 14.7275 14.0536 15.712 15.038M5.10601 11.856C8.91301 8.04799 15.086 8.04799 18.894 11.856M1.92401 8.67399C7.48901 3.10899 16.511 3.10899 22.076 8.67399M12.53 18.22L12 18.75L11.47 18.22C11.6106 18.0795 11.8013 18.0007 12 18.0007C12.1988 18.0007 12.3894 18.0795 12.53 18.22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "webaurion":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_230_906)">
            <path
              d="M12 21V12.75M15.75 21V12.75M8.25 21V12.75M3 9L12 3L21 9M19.5 21V10.332C17.0189 9.94356 14.5113 9.74897 12 9.75C9.449 9.75 6.944 9.95 4.5 10.332V21M3 21H21M12 6.75H12.008V6.758H12V6.75Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_230_906">
              <rect width="24" height="24" fill="currentColor" />
            </clipPath>
          </defs>
        </svg>
      );
    case "logOut":
      return (
        <svg
          className={svgClassName}
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          ></path>
        </svg>
      );
  }
};

export default SvgIcon;
