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
import { Textarea, TextareaProps } from '@/components/ui/textarea';

interface IRHFTextareaProps extends TextareaProps {
  name: string;
  label?: string;
  description?: string;
}

const RHFTextarea: React.FC<IRHFTextareaProps> = ({
  name,
  label,
  description,
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
            <Textarea {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFTextarea;
