import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ISidebarGroupItemProps {
  id: string;
  profileImage: string | null;
  name: string;
  totalItems: number | undefined;
}

const SidebarGroupItem: React.FC<ISidebarGroupItemProps> = ({
  id,
  totalItems = 0,
  profileImage,
  name,
}) => {
  return (
    <li>
      <Link
        href={'/groups/' + id}
        className="hover-sidebar-items flex gap-2.5 rounded-md"
      >
        <Image
          src={profileImage || '/assets/icons/image-preview.svg'}
          width={32}
          height={32}
          alt={name}
          className="shrink-0 rounded"
        />
        <div>
          <p className="p4-medium line-clamp-1">{name}</p>
          <p className="subtitle-normal line-clamp-1">
            {totalItems} Posts Published
          </p>
        </div>
      </Link>
    </li>
  );
};

export default SidebarGroupItem;
