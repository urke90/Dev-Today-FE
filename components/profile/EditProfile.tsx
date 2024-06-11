'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CldUploadWidget,
  getCldImageUrl,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import z from 'zod';
import RHFMultipleSelect from '../RHFInputs/RHFMultipleSelect';
import RHFTextarea from '../RHFInputs/RHFTextarea';
import { Button } from '../ui/button';

import RHFInput from '@/components/RHFInputs/RHFInput';
import { Form } from '@/components/ui/form';
import { CLOUDINARY_URL } from '@/constants';
import { updateProfileSchema } from '@/lib/validation';
import type { IProfileUser } from '@/types/user';
import { typedFetch } from '@/utils/api';
import ImagePreviewIcon from '../icons/ImagePreview';
import ImageUploadIcon from '../icons/ImageUpload';

// ----------------------------------------------------------------

interface IEditProfileProps {
  user: IProfileUser;
}

const EditProfile: React.FC<IEditProfileProps> = ({ user }) => {
  const router = useRouter();

  const PREFERRED_SKILLS_OPTIONS = user?.preferredSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  let transformedAvatarImg = user.avatarImg;
  if (user.avatarImg.startsWith(CLOUDINARY_URL)) {
    transformedAvatarImg = getCldImageUrl({
      width: 60,
      height: 60,
      src: user.avatarImg,
      crop: 'fill',
    });
  }

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      userName: user?.userName || '',
      bio: user?.bio || '',
      preferredSkills: PREFERRED_SKILLS_OPTIONS || [],
      avatarImg: transformedAvatarImg || '',
      instagramName: user?.instagramName || '',
      instagramLink: user?.instagramLink || '',
      linkedinName: user?.linkedinName || '',
      linkedinLink: user?.linkedinLink || '',
      twitterName: user?.twitterName || '',
      twitterLink: user?.twitterLink || '',
    },
  });

  const { setValue } = form;

  const [previewImg, setPreveiwImg] = useState('');

  const handleUploadImage = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string')
      return toast.error('Image upload failed!');

    const transformedAvatarImg = getCldImageUrl({
      width: 60,
      height: 60,
      src: result.info.secure_url,
      crop: 'fill',
    });

    setPreveiwImg(transformedAvatarImg);
    setValue('avatarImg', result.info.secure_url);
  };

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const mappedSkills = data.preferredSkills.map((skill) => skill.value);

    try {
      await typedFetch({
        url: `/user/${user?.id}`,
        method: 'PATCH',
        body: {
          ...data,
          preferredSkills: mappedSkills,
        },
      });
      toast.success('Profile successfully updated');
      router.push('/profile');
    } catch (error) {
      console.log('Error updating user profile', error);
      if (error instanceof Error) {
        console.log('Error updating user profile', error.message);
        toast.error("Couldn't update user profile");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      >
        <div className="create-page-wrapper">
          <div className="flex items-center gap-2.5">
            <div className="flex-center bg-white-100 dark:bg-black-800 size-[60px] shrink-0 rounded-full">
              {previewImg ? (
                <Image
                  src={previewImg}
                  width={60}
                  height={60}
                  className="size-[60px] rounded-full"
                  alt="profile preview"
                />
              ) : (
                <ImagePreviewIcon className="icon-light400__dark300" />
              )}
            </div>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME}
              onSuccess={handleUploadImage}
              options={{
                multiple: false,
                cropping: true,
                croppingShowDimensions: true,
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    onClick={() => open()}
                    type="button"
                    className="bg-white-100 dark:bg-black-800 flex h-11 items-center gap-2.5 rounded-[5px] px-5 py-3 w-auto"
                  >
                    <ImageUploadIcon className="icon-light400__dark300" />
                    <span className="p3-regular">Set a profile photo</span>
                  </Button>
                );
              }}
            </CldUploadWidget>
          </div>
          <RHFInput name="name" label="Name" placeholder="Name" />
          <RHFInput name="userName" label="Username" placeholder="Username" />
          <RHFTextarea
            name="bio"
            label="Bio"
            placeholder="Enter something about yourself..."
          />
          <div>
            <RHFMultipleSelect
              label="Interested Technologies"
              name="preferredSkills"
              defaultValue={PREFERRED_SKILLS_OPTIONS}
              placeholder="Add a tag..."
              hideDropDown
            />
          </div>
          <p className="p1-bold">Social Media</p>
          <div className="border-white-border dark:border-black-800 flex flex-col gap-5 border-b sm:flex-row">
            <RHFInput
              name="linkedinName"
              label="LinkedIn"
              placeholder="Linkedin"
            />
            <RHFInput
              name="linkedinLink"
              label="Link"
              placeholder="https://linkedin.com/"
            />
          </div>
          <div className="border-white-border dark:border-black-800 flex flex-col gap-5 border-b sm:flex-row">
            <RHFInput
              name="twitterName"
              label="LinkedIn"
              placeholder="Twitter"
            />
            <RHFInput
              name="twitterLink"
              label="Link"
              placeholder="https://twitter.com/"
            />
          </div>
          <div className="border-white-border dark:border-black-800 flex flex-col gap-5 border-b sm:flex-row">
            <RHFInput
              name="instagramName"
              label="Instagram"
              placeholder="Instagram"
            />
            <RHFInput
              name="instagramLink"
              label="Link"
              placeholder="https://www.instagram.com/"
            />
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-5">
            <Button type="button" variant="cancel">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile;
