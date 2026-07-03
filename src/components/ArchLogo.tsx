import type { SVGProps } from "react";

export default function ArchLogo({
  className = "h-7 w-[26px] overflow-visible",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 31 L3 15 A12 11 0 0 1 27 15 L27 31 L21 31 L21 16 A6 6 0 0 0 9 16 L9 31 Z"
      />
    </svg>
  );
}
