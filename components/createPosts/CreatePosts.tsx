'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import ReactSelect from 'react-select';
import { components } from 'react-select';
import * as Select from '@radix-ui/react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import RHFInput from '@/components/RHFInputs/RHFInput';
import Image from 'next/image';
import FrameIcon from '../icons/Frame';
import { useTheme } from '@/app/context/ThemeProvider';

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

const CreatePosts = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const { theme } = useTheme();
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
        <div className="flex items-center gap-3">
          <Select.Root>
            <Select.Trigger
              className="flex w-1/4 rounded px-2 items-center h-11 bg-white-100 dark:bg-black-800 justify-center outline-none"
              aria-label="Food">
              <p className=" p3-regular dark:!text-white-400">Create</p>
              <span className="mx-1 dark:text-white-100/70 text-black-800/60 ">
                -
              </span>
              <div className=" flex items-center p3-regular !text-black-800 dark:!text-white-100 !font-bold ">
                <Select.Value placeholder="Post" />
                <Image
                  src="/assets/icons/arrow-down-slim.svg"
                  alt="arrow-down"
                  width={10}
                  height={2}
                  className="ml-2"
                />
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                className="overflow-hidden bg-white">
                <Select.Viewport className="w-60 mt-3 rounded-md  p-3 bg-light100__dark800">
                  <Select.Group className="flex items-center p-2 rounded-md group hover:shadow-lg duration-200 dark:hover:bg-black-700 justify-start">
                    <FrameIcon className=" dark:text-white-100 text-white-400" />
                    <SelectItem
                      className="p-2 p3-medium !text-[14px]
                      group-hover:!text-primary-500 "
                      value="apple">
                      Apple
                    </SelectItem>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <ReactSelect
            styles={{
              control: (base) => ({
                ...base,
                boxShadow: 'none',
              }),
            }}
            classNames={{
              input: () => '!text-[16px] dark:!text-white-100 text-black-800',

              control: () =>
                '!border-none dark:bg-black-800 dark:!border-[#393E4F66] px-3 h-11',
              indicatorSeparator: () => '!hidden',
              dropdownIndicator: () => '!text-white-400 !w-10 !h-10',
              option: () =>
                '!bg-white-100  !py-[18px]  dark:!bg-black-800  dark:!text-white-100 !text-black-800',
              singleValue: () => 'dark:!text-white-100',
              menu: () => 'bg-white-100 dark:bg-black-800',
            }}
            className="w-full h-full rounded-md dark:!bg-black-800"
            placeholder="Select Group"
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={[{ value: 'ocean', label: 'Ocean' }]}
            components={{ Option }}
          />
        </div>
        <div className="w-full h-64 dashedBorder !text-white-400 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center dark:bg-black-800 p-3 rounded-lg bg-white-100 gap-3 mb-3">
              <Image
                src={'/assets/icons/upload-icon.svg'}
                alt="upload"
                width={16}
                height={16}
              />
              <p className="p3-regular !text-white-300">Upload a cover image</p>
            </div>
            <p className="p4-regular !text-white-400">
              Drag & Drop or upload png or jpeg up to 16MB
            </p>
          </div>
        </div>
        <Button type="submit" className="bg-red-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreatePosts;

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <Image
          src="/assets/icons/bootstrap.svg"
          alt="frame"
          width={34}
          height={34}
        />
        <div className="flex flex-col ml-2">
          <p className="p4-medium">{props.data.label}</p>
          <p className="text-[11px] text-white-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
      </div>
    </components.Option>
  );
};

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
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
