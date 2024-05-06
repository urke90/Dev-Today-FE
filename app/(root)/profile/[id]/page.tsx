import ProfileHome from '@/components/profile/ProfileHome';
// ----------------------------------------------------------------

interface IUserProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfilePage: React.FC<IUserProfilePageProps> = ({ params }) => {
  const id = params.id;
  return (
    <section className="px-3.5 lg:px-10">
      <ProfileHome />
    </section>
  );
};

export default UserProfilePage;
