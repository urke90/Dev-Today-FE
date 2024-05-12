import ProfileHome from '@/components/profile/ProfileHome';
import { auth } from '@/app/api/auth/[...nextauth]/route';

// ----------------------------------------------------------------

interface IMyProfilePageProps {
  searchParams: {
    page: string | string[] | undefined;
    contentType: string | string[] | undefined;
  };
}

const MyProfilePage: React.FC<IMyProfilePageProps> = async ({
  searchParams,
}) => {
  try {
    const session = await auth();
    console.log('session user id', session?.user.id);
    console.log('session user id LENGTH', session?.user.id.length);
    // if (!session?.user)
    //   return (
    //     <section className="px-3.5 lg:px-5 mt-[100px]">
    //       <h1 className="d1-bold text-center text-white-300 dark:text-white:400">
    //         Something went wrong!
    //       </h1>
    //     </section>
    //   );

    const userResponse = await fetch(
      `http://localhost:8080/api/user/${session?.user.id}?userId=dada`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!userResponse.ok)
      console.log(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      );
    const userResult = await userResponse.json();
    console.log('userResult', userResult);

    // const userResult = await 'userResponseeeeeeeeeeeeeeeeee'.juserResponse();
    // console.log(
    //   'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    //   userResult
    // );
    // const contentResponse = await fetch(`http://localhost/8080/api`);
  } catch (error) {
    console.log('Error fetching the user', error);
  }

  return (
    <section className="px-3.5 lg:px-5">
      <ProfileHome isPersonalProfile />;
    </section>
  );
};

export default MyProfilePage;
