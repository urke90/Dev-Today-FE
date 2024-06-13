import { IGroup } from '@/types/group';
import GroupItemCard from '../shared/GroupItemCard';

// ----------------------------------------------------------------

interface IGroupContentProps {
  groups: IGroup[];
}

const GroupContent: React.FC<IGroupContentProps> = ({ groups }) => {
  return (
    <ul className="grid grid-cols-2 gap-y-3.5 gap-x-5 mb-5 md:mb-10">
      {groups?.length > 0 ? (
        groups.map(({ id, coverImage, bio, name, members }) => (
          <GroupItemCard
            key={id}
            id={id}
            coverImage={coverImage}
            description={bio}
            title={name}
            members={members}
          />
        ))
      ) : (
        <h2 className="h2-bold">There are no groups to show at the moment!</h2>
      )}
    </ul>
  );
};

export default GroupContent;
