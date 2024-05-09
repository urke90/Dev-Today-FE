'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/validation';
import { Button } from '../ui/button';
import RHFInput from '@/components/RHFInputs/RHFInput';
import RHFTextarea from '../RHFInputs/RHFTextarea';

// ----------------------------------------------------------------

interface IEditProfileProps {}

const EditProfile: React.FC<IEditProfileProps> = (props) => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userId: '',
      userName: '',
      name: '',
      email: '',
      preferredSkills: [],
      contents: [],
      likedContents: [],
      bio: '',
      avatarImg: '',
      createdAt: undefined,
      instagramName: '',
      instagramLink: '',
      linkedinName: '',
      linkedinLink: '',
      twitterName: '',
      twitterLink: '',
      followers: '',
      following: '',
    },
  });

  return (
    <section className="create-page-wrapper">
      <Form {...form}>
        <div>OVO JE ZA IMAGE DIV NAPRAVITI POSLE </div>
        <RHFInput name="name" label="Name" placeholder="Name" />
        <RHFInput name="userName" label="Username" placeholder="Username" />
        <RHFTextarea
          name="bio"
          label="Bio"
          placeholder="Enter something about yourself..."
        />
        <div>OVDE JE REACT SELECT SHAD CN SEELCET</div>
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
          <RHFInput name="twitterName" label="LinkedIn" placeholder="Twitter" />
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
          <Button variant="cancel">Cancel</Button>
          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default EditProfile;
