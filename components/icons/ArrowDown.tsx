import { SVGProps } from 'react';

// ----------------------------------------------------------------

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={8}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9 0H1a1 1 0 0 0-.8 1.6l4 5.333a1 1 0 0 0 1.6 0l4-5.333A1 1 0 0 0 9 0Z"
    />
  </svg>
);
export default ArrowDownIcon;
