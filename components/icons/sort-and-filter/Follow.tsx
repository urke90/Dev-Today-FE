import { SVGProps } from 'react';

// ----------------------------------------------------------------

const FollowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <rect width={28} height={28} fill="currentColor" rx={6} />
    <path fill="#825EF6" d="M17 9a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
    <path
      fill="#825EF6"
      d="M16 13c-.764.578-1.973 1-3 1-1.046 0-2.228-.401-3-1-4.898 1.179-5.09 5.234-4.992 8.979.017.62.364 1.021.992 1.021h9v-3c0-1.019.307-2 2-2h3.5c0-3-2-5-4.5-5Z"
    />
    <path
      stroke="#FF6934"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 21h6m0 0-1.5-1.5M23 21l-1.5 1.5"
    />
  </svg>
);
export default FollowIcon;
