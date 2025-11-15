import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12H3" />
      <path d="M21 6H3" />
      <path d="M21 18H3" />
      <path d="m15 12-4-4" />
      <path d="m15 12 4 4" />
      <path d="m9 12-4-4" />
      <path d="m9 12 4 4" />
    </svg>
  );
}
