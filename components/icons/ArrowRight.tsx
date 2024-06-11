import { SVGProps } from 'react';

// ----------------------------------------------------------------

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 10h12m0 0-4.667-5M16 10l-4.667 5"
    />
  </svg>
);
export default ArrowRightIcon;
