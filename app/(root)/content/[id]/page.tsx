import ContentDetails from '@/components/content/contentDetails/ContentDetails';
import LeftSideBar from '@/components/content/leftSideBar/LeftSideBar';
import RightSideBar from '@/components/content/rightSideBar/RightSideBar';
import { IContent } from '@/types/content';
import { IProfileUser } from '@/types/user';
import { typedFetch } from '@/utils/api';
import { getFirstName } from '@/utils/format';

type ParamsProps = {
  params: {
    id: string;
  };
};

type UserProps = {
  isFollowing: boolean;
  user: IProfileUser;
};

const Content = async (props: ParamsProps) => {
  const { id } = props.params;

  if (!id) throw new Error('No id provided');

  const contentDetails = await typedFetch<IContent>({
    url: `/content/${id}`,
    cache: 'no-cache',
  });

  const getAuthorDetails = await typedFetch<UserProps>({
    url: `/user/${contentDetails.authorId}`,
  });

  let authorName = getAuthorDetails.user.userName;

  authorName = getFirstName(authorName);

  return (
    <div className="content-wrapper">
      <LeftSideBar content={contentDetails} authorName={authorName} />
      <ContentDetails content={contentDetails} />
      <RightSideBar
        content={contentDetails}
        getAuthorDetails={getAuthorDetails}
      />
    </div>
  );
};
export default Content;
