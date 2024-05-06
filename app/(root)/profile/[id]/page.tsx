import ProfileHome from '@/components/profile/ProfileHome';

// ----------------------------------------------------------------

interface IUserProfilePageProps {
  params: {
    id: string;
  };
  searchParams: {
    page: string | string[] | undefined;
    contentType: string | string[] | undefined;
  };
}

const UserProfilePage: React.FC<IUserProfilePageProps> = ({ params }) => {
  const id = params.id;

  // TODO proveriti da li je string | string[] | undefined; i u zavisnoti odraditi akcijuuradiit flow ceo

  return (
    <section className="">
      <ProfileHome />
    </section>
  );
};

export default UserProfilePage;
