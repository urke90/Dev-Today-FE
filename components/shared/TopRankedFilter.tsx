import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------

interface ITopRankedFilterProps {
  title: string;
  items?: {
    id: string;
    itemTitle: string;
    imageUrl: string;
    text: string;
  }[];
}

const TopRankedFilter: React.FC<ITopRankedFilterProps> = ({ title, items }) => {
  return (
    <div className="left-sidebar-item gap-3">
      <p className="p2-bold">{title}</p>
      <ul className="flex flex-col gap-3.5">
        {items?.map(({ id, itemTitle, imageUrl, text }) => (
          <li key={id}>
            <Link href="/" className="flex gap-2.5">
              <Image
                src={imageUrl || '/assets/icons/image-preview.svg'}
                width={32}
                height={32}
                alt={itemTitle}
                className="shrink-0"
              />
              <div>
                <p className="p4-medium line-clamp-1">{itemTitle}</p>
                <p className="subtitle-normal line-clamp-1">{text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRankedFilter;
