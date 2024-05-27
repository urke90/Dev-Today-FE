'use client';
import RHFInput from '@/components/RHFInputs/RHFInput';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { postTypes } from '@/constants';
import { cn } from '@/lib/utils';
import { createPostSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Select from '@radix-ui/react-select';
import { Editor } from '@tinymce/tinymce-react';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { z } from 'zod';
import Preview from '../preview/Preview';

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
};

const colourOptions = [
  { id: 'ocean', name: 'Ocean' },
  { id: 'blue', name: 'Blue' },
  { id: 'purple', name: 'Purple' },
];

const CreatePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      postType: 'posts',
      selectGroup: undefined,
      coverImage: '',
      meetupLocation: '',
      meetupDate: undefined,
      podcastAudioFile: '',
      audioTitle: '',
      content: '',
      tags: [],
    },
  });
  const watchPostType = form.watch('postType');

  useEffect(() => {
    const storedContent = localStorage.getItem('content');
    if (storedContent) {
      form.setValue('content', storedContent);
    }
  }, [form.watch('content')]);

  const onSubmit = async () => {
    if (watchPostType === 'meetups') {
      const res = await form.trigger(['meetupLocation', 'meetupDate']);
      if (!res) return;
    }
    if (watchPostType === 'podcasts') {
      const res = await form.trigger(['podcastAudioFile', 'audioTitle']);
      if (!res) return;
    }
  };

  return (
    <>
      {!isPreview ? (
        <Form {...form}>
          <form className="space-y-8 w-full px-3 md:px-0">
            <RHFInput
              className="!placeholder:white-400 p3-medium dark:!placeholder-white-400"
              name="title"
              label="Title"
              placeholder="Write a title of the post"
            />
            <div className="flex items-end gap-3">
              <Controller
                control={form.control}
                defaultValue="posts"
                name="postType"
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}>
                    <Select.Trigger
                      {...field}
                      className="flex w-1/4 capitalize border dark:border-black-700/50 rounded-md px-2 items-center h-12 bg-white-100 dark:bg-black-800 justify-center outline-none"
                      aria-label="Food">
                      <p className=" p3-regular dark:!text-white-400">Create</p>
                      <span className="mx-1 dark:text-white-100/70 text-black-800/60 ">
                        -
                      </span>
                      <p
                        className={`${
                          watchPostType !== 'posts' ? 'hidden' : ''
                        } p3-regular !font-bold`}>
                        Post
                      </p>
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
                          <Select.Group className="flex items-center p-2 rounded-md group duration-200 justify-start">
                            <div className="flex flex-col space-y-3 w-full">
                              {postTypes.map((type, idx) => (
                                <div
                                  key={idx}
                                  className="flex  dark:hover:bg-black-700 px-3 py-1 rounded-md">
                                  <Image
                                    src={type.image}
                                    alt={type.title}
                                    width={24}
                                    height={24}
                                    className="invert dark:invert-0"
                                  />
                                  <SelectItem
                                    value={type.title}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    className="p-2 p3-medium capitalize !text-[14px] hover:!text-primary-500">
                                    {type.title}
                                  </SelectItem>
                                </div>
                              ))}
                            </div>
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                )}
              />

              <FormField
                name="selectGroup"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Group</FormLabel>
                    <FormControl>
                      <ReactSelect
                        instanceId={field.name}
                        {...field}
                        placeholder="Select a group..."
                        defaultValue={field.value}
                        value={form.watch('selectGroup')}
                        styles={{
                          control: (base) => ({
                            ...base,
                            boxShadow: 'none',
                          }),
                        }}
                        classNames={{
                          input: () =>
                            '!text-[16px] dark:!text-white-100 text-black-800',

                          control: () =>
                            '!border-none dark:bg-black-800 dark:!border-[#393E4F66] px-3 h-11',
                          indicatorSeparator: () => '!hidden',
                          dropdownIndicator: () =>
                            '!text-white-400 !w-10 !h-10',
                          option: () =>
                            '!bg-white-100  !py-[18px]  dark:!bg-black-800  dark:!text-white-100 !text-black-800',
                          singleValue: () => 'dark:!text-white-100',
                          menu: () =>
                            'bg-white-100 dark:bg-black-800 !shadow-sm ',
                        }}
                        className="w-full h-full rounded-md dark:!bg-black-800 border dark:border-black-700/50 "
                        isLoading={isLoading}
                        isClearable
                        isSearchable
                        options={colourOptions.map((color) => ({
                          value: color.id,
                          label: color.name,
                        }))}
                        components={{ Option }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="coverImage"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <div className="w-full h-64 dashedBorder !text-white-400 rounded-lg flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <Button
                          type="button"
                          className="flex items-center max-w-[200px] dark:bg-black-800 py-2 rounded-lg bg-white-100 gap-3 mb-3">
                          <Image
                            src={'/assets/icons/upload-icon.svg'}
                            alt="upload"
                            width={16}
                            height={16}
                          />
                          <p className="p3-regular !text-white-300">
                            Upload a cover image
                          </p>
                        </Button>
                        <p className="p4-regular !text-white-400">
                          Drag & Drop or upload png or jpeg up to 16MB
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchPostType === 'meetups' && (
              <>
                <RHFInput
                  className="!placeholder:white-400 p3-medium dark:!placeholder-white-400"
                  name="meetupLocation"
                  label="Meetup location"
                  placeholder="Write the location of the meetup"
                />
                <Controller
                  control={form.control}
                  name="meetupDate"
                  render={({ field }) => (
                    <Popover>
                      <h3 className="p3-medium"> Meetup date</h3>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            'justify-start p3-regular !text-white-400 bg-light100__dark800 border dark:border-black-700/50 px-4 h-11 !mt-2',
                            !field.value && 'text-muted-foreground'
                          )}>
                          <Image
                            src="/assets/icons/calendar-create.svg"
                            alt="calendar"
                            width={18}
                            height={18}
                          />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date of the meetup</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-none border-white-400">
                        <Calendar
                          className="bg-white-100 dark:bg-black-800 p4-regular "
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {form.formState.errors.meetupDate?.message && (
                  <p className="text-[14px] text-red-500 dark:text-red-500">
                    {form.formState.errors.meetupDate.type}
                  </p>
                )}
              </>
            )}
            {watchPostType === 'podcasts' && (
              <>
                <FormField
                  name="podcastAudioFile"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Podcast Audio File</FormLabel>
                      <FormControl>
                        <Button
                          type="button"
                          className="w-full flex !mt-2 justify-start focus-visible:outline-none dark:placeholder:text-[#ADB3CC] placeholder:text-white-400 placeholder:font-normal placeholder:text-sm dark:text-white-100 text-black-900 text-sm font-medium px-3 border border-white-border dark:border-[#393E4F66] rounded-lg py-3 md:px-5 bg-white-100 dark:bg-black-800">
                          <Image
                            src="/assets/icons/microphone.svg"
                            alt="upload"
                            width={11}
                            height={15}
                          />
                          <span className="subtitle-medium tracking-wide dark:bg-black-700 px-2 py-1 rounded-md bg-white-200 ">
                            Choose a file
                          </span>
                        </Button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <RHFInput
                  className="!placeholder:white-400 p3-medium dark:!placeholder-white-400"
                  name="audioTitle"
                  label="Audio title"
                  placeholder="Ex: Codetime | Episode 8"
                />
              </>
            )}

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_SECRET}
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onEditorChange={(content) => {
                        form.setValue('content', content);
                      }}
                      onBlur={field.onBlur}
                      init={{
                        skin: 'oxide-dark',
                        icons: 'thin',
                        toolbar_location: 'top',
                        content_css: 'dark',
                        content_style: `
                   body { font-family: Roboto, sans-serif; border:none font-size: 14px; color: #808191;  background-color: #262935;} body::-webkit-scrollbar {display: none; }pre, code { font-family: "Roboto Mono", monospace; background-color: transparent !important;  padding: 5px; } body::before { color: #808191 !important; } h2 {color: #ffff!important}
                   h2 {color: ${
                     window.matchMedia &&
                     window.matchMedia('(prefers-color-scheme: dark)').matches
                       ? '#ffffff'
                       : '#000000'
                   } !important; 
                  }
                   `,
                        menubar: false,
                        plugins: 'code codesample link preview image',
                        toolbar:
                          'customImageButton customPreview | H2 bold italic underline link strikethrough alignleft aligncenter alignright image ',

                        setup: function (editor) {
                          editor.ui.registry.addButton('customImageButton', {
                            text: 'Write',
                            icon: 'edit-block',
                            onAction: function () {},
                          });
                          editor.ui.registry.addButton('customPreview', {
                            text: 'Preview',
                            icon: 'preview',
                            onAction: function () {
                              setIsPreview(true);
                              const content = editor.getContent();
                            },
                          });
                        },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>
                Add or change tags (up to 5) so readers know what your story is
                about
              </FormLabel>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <CreatableSelect
                    instanceId={field.name}
                    className="border rounded-md dark:border-black-700/50"
                    {...field}
                    classNames={{
                      input: () =>
                        '!text-[16px] dark:!text-white-100 text-black-800',
                      control: () =>
                        '!border-none !shadow-none  dark:bg-black-800 dark:!border-[#393E4F66] px-3 h-11',
                      indicatorSeparator: () => '!hidden',
                      dropdownIndicator: () => '!hidden',
                      multiValue: () =>
                        '!bg-white-200 !px-2 !py-1 dark:!bg-black-700 !text-white-100 !rounded-full',
                      multiValueLabel: () =>
                        '!uppercase dark:!text-white-200 !cap-10',
                      multiValueRemove: () =>
                        '!bg-white-200 !text-white-400 !ml-1  !rounded-3xl',
                      option: () =>
                        '!bg-white-100  !py-[18px]  dark:!bg-black-800  dark:!text-white-100 !text-black-800',
                      singleValue: () => 'dark:!text-white-100',
                      menu: () => 'bg-white-100 dark:bg-black-800 !shadow-sm ',
                    }}
                    isMulti
                    options={colourOptions
                      .filter(
                        (color) =>
                          !field.value.find((tag) => tag.label === color.name)
                      )
                      .map((color) => ({
                        value: color.id,
                        label: color.name,
                      }))}
                    formatOptionLabel={(option, { context }) => {
                      if (context === 'value') {
                        return <div>{option.label}</div>;
                      }
                      return (
                        <div className="flex items-center">
                          <Image
                            src="/assets/icons/archive.svg"
                            alt="frame"
                            width={16}
                            height={16}
                            className="dark:invert "
                          />
                          <div className="flex flex-col ml-2">
                            <p className="p4-medium uppercase">
                              {option.label}
                            </p>
                          </div>
                        </div>
                      );
                    }}
                  />
                )}
              />
            </div>
            <div className="flex gap-5 p3-bold ">
              <Button
                type="button"
                className="bg-light100__dark800 hover:!text-white-100 duration-200 hover:bg-primary-500 py-3 w-3/5">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => onSubmit()}
                className=" bg-light100__dark800 hover:!text-white-100 duration-200 hover:bg-primary-500 py-3 w-3/5">
                Publish Post
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Preview
          type={watchPostType}
          data={form.getValues()}
          setIsPreview={setIsPreview}
        />
      )}
    </>
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
  ({ children, onValueChange, value, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        value={value}
        onSelect={() => onValueChange && onValueChange(value)}
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
