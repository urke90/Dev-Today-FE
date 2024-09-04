'use client';
import {
  generateSelectStyles,
  MemberAdminFormatedOption,
} from '../RHFInputs/RHFMultipleSelect';
import RHFProfileImageUpload from '../RHFInputs/RHFProfileImageUpload';
import RHFTextarea from '../RHFInputs/RHFTextarea';

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
import { revalidateRoute } from '@/lib/actions/revalidate';
import {
  baseGroupSchema,
  IBaseGroupSchema,
  IUpdateGroupSchema,
} from '@/lib/validation';
import { IGroup } from '@/types/group';
import { EUserRole, IGroupDropdownUser } from '@/types/user';
import { createGroup, updateGroup } from '@/utils/mutations';
import { fetchUsers } from '@/utils/queries';

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
      authorId: group ? group?.authorId : viewerId,
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
        revalidateRoute(`/groups/${group.id}`);
        router.push(`/groups/${group.id}`);
      } else {
        await createGroupAsync({
          data,
          members: [...modifiedMembers, ...modifiedAdmins],
        });
        revalidateRoute('/groups/');
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
          className="w-full space-y-8 px-3 md:px-0"
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
                    <div className="relative h-64 w-full">
                      <Image
                        src={coverImage}
                        alt="Cover Image"
                        fill
                        className="w-full rounded-3xl object-cover"
                      />
                      <Button
                        type="button"
                        onClick={() => form.setValue('coverImage', null)}
                        className="text-white-400 hover:bg-black-700 dark:text-white-100 absolute right-0 top-[-40px] size-8 dark:border-gray-500"
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
                              className="bg-white-100 dark:bg-black-800 mb-3 flex max-w-[200px] items-center gap-3 rounded-lg py-2"
                            >
                              <Image
                                src="/assets/icons/upload-icon.svg"
                                alt="upload"
                                width={16}
                                height={16}
                                className="size-4"
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
                      {...field}
                      classNames={generateSelectStyles()}
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
                      formatOptionLabel={MemberAdminFormatedOption}
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
                    // className="border rounded-md dark:border-black-700/50"
                    {...field}
                    classNames={generateSelectStyles()}
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
                    formatOptionLabel={MemberAdminFormatedOption}
                  />
                </FormItem>
              )}
            />
          )}
          <div className="p3-bold flex gap-5 max-sm:flex-col">
            <Button
              onClick={() => form.reset()}
              type="button"
              variant="cancel"
              size="large"
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
