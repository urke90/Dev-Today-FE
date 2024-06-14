import GroupDetails from '@/components/group/GroupDetails';
import { IGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';

interface IGroupDetailsPage {
  params: {
    id: string;
  };
}

const GroupDetailsPage: React.FC<IGroupDetailsPage> = async ({ params }) => {
  const id = params.id;

  const group = await typedFetch<IGroup>({ url: `/groups/${id}` });
  if (!group)
    throw new Error(
      "Internal server error. Can' show group details at the moment."
    );

  return (
    <section className="px-3.5 lg:px-5">
      <GroupDetails group={group} />
    </section>
  );
};

export default GroupDetailsPage;
