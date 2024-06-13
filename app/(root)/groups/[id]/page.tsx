import GroupDetails from '@/components/group/GroupDetails';

interface IGroupDetailsPage {}

const GroupDetailsPage: React.FC<IGroupDetailsPage> = () => {
  return (
    <section className="px-3.5 lg:px-5">
      <GroupDetails />
    </section>
  );
};

export default GroupDetailsPage;
