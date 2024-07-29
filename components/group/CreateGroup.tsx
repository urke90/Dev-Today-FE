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
import { EContentGroupQueries } from '@/constants/react-query';
import {
  baseGroupSchema,
  IBaseGroupSchema,
  IUpdateGroupSchema,
} from '@/lib/validation';
import { IGroup } from '@/types/group';
import { EUserRole, IGroupDropdownUser } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';
import { useDebounce } from 'use-debounce';
import RHFProfileImageUpload from '../RHFInputs/RHFProfileImageUpload';
import RHFTextarea from '../RHFInputs/RHFTextarea';

// ----------------------------------------------------------------

interface ICreateGroup {
  viewerId: string;
  group?: IGroup;
}

const CreateGroup: React.FC<ICreateGroup> = ({ viewerId, group }) => {
  const [q, setQ] = useState('');
  const [debouncedQ] = useDebounce(q, 500);
  const router = useRouter();

  const {
    data: users,
    error: usersError,
    isLoading: isFetchingUsers,
  } = useQuery<IGroupDropdownUser[]>({
    queryKey: [EContentGroupQueries.FETCH_USERS, debouncedQ],
    queryFn: () => fetchUsers(debouncedQ),
  });

  const { mutateAsync: createGroupAsync } = useMutation({
    mutationFn: async ({
      data,
      members,
    }: {
      data: IBaseGroupSchema;
      members: { userId: string; role: EUserRole }[];
    }) => {
      await createGroup(data, members);
    },
    mutationKey: [EContentGroupQueries.CREATE_GROUP],
  });

  const { mutateAsync: updateGroupAsync } = useMutation({
    mutationFn: async (data: IUpdateGroupSchema) => {
      await updateGroup(group?.id || '', data);
    },
    mutationKey: [EContentGroupQueries.UPDATE_GROUP],
  });

  const userOptions = users?.map((user) => ({
    label: user.userName,
    value: user.id,
    avatarImage: user.avatarImg,
  }));

  const form = useForm<IBaseGroupSchema>({
    resolver: zodResolver(baseGroupSchema),
    defaultValues: {
      authorId: group?.authorId || viewerId,
      name: group?.name || '',
      profileImage: group?.profileImage || null,
      coverImage: group?.coverImage || null,
      bio: group?.bio || '',
      admins: [],
      members: [],
    },
  });

  const coverImage = form.watch('coverImage');

  const onSubmit = async (data: IBaseGroupSchema) => {
    const modifiedMembers = data.members.map((member) => {
      return { userId: member.value, role: EUserRole.USER };
    });

    const modifiedAdmins = data.admins.map((admin) => {
      return { userId: admin.value, role: EUserRole.ADMIN };
    });

    try {
      if (group) {
        await updateGroupAsync(data);
        toast.success('Group updated successfully.');
        router.push(`/groups/${group.id}`);
      } else {
        await createGroupAsync({
          data,
          members: [...modifiedMembers, ...modifiedAdmins],
        });
        toast.success('Group created successfully.');
        router.push('/groups');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  };

  const cleanupBodyOverflow = () => {
    document.body.style.overflow = '';
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-3 md:px-0"
        >
          <RHFInput
            name="name"
            label="Group name"
            placeholder="Write a title of the post"
          />
          <RHFProfileImageUpload name="profileImage" />
          <FormField
            name="coverImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  {coverImage ? (
                    <div className="relative w-full h-64">
                      <Image
                        src={coverImage}
                        alt="Cover Image"
                        layout="fill"
                        className="rounded-3xl object-cover"
                      />
                      <Button
                        type="button"
                        onClick={() => form.setValue('coverImage', '')}
                        className="absolute right-0 top-[-40px] hover:bg-black-700 text-white-400 dark:border-gray-500 size-8 dark:text-white-100"
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-64 dashed-border !text-white-400 rounded-lg flex items-center justify-center">
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
                              className="flex items-center max-w-[200px] dark:bg-black-800 py-2 rounded-lg bg-white-100 gap-3 mb-3"
                            >
                              <Image
                                src={'/assets/icons/upload-icon.svg'}
                                alt="upload"
                                width={16}
                                height={16}
                              />
                              <p className="p3-regular">Upload a cover image</p>
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
          <RHFTextarea name="bio" label="Bio" />
          {!group && (
            <FormField
              control={form.control}
              name="admins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add admins</FormLabel>
                  <FormControl>
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
                        multiValueLabel: () => 'dark:!text-white-200 !cap-10',
                        multiValueRemove: () =>
                          '!bg-white-200 !text-white-400 !ml-1 size-[20px] !rounded-3xl items-center self-center',
                        option: () =>
                          '!bg-white-100  !py-[18px]  dark:!bg-black-800  dark:!text-white-100 !text-black-800',
                        singleValue: () => 'dark:!text-white-100',
                        menu: () =>
                          'bg-white-100 dark:bg-black-800 !shadow-sm ',
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
                            <div className="flex items-center gap-1">
                              <div className="flex-center size-[20px] bg-white-100 rounded-full">
                                <Image
                                  src={'/assets/images/avatars/avatar-2.svg'}
                                  alt={option?.label}
                                  width={16}
                                  height={16}
                                />
                              </div>
                              {option.label}
                            </div>
                          );
                        }
                        return (
                          <div className="flex items-center">
                            <p className="p4-medium">{option.label}</p>
                          </div>
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!group && (
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add members</FormLabel>
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
                      multiValueLabel: () => 'dark:!text-white-200 !cap-10',
                      multiValueRemove: () =>
                        '!bg-white-200 !text-white-400 !ml-1 size-[20px] !rounded-3xl items-center self-center',
                      option: () =>
                        '!bg-white-100  !py-[18px]  dark:!bg-black-800  dark:!text-white-100 !text-black-800',
                      singleValue: () => 'dark:!text-white-100',
                      menu: () => 'bg-white-100 dark:bg-black-800 !shadow-sm',
                    }}
                    isMulti
                    onInputChange={(value) => setQ(value)}
                    isOptionDisabled={(option) => {
                      const tooLong = field.value.length >= 10;
                      if (tooLong) return true;

                      if (
                        form
                          .getValues()
                          .admins.filter(
                            (admin) => admin.value === option.value
                          ).length > 0
                      )
                        return true;

                      return false;
                    }}
                    options={userOptions}
                    formatOptionLabel={(option, { context }) => {
                      if (context === 'value') {
                        return (
                          <div className="flex items-center gap-1">
                            <div className="flex-center size-[20px] bg-white-100 rounded-full">
                              <Image
                                src={'/assets/images/avatars/avatar-2.svg'}
                                alt={option.label}
                                width={16}
                                height={16}
                              />
                            </div>
                            {option.label}
                          </div>
                        );
                      }
                      return (
                        <div className="flex items-center">
                          <p className="p4-medium ml-2">{option.label}</p>
                        </div>
                      );
                    }}
                  />
                </FormItem>
              )}
            />
          )}
          <div className="flex max-sm:flex-col gap-5 p3-bold">
            <Button
              onClick={() => form.reset()}
              type="button"
              variant="cancel"
              size="large"
              className="hover:!bg-primary-500 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? group
                  ? 'Updating Group...'
                  : 'Creating Group...'
                : group
                  ? 'Update Group'
                  : 'Create Group'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateGroup;

{
  /* <div className="w-full  !text-white-400 gap-3 rounded-lg flex items-center">
                    <div
                      className={`bg-light100__dark800 ${profileImage ? 'rounded-full' : 'rounded-full p-4'}`}
                    >
                      <Image
                        src={profileImage || '/assets/icons/basic-image.svg'}
                        alt="upload"
                        width={profileImage ? 32 : 24}
                        height={profileImage ? 32 : 24}
                        className={`${profileImage ? 'object-cover w-11 invert-0 h-11 rounded-full' : ''}`}
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
                            <p className="p3-regular">Set a profile photo</p>
                          </Button>
                        )}
                      </CldUploadWidget>
                    </div>
                  </div> */
}
