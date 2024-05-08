import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center outline-none border-0 w-full rounded-lg gap-2.5 text-sm font-bold',
  {
    variants: {
      variant: {
        base: {},
        primary:
          'bg-primary-500 border border-primary-500 transition-colors text-white-100 py-3',
        cancel:
          'bg-white-100 py-3 gap-2.5 text-black-700 dark:text-white-100 dark:bg-black-800 shadow-[0px_3px_20px_0px_rgba(0,0,0,0.04)] dark:shadow-none',
        icon: 'p-0 w-auto',
      },
      size: {
        // TODO check this if it will be used
        default: {},
        large: 'py-3.5',
        medium: 'py-2.5', // onboarding, login, register
        small: 'py-2', // profile
      },
    },
    defaultVariants: {
      variant: 'base',
      size: 'default',
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
// shadow-[0px_3px_20px_0px_rgba(0, 0, 0, 0.04)]
