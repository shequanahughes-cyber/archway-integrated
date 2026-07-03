import { useId } from "react";
import type { SVGProps } from "react";

export default function ArchLogo({
  className = "h-7 w-[26px] overflow-visible",
  ...props
}: SVGProps<SVGSVGElement>) {
  const filterId = useId();

  return (
    <svg
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="1"
            floodColor="#000000"
            floodOpacity="0.25"
          />
        </filter>
      </defs>
      <path
        d="M5 29V14A10 7 0 0 1 25 14V29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}
