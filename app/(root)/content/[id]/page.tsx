import ContentDetails from '@/components/content/contentDetails/ContentDetails';
import LeftSideBar from '@/components/content/leftSideBar/LeftSideBar';
import RightSideBar from '@/components/content/rightSideBar/RightSideBar';

type ParamsProps = {
  params: {
    id: string;
  };
};

const Content = (props: ParamsProps) => {
  const { id } = props.params;

  return (
    <div className="content-wrapper">
      <LeftSideBar />
      <ContentDetails id={id} />
      <RightSideBar />
    </div>
  );
};
export default Content;
