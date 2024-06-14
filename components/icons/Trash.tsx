import type { SVGProps } from 'react';

// ----------------------------------------------------------------

const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m11.055 6.75-.26 6.75m-3.59 0-.26-6.75m7.476-2.407c.257.039.511.08.767.124m-.767-.124-.801 10.412a1.688 1.688 0 0 1-1.683 1.557H6.063a1.687 1.687 0 0 1-1.683-1.557L3.579 4.343m10.842 0c-.866-.131-1.736-.23-2.608-.298m-8.234.298c-.257.038-.512.079-.767.123m.767-.123c.866-.131 1.736-.23 2.608-.298m5.625 0v-.687c0-.885-.682-1.623-1.567-1.651-.83-.026-1.66-.026-2.49 0-.885.028-1.567.767-1.567 1.65v.688m5.625 0a36.498 36.498 0 0 0-5.626 0"
    />
  </svg>
);
export default TrashIcon;
