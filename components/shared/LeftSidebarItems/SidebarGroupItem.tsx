import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ISidebarGroupItemProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const SidebarGroupItem: React.FC<ISidebarGroupItemProps> = ({
  id,
  description,
  imageUrl,
  title,
}) => {
  return (
    <li>
      <Link href={'/group/' + id} className="flex gap-2.5">
        <Image
          src={imageUrl || '/assets/icons/image-preview.svg'}
          width={32}
          height={32}
          alt={title}
          className="shrink-0"
        />
        <div>
          <p className="p4-medium line-clamp-1">{title}</p>
          <p className="subtitle-normal line-clamp-1">{description}</p>
        </div>
      </Link>
    </li>
  );
};

export default SidebarGroupItem;
