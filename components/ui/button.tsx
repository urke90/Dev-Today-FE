import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex w-full items-center justify-center gap-2.5 rounded-lg border-0 text-sm font-bold outline-none disabled:bg-error-primary disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        base: {},
        primary:
          'border-primary-500 bg-primary-500 text-white-100 border py-3 transition-colors',
        cancel:
          'bg-white-100 text-black-700 dark:bg-black-800 dark:text-white-100 gap-2.5 py-3 shadow-[0px_3px_20px_0px_rgba(0,0,0,0.04)] dark:shadow-none',
        icon: 'w-auto p-0',
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
