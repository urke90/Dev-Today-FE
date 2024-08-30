'use client';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import PreviewContent from './PreviewContent';

import CalendarIcon from '../icons/Calendar';
import FrameIcon from '../icons/Frame';
import MicrophoneIcon from '../icons/Microphone';
import PodcastIcon from '../icons/Podcast';
import { generateSelectStyles } from '../RHFInputs/RHFMultipleSelect';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Input } from '../ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Select from '@radix-ui/react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { format } from 'date-fns';
import { CldUploadWidget } from 'next-cloudinary';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactSelect, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useDebounce } from 'use-debounce';

import {
  createMeetup,
  createPodcast,
  createPost,
  updateMeetup,
  updatePodcast,
  updatePost,
} from '@/api/mutations';
import { fetchGroupsForDropdown, fetchTags } from '@/api/queries';
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
import { CONTENT_TYPES } from '@/constants';
import { revalidateRoute } from '@/lib/actions/revalidate';
import { cn } from '@/lib/utils';
import {
  createOrUpdateContentSchema,
  type IContent,
  type IContentDTO,
  type IPutMeetupDTO,
  type IPutPodcastDTO,
  type IPutPostDTO,
} from '@/lib/validation';
import { EContentType, type ITag } from '@/types/content';
import type { IGroupsResponse } from '@/types/group';

// ----------------------------------------------------------------

interface ICreateContentProps {
  authorId?: string;
  content?: IContentDTO;
}

