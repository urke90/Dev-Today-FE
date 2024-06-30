import type { SVGProps } from 'react';

// ----------------------------------------------------------------

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2.7 14.401h3.816a.9.9 0 0 0 .64-.26l6.227-6.236 2.556-2.501a.9.9 0 0 0 0-1.278L12.123.266a.9.9 0 0 0-1.278 0L8.307 2.812 2.061 9.048a.9.9 0 0 0-.261.638v3.815a.9.9 0 0 0 .9.9Zm8.784-12.227 2.547 2.546-1.278 1.277-2.547-2.546 1.278-1.277ZM3.6 10.055 8.937 4.72l2.547 2.546-5.337 5.335H3.6v-2.546Zm13.5 6.146H.9A.9.9 0 1 0 .9 18h16.2a.9.9 0 1 0 0-1.8Z"
    />
  </svg>
);
export default EditIcon;
