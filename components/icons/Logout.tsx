import * as React from 'react';
import { SVGProps } from 'react';

// ----------------------------------------------------------------

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.139 14.693v-1.014H7.072V9.692A5.383 5.383 0 0 0 6.009 9.6C2.677 9.6 0 12.112 0 15.2h11.2a1.891 1.891 0 0 1-.061-.507ZM10.4 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
    <path
      fill="currentColor"
      d="M12.49 15.2c.105 0 .232-.064.38-.193l2.846-2.73a.897.897 0 0 0 0-1.311L12.89 8.215c-.148-.129-.274-.215-.38-.215-.168 0-.295.172-.295.494v1.913H8v2.407h4.195v1.913c0 .301.127.473.295.473Z"
    />
  </svg>
);
export default LogoutIcon;
