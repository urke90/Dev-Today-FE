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

  // TODO FETCH RADIMO U PAGE I PROSLEDJUJEMO U KOMPONENTU

  /**
   * 1. IUser
   * 2. user: IUser i content: IPost[] | IMeetupe[] | IPodcast[]  samo ovo  ==========> IContent[]
   * 3.
   */

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome />
    </section>
  );
};

export default UserProfilePage;
