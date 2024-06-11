import { auth } from '@/app/api/auth/[...nextauth]/route';

interface IGroupsPageProps {}

const GroupsPage: React.FC<IGroupsPageProps> = async (props) => {
  const session = await auth();
  console.log('SESSION U GROUPSPAGE', session);

  return <div className="content-wrapper">GroupsPage</div>;
};

export default GroupsPage;
