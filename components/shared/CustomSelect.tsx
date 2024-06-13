import { forwardRef } from 'react';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------

interface ICustomSelectProps {
  children: React.ReactNode;
  triggerElement: React.ReactNode;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  children,
  triggerElement,
}) => {
  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex items-center justify-center data-[placeholder]:text-violet9 outline-none"
        aria-label="Food">
        {triggerElement}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="overflow-hidden relative top-0 left-0">
          {/* <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            dsadasdsa
          </Select.ScrollUpButton> */}
          <Select.Viewport className="p-[5px]">
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              DOWN ICON
            </Select.ScrollDownButton>
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CustomSelect;

interface ISelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

export const SelectItem = forwardRef<HTMLDivElement, ISelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'rounded-[14px] border flex items-center relative top-0 left-0 select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
          className
        )}
        {...props}
        ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center"></Select.ItemIndicator>
      </Select.Item>
    );
  }
);
