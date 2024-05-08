import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/validation';
import RHFInput from '@/components/RHFInputs/RHFInput';

// ----------------------------------------------------------------

interface IUserEditPageProps {}

const UserEditPage: React.FC<IUserEditPageProps> = (props) => {
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
    <section className="flex flex-col gap-6">
      <Form {...form}>
        <div>OVO JE ZA IMAGE DIV NAPRAVITI POSLE </div>
        <RHFInput name="name" placeholder="Name" />
        <RHFInput name="userName" placeholder="Username" />
        <RHFInput name="bio" placeholder="Enter something about yourself" />
      </Form>
    </section>
  );
};

export default UserEditPage;
