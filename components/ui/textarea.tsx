import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex dark:bg-black-800 bg-white-100 min-h-[90px] w-full rounded-lg gap-2.5 border border-white-border dark:border-[#393E4F66] md:py-4 md:px-5 px-3.5 py-3 text-sm dark:placeholder:text-white-400 placeholder:text-white-400 placeholder:font-normal placeholder:text-sm dark:text-white-100 text-black-900 font-medium disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
