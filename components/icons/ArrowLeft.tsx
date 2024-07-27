import { SVGProps } from 'react';

// ----------------------------------------------------------------

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#F8FAFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.2 12H4.8m0 0 5.6-6m-5.6 6 5.6 6"
    />
  </svg>
);
export default ArrowLeftIcon;
