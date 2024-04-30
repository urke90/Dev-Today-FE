import { SVGProps } from 'react';

// ----------------------------------------------------------------

const CheckmarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.31 9.734a.654.654 0 0 0 .927 0l6.05-6.076a.875.875 0 1 0-1.24-1.234L4.776 7.72 2.952 5.889a.874.874 0 0 0-1.24 1.233L4.31 9.734Z"
    />
  </svg>
);
export default CheckmarkIcon;
