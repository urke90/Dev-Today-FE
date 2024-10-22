import GroupsPageLoader from '@/components/shared/Loaders/GroupsPageLoader';

// ----------------------------------------------------------------

const loading = () => {
  return (
    <section className="px-3.5 lg:px-5">
      <GroupsPageLoader />
    </section>
  );
};

export default loading;
