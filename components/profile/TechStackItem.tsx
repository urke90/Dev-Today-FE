interface ITechStackItemProps {
  title: string;
}

const TechStackItem: React.FC<ITechStackItemProps> = ({ title }) => {
  return (
    <li className="py-1 bg-white-200 dark:bg-black-700 px-2.5 subtitle text-white-400 dark:text-white-200 rounded capitalize">
      {title}
    </li>
  );
};

export default TechStackItem;
