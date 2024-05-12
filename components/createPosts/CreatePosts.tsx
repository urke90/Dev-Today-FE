import React from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RHFInput from '@/components/RHFInputs/RHFInput';
const formSchema = z.object({
  title: z.string().min(2).max(50),
});
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreatePosts = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <RHFInput name="title" label="Title" />
        <div>
          <Select.Root>
            <Select.Trigger
              className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
              aria-label="Food">
              <Select.Value placeholder="Select a fruit…" />
              <Select.Icon className="text-violet11"></Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"></Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                  <Select.Group>
                    <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                      Fruits
                    </Select.Label>
                    <Select.SelectItem value="apple">Apple</Select.SelectItem>
                    <Select.SelectItem value="banana">Banana</Select.SelectItem>
                    <Select.SelectItem value="blueberry">
                      Blueberry
                    </Select.SelectItem>
                    <Select.SelectItem value="grapes">Grapes</Select.SelectItem>
                    <Select.SelectItem value="pineapple">
                      Pineapple
                    </Select.SelectItem>
                  </Select.Group>

                  <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />
                </Select.Viewport>
                <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default"></Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <Button type="submit" className="bg-red-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreatePosts;