const CreateContent: React.FC<ICreateContentProps> = ({
  authorId,
  content,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [q, setQ] = useState('');
  const [title, setTitle] = useState('');
  const [isOpenDatePopover, setIsOpenDatePopover] = useState(false);
  const { theme } = useTheme();
  const [debouncedQ] = useDebounce(q, 500);
  const [debouncedTitle] = useDebounce(title, 500);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const router = useRouter();

  const isEditPage = !!content;

  const resetForm = () => {
    if (isEditPage) {
      router.push(`/content/${content.id}`);
    } else {
      router.push('/posts');
    }
    form.reset();
    form.setValue('groupId', {
      value: '',
      label: '',
    });
    form.setValue('tags', []);
  };

  const {
    data: groupsData,
    error: groupsError,
    isLoading: isLoadingGroups,
  } = useQuery<IGroupsResponse>({
    queryKey: ['groups', debouncedQ],
    queryFn: () => fetchGroupsForDropdown(debouncedQ),
  });

  const {
    data: tags,
    error: tagsError,
    isLoading: isLoadingTags,
  } = useQuery<ITag[]>({
    queryKey: ['tags', debouncedTitle],
    queryFn: () => fetchTags(debouncedTitle),
  });

  const { mutateAsync: createContentAsync } = useMutation({
    mutationFn: async (data: IPutPostDTO) => {
      await createPost(data);
    },
  });

  const { mutateAsync: updateContentAsync } = useMutation({
    mutationFn: async (data: IPutPostDTO) => {
      await updatePost(content?.id, data, content?.authorId);
    },
  });

  const { mutateAsync: createMeetupAsync } = useMutation({
    mutationFn: async (data: IPutMeetupDTO) => {
      await createMeetup(data);
    },
  });

  const { mutateAsync: updateMeetupAsync } = useMutation({
    mutationFn: async (data: IPutMeetupDTO) => {
      await updateMeetup(content?.id, data, content?.authorId);
    },
  });

  const { mutateAsync: createPodcastAsync } = useMutation({
    mutationFn: async (data: IPutPodcastDTO) => {
      await createPodcast(data);
    },
  });

  const { mutateAsync: updatePodcastAsync } = useMutation({
    mutationFn: async (data: IPutPodcastDTO) => {
      await updatePodcast(content?.id, data, content?.authorId);
    },
  });

  const selectGroupOptions = groupsData?.groups.map((group) => ({
    value: group.id,
    label: group.name,
    profileImage: group.profileImage,
    bio: group.bio,
  }));

  const selectTagsOptions = tags?.map((tag) => ({
    value: tag.id,
    label: tag.title,
  }));

  const form = useForm<IContent>({
    resolver: zodResolver(createOrUpdateContentSchema),
    defaultValues: {
      authorId: content?.authorId || authorId,
      title: content?.title || '',
      type: content?.type || EContentType.POST,
      groupId: content
        ? {
            value: content?.group.id,
            label: content?.group.name,
          }
        : undefined,
      coverImage: content?.coverImage || null,
      meetupLocation: {
        address: content?.meetupLocation.address || '',
        lat: content?.meetupLocation.lat || 0,
        lng: content?.meetupLocation.lng || 0,
      },
      meetupDate: content?.meetupDate || undefined,
      podcastFile: content?.podcastFile || undefined,
      podcastTitle: content?.podcastTitle || '',
      description: content?.description || '',
      tags: content
        ? content?.tags.map((tag) => ({ value: tag.id, label: tag.title }))
        : [],
    },
  });

  const contentType = form.watch('type');
  const coverImage = form.watch('coverImage');

  const onSubmit = async () => {
    const isValid = await form.trigger([
      'authorId',
      'title',
      'type',
      'groupId',
      'coverImage',
      'description',
      'tags',
    ]);
    if (!isValid) return;

    const commonData: IPutPostDTO = {
      authorId: form.getValues('authorId'),
      title: form.getValues('title'),
      type: form.getValues('type'),
      groupId: form.getValues('groupId')?.value,
      coverImage: form.getValues('coverImage'),
      description: form.getValues('description'),
      tags: form.getValues('tags').map((tag) => tag.label),
    };

    if (contentType === EContentType.POST) {
      try {
        if (isEditPage) {
          await updateContentAsync(commonData);
          toast.success('Updated successfully.');
          revalidateRoute(`/content/${content.id}`);
          router.push(`/content/${content.id}`);
        } else {
          await createContentAsync(commonData);
          toast.success('Created successfully.');
          revalidateRoute('/posts');
          router.push('/posts');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to create post');
      }
    }

    if (contentType === EContentType.MEETUP) {
      try {
        const isValid = await form.trigger(['meetupLocation', 'meetupDate']);
        if (!isValid) return;

        if (isEditPage) {
          await updateMeetupAsync({
            ...commonData,
            meetupLocation: form.getValues('meetupLocation'),
            meetupDate: form.getValues('meetupDate'),
          });
          toast.success('Updated successfully.');
          revalidateRoute(`/content/${content.id}`);
          router.push(`/content/${content.id}`);
        } else {
          await createMeetupAsync({
            ...commonData,
            meetupLocation: form.getValues('meetupLocation'),
            meetupDate: form.getValues('meetupDate'),
          });

          toast.success('Created successfully.');
          revalidateRoute('/meetups');
          router.push('/meetups');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to create meetup');
      }
    }

    if (contentType === EContentType.PODCAST) {
      try {
        const isValid = await form.trigger(['podcastFile', 'podcastTitle']);
        if (!isValid) return;

        if (isEditPage) {
          await updatePodcastAsync({
            ...commonData,
            podcastFile: form.getValues('podcastFile'),
            podcastTitle: form.getValues('podcastTitle'),
          });

          toast.success('Updated successfully.');
          revalidateRoute(`/content/${content.id}`);
          router.push(`/content/${content.id}`);
        } else {
          await createPodcastAsync({
            ...commonData,
            podcastFile: form.getValues('podcastFile'),
            podcastTitle: form.getValues('podcastTitle'),
          });

          toast.success('Created successfully.');
          revalidateRoute('/podcasts');
          router.push('/podcasts');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to create podcast');
      }
    }
  };

  const handlePreview = () => {
    const content = editorRef.current?.getContent() || '';
    form.setValue('description', content);
    setIsPreviewMode(true);
  };

  if (isPreviewMode) {
    return (
      <PreviewContent
        type={contentType}
        data={form.getValues()}
        setIsPreviewMode={setIsPreviewMode}
      />
    );
  }

  const cleanupBodyOverflow = () => {
    document.body.style.overflow = '';
  };

  return (
    <div className="w-full pb-10">
      <Form {...form}>
        <form className="space-y-8">
          <RHFInput
            className="p3-medium"
            name="title"
            label="Title"
            placeholder="Write a title of the post"
          />
          <div
            className={`flex flex-col sm:flex-row ${form.formState.errors && 'items-center'} items-center gap-3`}
          >
            <FormField
              control={form.control}
              defaultValue={EContentType.POST}
              name="type"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormLabel className="mb-3 h-[18.5px]">Type</FormLabel>
                  <Select.Root
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger
                      disabled={isEditPage}
                      {...field}
                      className={
                        'flex-center !border-white-border bg-white-100 dark:bg-black-800 flex min-h-[46px] w-full items-center rounded-md border px-2 pl-6 capitalize outline-none sm:w-[140px] dark:!border-[#393E4F66]'
                      }
                    >
                      <div className="p3-regular !text-black-800 dark:!text-white-100 flex w-full items-center justify-between !font-bold ">
                        <Select.Value />
                        <Image
                          src="/assets/icons/arrow-down-slim.svg"
                          alt="arrow-down"
                          width={12}
                          height={5}
                          className="mr-2 md:ml-2 md:mr-0"
                        />
                      </div>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content position="popper" className="p-2">
                        <Select.Viewport className="flex-flex-col bg-light100__dark800 shadow-card mt-3 w-40 gap-2 rounded-lg p-2">
                          <Select.Group>
                            {CONTENT_TYPES.map(({ value, title }) => {
                              return (
                                <Select.Item
                                  key={value}
                                  onSelect={(e) => e.preventDefault()}
                                  value={value}
                                  className="text-white-400 hover:bg-white-200 hover:text-primary-500 dark:text-white-100 dark:hover:bg-black-700 hover:dark:text-primary-500 flex cursor-pointer items-center gap-3 rounded-md p-2 pl-3"
                                >
                                  {value === EContentType.POST && <FrameIcon />}
                                  {value === EContentType.MEETUP && (
                                    <CalendarIcon />
                                  )}
                                  {value === EContentType.PODCAST && (
                                    <PodcastIcon />
                                  )}
                                  <Select.ItemText>{title}</Select.ItemText>
                                </Select.Item>
                              );
                            })}
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              )}
            />
            <FormField
              name="groupId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Select Group</FormLabel>
                  <FormControl>
                    <ReactSelect
                      instanceId={field.name}
                      {...field}
                      placeholder="Select a group..."
                      defaultValue={field.value}
                      value={form.watch('groupId')}
                      onInputChange={(value) => setQ(value)}
                      classNames={generateSelectStyles()}
                      isLoading={isLoadingGroups}
                      isDisabled={isEditPage}
                      isClearable
                      isSearchable
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      options={selectGroupOptions}
                      components={{ Option }}
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
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
                  {coverImage ? (
                    <div className="relative h-64 w-full">
                      <Image
                        src={coverImage}
                        alt="Cover Image"
                        fill
                        className="rounded-3xl object-cover"
                      />
                      <Button
                        type="button"
                        onClick={() => form.setValue('coverImage', null)}
                        className="text-white-400 hover:bg-black-700 dark:text-white-100 absolute right-0  top-[-40px] size-8 border dark:border-gray-500"
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <div className="dashed-border !text-white-400 flex h-64 w-full items-center justify-center rounded-lg">
                      <div className="flex flex-col items-center">
                        <CldUploadWidget
                          uploadPreset={
                            process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME
                          }
                          onSuccess={(res) => {
                            if (res.info && typeof res.info === 'object') {
                              field.onChange(res.info.secure_url);
                            } else {
                              field.onChange(res.info);
                            }
                            cleanupBodyOverflow();
                          }}
                          options={{
                            multiple: false,
                          }}
                        >
                          {({ open }) => (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                open();
                              }}
                              type="button"
                              className="bg-white-100 hover:bg-white-300/30 dark:bg-black-800 hover:dark:bg-black-700 mb-3 flex max-w-[200px] items-center gap-3 rounded-lg py-2"
                            >
                              <Image
                                src={'/assets/icons/upload-icon.svg'}
                                alt="upload"
                                width={16}
                                height={16}
                              />
                              <p className="p3-regular  !text-white-300">
                                Upload a cover image
                              </p>
                            </Button>
                          )}
                        </CldUploadWidget>
                        <p className="p4-regular !text-white-400">
                          Drag & Drop or upload png or jpeg up to 16MB
                        </p>
                      </div>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {contentType === EContentType.MEETUP && (
            <>
              <div className="w-full">
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                >
                  <FormField
                    name="meetupLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meetup location</FormLabel>
                        <FormControl>
                          <GoogleMapsAutocomplete onChange={field.onChange} />
                        </FormControl>
                        {form.formState.errors.meetupLocation?.address
                          ?.message && (
                          <p className="p3-medium !text-error-text">
                            {
                              form.formState.errors.meetupLocation?.address
                                ?.message
                            }
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </APIProvider>
              </div>
              <FormField
                control={form.control}
                name="meetupDate"
                render={({ field }) => {
                  const selectedDate = field.value
                    ? new Date(field.value)
                    : null;
                  return (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <h3 className="p3-medium flex gap-1">
                            Meetup date
                            <span className="text-primary-500">
                              ( Select date first in order to select time )
                            </span>
                          </h3>
                          <PopoverTrigger asChild>
                            <Button
                              className={cn(
                                'justify-start p3-regular font-bold bg-light100__dark800 border dark:border-black-700/50 px-4 h-11 !mt-2',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <Image
                                src="/assets/icons/calendar-create.svg"
                                alt="calendar"
                                width={18}
                                height={18}
                              />

                              {selectedDate ? (
                                format(field.value, 'MMMM dd, yyyy hh:mm a')
                              ) : (
                                <span className="text-white-400">
                                  Pick a date of the meetup
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="border-white-400 bg-white-100 dark:bg-black-800 w-auto space-y-3 rounded-none  p-0 px-2 pb-5">
                            <Calendar
                              className="p4-regular bg-white-100 dark:bg-black-800"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                            {selectedDate ? (
                              <Input
                                type="time"
                                defaultValue="09:00"
                                min="09:00"
                                max="18:00"
                                onChange={(event) => {
                                  const currentDate = new Date(field.value);
                                  const newDate = new Date(
                                    currentDate.toDateString() +
                                      ' ' +
                                      event.target.value
                                  );

                                  field.onChange(newDate);
                                }}
                              />
                            ) : (
                              <div className="flex-center">
                                <p className="p3-bold flex-center text-white-400 ring-primary-500 hover:bg-primary-500 animate-bounce rounded-xl px-3 py-1 ring transition-colors">
                                  Select a date first to pick a time
                                </p>
                              </div>
                            )}
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          )}
          {contentType === EContentType.PODCAST && (
            <>
              <FormField
                name="podcastFile"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Podcast Audio File</FormLabel>
                    <FormControl>
                      <CldUploadWidget
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME
                        }
                        onSuccess={(res) => {
                          console.log('RES ZA PODCAST FILE', res);
                          if (res.info && typeof res.info === 'object') {
                            field.onChange(res.info.secure_url);
                          } else {
                            field.onChange(res.info);
                          }
                        }}
                      >
                        {({ open }) => (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              open();
                            }}
                            type="button"
                            className="border-white-border bg-white-100 text-black-900 placeholder:text-white-400 dark:bg-black-800 dark:text-white-100 !mt-2 flex w-full justify-start rounded-lg border p-3 text-sm font-medium placeholder:text-sm placeholder:font-normal focus-visible:outline-none md:px-5 dark:border-[#393E4F66] dark:placeholder:text-[#ADB3CC]"
                          >
                            <MicrophoneIcon
                              className={`${field.value ? 'text-green-400 dark:text-green-700' : ''}`}
                            />
                            <span
                              className={`subtitle-medium ${field.value ? 'text-white-400 dark:!text-white-100 bg-green-400 dark:bg-green-700' : 'bg-white-200 dark:bg-black-700'}  rounded-md px-2 py-1 tracking-wide`}
                            >
                              {field.value ? 'File chosen' : 'Choose a file'}
                            </span>
                          </Button>
                        )}
                      </CldUploadWidget>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RHFInput
                className="!placeholder:white-400 p3-medium dark:!placeholder-white-400"
                name="podcastTitle"
                label="Audio title"
                placeholder="Ex: Codetime | Episode 8"
              />
            </>
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_SECRET}
                    onInit={(_, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    value={field.value}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
                      icons: 'thin',
                      toolbar_location: 'top',
                      content_css: 'dark',
                      content_style: `body {
                           font-family: Roboto, sans-serif;
                           font-size: 14px;
                           color: ${theme === 'dark' ? '#FFFFFF' : '#1F2128'} !important;
                           ${theme === 'dark' ? 'background-color: #262935;' : 'background-color: #ffffff;'}!important;
                          }
                           color: #FFFFFF !important;}
                                              
                         body::-webkit-scrollbar {
                           display: none;
                         }
                         pre, code {
                           font-family: "Roboto Mono", monospace;
                           background-color: transparent !important;
                           padding: 5px;
                         }
                         body::before {
                           color: #FFFFFF !important;
                         }
                         h2 {
                           color: ${theme === 'dark' ? '#FFFFFF' : '#000000'} !important;
                         }`,
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
                          onAction: handlePreview,
                        });
                      },
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Add or change tags (up to 5) so readers know what your story
                  is about
                </FormLabel>
                <CreatableSelect
                  instanceId={field.name}
                  {...field}
                  onInputChange={(value) => setTitle(value)}
                  classNames={generateSelectStyles()}
                  isMulti
                  isOptionDisabled={() => field.value.length >= 5}
                  options={selectTagsOptions
                    ?.filter(
                      (item) =>
                        !field.value?.find((tag) => tag.label === item.label)
                    )
                    .map((item) => ({
                      value: item.value,
                      label: item.label,
                    }))}
                  formatOptionLabel={(option, { context }) => {
                    if (context === 'value') {
                      return <div className="p4-medium">{option.label}</div>;
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
                        <div className="ml-2 flex flex-col">
                          <p className="p4-medium">{option.label}</p>
                        </div>
                      </div>
                    );
                  }}
                />
                {form.formState.errors.tags?.[0]?.label?.message && (
                  <p className="p3-medium !text-error-text">
                    {form.formState.errors.tags[0].label.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <div className="p3-bold flex gap-5">
            <Button onClick={resetForm} variant="cancel" type="button">
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={onSubmit}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? isEditPage
                  ? 'Updating Content...'
                  : 'Publishing Content...'
                : isEditPage
                  ? 'Update Content'
                  : 'Publish Content'}
            </Button>
          </div>
        </form>
      </Form>
      {form.formState.isSubmitting && <LoadingSpinner asLayout />}
    </div>
  );
};

export default CreateContent;

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex cursor-pointer items-center gap-2">
        <Image
          src={props.data.profileImage || '/assets/icons/bootstrap.svg'}
          alt="frame"
          width={34}
          height={34}
          className="rounded-md"
        />
        <div className="ml-2 flex flex-col">
          <p className="p4-medium">{props.data.label}</p>
          <p className="text-white-400 text-[11px]">
            {props.data.bio || 'No bio available'}
          </p>
        </div>
      </div>
    </components.Option>
  );
};
