import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full focus-visible:outline-none dark:placeholder:text-[#ADB3CC] placeholder:text-white-400 placeholder:font-normal placeholder:text-sm dark:text-white-100 text-black-900 text-sm font-medium px-3 border border-[#C5D0E666] dark:border-[#393E4F66] rounded-lg py-3 lg:px-5 bg-white-100 dark:bg-black-800',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
