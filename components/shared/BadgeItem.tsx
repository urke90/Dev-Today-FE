// ----------------------------------------------------------------
interface IBadgeItemProps {
  isTechStackItem?: boolean;
  title: string;
  classNames?: string;
}

const BadgeItem: React.FC<IBadgeItemProps> = ({
  title,
  isTechStackItem = false,
}) => {
  return (
    <li
      className={`cap-8 md:cap-10 bg-white-200 px-2.5 py-1 text-white-400 dark:bg-black-700 dark:text-white-300 ${isTechStackItem ? 'subtitle-normal rounded capitalize' : 'cap-10 rounded-[20px] uppercase'} `}
    >
      {title}
    </li>
  );
};

export default BadgeItem;
