'use client';
import { createGroup, updateGroup } from '@/api/mutations';
import { fetchUsers } from '@/api/queries';
import RHFInput from '@/components/RHFInputs/RHFInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createGroupSchema, updateGroupSchema } from '@/lib/validation';
import { IGroupUpdate } from '@/types/group';
import { EUserRole } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

type UserProps = {
  id: string;
  userName: string;
  avatarImg: string;
};
type CreateGroupParams = {
  data: z.infer<typeof createGroupSchema>;
  members: { userId: string; role: EUserRole }[];
};

const CreateGroup = ({
  authorId,
  editGroup,
}: {
  authorId: string;
  editGroup?: IGroupUpdate;
}) => {
  const [q, setQ] = useState('');
  const [debouncedQ] = useDebounce(q, 700);
  const router = useRouter();

  const {
    data: users = [],
    error: usersError,
    isLoading: isFetchingUsers,
  } = useQuery({
    queryKey: ['users', debouncedQ],
    queryFn: () => fetchUsers(debouncedQ),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ data, members }: CreateGroupParams) => {
      await createGroup(data, members);
    },
    mutationKey: ['groups'],
  });

  const { mutateAsync: updateGroupMutation } = useMutation({
    mutationFn: async (data: z.infer<typeof updateGroupSchema>) => {
      await updateGroup(editGroup?.id ?? '', data);
    },
    mutationKey: ['groups'],
  });

  const userOptions = (users as UserProps[]).map((user) => ({
    label: user.userName,
    value: user.id,
    avatarImage: user.avatarImg,
  }));

  const form = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      authorId: authorId,
      name: editGroup?.name || '',
      profileImage: editGroup?.profileImage || '',
      coverImage: editGroup?.coverImage || '',
      bio: editGroup?.bio || '',
      admins: [],
      members: [],
    },
  });

  const watchProfileImage = form.watch('profileImage');
  const watchCoverImage = form.watch('coverImage');

  const onSubmit = async (data: z.infer<typeof createGroupSchema>) => {
    const modifiedMembers = data.members.map((member) => {
      return { userId: member.value, role: EUserRole.USER };
    });
    const modifiedAdmins = data.admins.map((admin) => {
      return { userId: admin.value, role: EUserRole.ADMIN };
    });
    try {
      if (editGroup) {
        await updateGroupMutation({
          ...data,
          id: editGroup?.id ?? '',
          createdAt: editGroup?.createdAt ?? new Date(),
          updatedAt: new Date(),
        });
        router.push(`/groups/${editGroup.id}`);
      } else {
        await mutateAsync({
          data,
          members: [...modifiedMembers, ...modifiedAdmins],
        });
        router.push('/groups');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  };

  const resetForm = () => {
    form.reset();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-3 md:px-0"
        >
          <RHFInput
            className="!placeholder:white-400 p3-medium dark:!placeholder-white-400"
            name="name"
            label="Group name"
            placeholder="Write a title of the post"
          />
          <FormField
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full  !text-white-400 gap-3 rounded-lg flex items-center">
                    <div
                      className={`bg-light100__dark800 ${watchProfileImage ? ' rounded-full' : 'rounded-full p-4'}`}
                    >
                      <Image
                        src={
                          watchProfileImage || '/assets/icons/basic-image.svg'
                        }
                        alt="upload"
                        width={watchProfileImage ? 32 : 24}
                        height={watchProfileImage ? 32 : 24}
                        className={`invert-0 dark:invert-0 ${watchProfileImage ? 'object-cover w-11 invert-0 h-11 rounded-full' : ''}`}
                      />
                    </div>
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
                        }}
                        options={{
                          multiple: false,
                          cropping: true,
                          croppingShowDimensions: true,
                        }}
                      >
                        {({ open }) => (
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              open();
                            }}
                            type="button"
                            className="flex items-center max-w-[200px] dark:bg-black-800 py-3 rounded-lg bg-white-100 gap-3 px-4"
                          >
                            <Image
                              src={'/assets/icons/upload-icon.svg'}
                              alt="upload"
                              width={16}
                              height={16}
                              className="invert dark:invert-0"
                            />
                            <p className="p3-regular !text-white-400">
                              Set a profile photo
                            </p>
                          </Button>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="coverImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  {watchCoverImage ? (
                    <div className="relative w-full h-64">
                      <Image
                        src={watchCoverImage}
                        alt="Cover Image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-3xl"
                      />
                      <Button
                        type="button"
                        onClick={() => form.setValue('coverImage', '')}
                        className="absolute right-0 top-[-40px] hover:bg-black-700 text-white-400  border dark:border-gray-500 size-8 dark:text-white-100"
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-64 dashedBorder !text-white-400 rounded-lg flex items-center justify-center">
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
                          }}
                          options={{
                            multiple: false,
                            cropping: true,
                            croppingShowDimensions: true,
                          }}
                        >
                          {({ open }) => (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                open();
                              }}
                              type="button"
                              className="flex items-center max-w-[200px] dark:bg-black-800 py-2 rounded-lg bg-white-100 gap-3 mb-3"
                            >
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
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="w-full h-32 p-3 rounded-lg bg-light100__dark800 dark:bg-black-800 !text-white-400"
                    placeholder="Type your message here."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <FormLabel>Add admins</FormLabel>

            <FormField
              control={form.control}
              name="admins"
              render={({ field }) => (
                <CreatableSelect
                  instanceId={field.name}
                  className="border rounded-md dark:border-black-700/50"
                  {...field}
                  classNames={{
                    input: () =>
                      '!text-[16px] dark:!text-white-100 text-black-800',
                    control: () =>
                      '!border-none !shadow-none  dark:bg-black-800 dark:!border-[#393E4F66] px-3 h-auto min-h-[44px]',
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
                  onInputChange={(value) => setQ(value)}
                  isOptionDisabled={(option) => {
                    const tooLong = field.value.length >= 10;
                    if (tooLong) return true;

                    if (
                      form
                        .getValues()
                        .members.filter(
                          (member) => member.value === option.value
                        ).length > 0
                    )
                      return true;

                    return false;
                  }}
                  options={userOptions}
                  formatOptionLabel={(option, { context }) => {
                    if (context === 'value') {
                      return (
                        <div className="flex items-center">
                          <Image
                            src={'/assets/images/avatars/avatar-2.svg'}
                            alt={option?.label}
                            width={16}
                            height={16}
                            className="mr-2  rounded-full"
                          />
                          {option.label}
                        </div>
                      );
                    }
                    return (
                      <div className="flex items-center">
                        <p className="p4-medium uppercase ml-2">
                          {option.label}
                        </p>
                      </div>
                    );
                  }}
                />
              )}
            />
          </div>

          <div className="space-y-3">
            <FormLabel>Add members</FormLabel>

            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <CreatableSelect
                  instanceId={field.name}
                  className="border rounded-md dark:border-black-700/50"
                  {...field}
                  classNames={{
                    input: () =>
                      '!text-[16px] dark:!text-white-100 text-black-800',
                    control: () =>
                      '!border-none !shadow-none  dark:bg-black-800 dark:!border-[#393E4F66] px-3 h-auto min-h-[44px]',
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
                  onInputChange={(value) => setQ(value)}
                  isOptionDisabled={(option) => {
                    const tooLong = field.value.length >= 10;
                    if (tooLong) return true;

                    if (
                      form
                        .getValues()
                        .admins.filter((admin) => admin.value === option.value)
                        .length > 0
                    )
                      return true;

                    return false;
                  }}
                  options={userOptions}
                  formatOptionLabel={(option, { context }) => {
                    if (context === 'value') {
                      return (
                        <div className="flex items-center">
                          <Image
                            src={'/assets/images/avatars/avatar-2.svg'}
                            alt={option.label}
                            width={16}
                            height={16}
                            className="mr-2 dark:invert invert-0"
                          />
                          {option.label}
                        </div>
                      );
                    }
                    return (
                      <div className="flex items-center">
                        <p className="p4-medium ml-2 uppercase">
                          {option.label}
                        </p>
                      </div>
                    );
                  }}
                />
              )}
            />
          </div>

          <div className="flex gap-5 p3-bold ">
            <Button
              onClick={resetForm}
              type="button"
              className="bg-light100__dark800 hover:!text-white-100 duration-200 hover:bg-primary-500 py-3 w-3/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className=" bg-light100__dark800 hover:!text-white-100 duration-200 hover:bg-primary-500 py-3 w-3/5"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? editGroup
                  ? 'Updating Group...'
                  : 'Creating Group...'
                : editGroup
                  ? 'Update Group'
                  : 'Create Group'}
            </Button>
          </div>
        </form>
      </Form>
      {isFetchingUsers && <p>Loading users...</p>}
    </div>
  );
};

export default CreateGroup;
