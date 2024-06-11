import GroupHome from '@/components/group/GroupHome';

interface IGroupsPageProps {}

const GroupsPage: React.FC<IGroupsPageProps> = (props) => {
  return (
    <section className="px-3.5 lg:px-5">
      <GroupHome />
    </section>
  );
};

export default GroupsPage;
