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
      className={`py-1 bg-white-200 dark:bg-black-700 px-2.5 text-white-400 dark:text-white-300 cap-8 md:cap-10 ${
        isTechStackItem
          ? 'capitalize rounded subtitle-normal'
          : 'uppercase rounded-[20px] cap-10'
      }`}
    >
      {title}
    </li>
  );
};

export default BadgeItem;
