import SingleContentPageLoader from '@/components/shared/Loaders/SingleContentPageLoader';

const loading = () => {
  return (
    <section className="px-3.5 lg:px-5">
      <SingleContentPageLoader />
    </section>
  );
};

export default loading;
