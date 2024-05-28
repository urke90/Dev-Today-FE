'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';

// ----------------------------------------------------------------

interface IRHFInputProps extends InputProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFInput: React.FC<IRHFInputProps> = ({
  name,
  label,
  description,
  type = 'text',
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
