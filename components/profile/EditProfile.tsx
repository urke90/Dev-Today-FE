'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { typedFetch } from '@/utils/api';
import {
  CldUploadButton,
  CldImage,
  type CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { updateProfileSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import RHFInput from '@/components/RHFInputs/RHFInput';
import RHFTextarea from '../RHFInputs/RHFTextarea';
import RHFMultipleSelect from '../RHFInputs/RHFMultipleSelect';
import ImageUploadIcon from '../icons/ImageUpload';
import ImagePreviewIcon from '../icons/ImagePreview';
import type { IUser } from '@/types/user';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------

interface IEditProfileProps {
  user: IUser;
}

const EditProfile: React.FC<IEditProfileProps> = ({ user }) => {
  const router = useRouter();
  const {
    id,
    userName,
    name,
    preferredSkills,
    bio,
    avatarImg,
    instagramName,
    instagramLink,
    linkedinName,
    linkedinLink,
    twitterName,
    twitterLink,
  } = user ?? {};

  const PREFERRED_SKILLS_OPTIONS = preferredSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: name || '',
      userName: userName || '',
      bio: bio || '',
      preferredSkills: PREFERRED_SKILLS_OPTIONS || [],
      avatarImg: avatarImg || '',
      instagramName: instagramName || '',
      instagramLink: instagramLink || '',
      linkedinName: linkedinName || '',
      linkedinLink: linkedinLink || '',
      twitterName: twitterName || '',
      twitterLink: twitterLink || '',
    },
  });

  const { setValue } = form;

  const [previewImg, setPreveiwImg] = useState('');

  const handleUploadImage = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === 'string')
      return toast.error('Image upload failed!');

    setPreveiwImg(result.info.secure_url);
    setValue('avatarImg', result.info.secure_url);
  };

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    const mappedSkills = data.preferredSkills.map((skill) => skill.value);

    try {
      await typedFetch(`/user/${id}`, 'PATCH', undefined, {
        ...data,
        preferredSkills: mappedSkills,
      });
      toast.success('Profile successfully updated');
      router.push('/profile');
    } catch (error) {
      console.log('Error updating user profile', error);
      if (error instanceof Error) {
        console.log('Error updating user profile', error.message);
        toast.error("Could't update user profile");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="create-page-wrapper">
          <div className="flex gap-2.5 items-center">
            <div className="bg-white-100 dark:bg-black-800 rounded-full shrink-0 size-[60px] flex-center">
              {previewImg ? (
                <CldImage
                  src={previewImg}
                  width="60"
                  height="60"
                  crop="fill"
                  className="size-[60px] rounded-full"
                  alt="profile preview"
                />
              ) : (
                <ImagePreviewIcon className="icon-light400__dark300" />
              )}
            </div>
            <CldUploadButton
              className="flex bg-white-100 dark:bg-black-800 items-center gap-2.5 px-5 py-3 rounded-[5px] h-11"
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME}
              onSuccess={handleUploadImage}
              options={{
                multiple: false,
                cropping: true,
                croppingShowDimensions: true,
              }}
            >
              <ImageUploadIcon className="icon-light400__dark300" />
              <span className="p3-regular">Set a profile photo</span>
            </CldUploadButton>
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
          <div className="flex flex-col sm:flex-row gap-5 border-b dark:border-black-800 border-white-border">
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
          <div className="flex flex-col sm:flex-row gap-5 border-b dark:border-black-800 border-white-border">
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
          <div className="flex flex-col sm:flex-row gap-5 border-b dark:border-black-800 border-white-border">
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
          <div className="flex flex-col sm:flex-row sm:gap-5 gap-2.5">
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
