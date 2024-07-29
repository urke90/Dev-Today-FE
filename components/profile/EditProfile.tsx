'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getCldImageUrl } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
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
import RHFProfileImageUpload from '../RHFInputs/RHFProfileImageUpload';

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
          <RHFProfileImageUpload name="avatarImg" />
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
