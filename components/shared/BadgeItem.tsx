interface IBadgeItemProps {
  isTechStackItem?: boolean;
  title: string;
}

const BadgeItem: React.FC<IBadgeItemProps> = ({
  title,
  isTechStackItem = false,
}) => {
  return (
    <li
      // className="py-1 bg-white-200 dark:bg-black-700 px-2.5 subtitle text-white-400 dark:text-white-200 rounded capitalize"
      className={`py-1 bg-white-200 dark:bg-black-700 px-2.5 subtitle text-white-400 dark:text-white-200   ${
        isTechStackItem ? 'capitalize rounded' : 'uppercase rounded-[20px]'
      }`}
    >
      {title}
    </li>
  );
};

export default BadgeItem;
