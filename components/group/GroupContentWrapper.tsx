'use client';

// ----------------------------------------------------------------

import { fetchGroupContent } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { IContent } from '@/types/content';
import { EQueryType } from '@/types/queries';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ContentNavLinks from '../shared/ContentNavLinks';
import LoadingSpinner from '../shared/LoadingSpinner';
import Pagination from '../shared/Pagination';

// ----------------------------------------------------------------

const getShouldFetch = (items: IContent[]) => {
  return items.length % 6 === 0 && items.length !== 0;
};

const updateContentQueryKey = (contentType: EQueryType) => {
  if (contentType === EQueryType.GROUP) {
    return;
  }
  const FETCH_QUERIES = {
    post: EContentGroupQueries.FETCH_POSTS,
    meetup: EContentGroupQueries.FETCH_MEETUPS,
    podcast: EContentGroupQueries.FETCH_PODCASTS,
    members: EContentGroupQueries.FETCH_MEMBERS,
  };

  return FETCH_QUERIES[contentType];
};

interface IGroupContentWrapperProps {
  contentType: EQueryType;
}

const GroupContentWrapper: React.FC<IGroupContentWrapperProps> = ({
  contentType,
}) => {
  const [page, setPage] = useState(2);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<IContent[]>({
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchGroupContent(page, contentType),
    // enabled: shouldFetch && contentType !== EQueryType.GROUP && page !== 1,
    retry: false,
  });

  const renderContent = () => {
    let styles;
    let renderedContent;

    // switch (tab) {
    //   case EQueryType.POST:
    //     {
    //       styles = 'flex flex-col flex-wrap gap-5';
    //       renderedContent = content?.map(
    //         ({
    //           id,
    //           title,
    //           coverImage,
    //           description,
    //           tags,
    //           createdAt,
    //           viewsCount,
    //           likesCount,
    //           commentsCount,
    //           isLiked,
    //         }) => (
    //           <PostItemCard
    //             key={id}
    //             id={id}
    //             coverImage={coverImage}
    //             title={title}
    //             description={description}
    //             tags={tags}
    //             createdAt={createdAt}
    //             author={userName}
    //             viewsCount={viewsCount}
    //             likesCount={likesCount}
    //             commentsCount={commentsCount}
    //             isLiked={isLiked}
    //             handleLikeContent={likeOrDislikeContent}
    //           />
    //         )
    //       );
    //     }
    //     break;
    //   case EQueryType.MEETUP:
    //     {
    //       styles = 'flex flex-col flax-wrap gap-5';
    //       renderedContent = content?.map(
    //         ({ id, meetupDate, title, description, coverImage, tags }) => (
    //           <MeetupItemCard
    //             key={id}
    //             id={id}
    //             coverImage={coverImage}
    //             title={title}
    //             description={description}
    //             tags={tags}
    //             location="Innovation Hub, Austin"
    //             meetupDate={meetupDate}
    //           />
    //         )
    //       );
    //     }
    //     break;
    //   case EQueryType.PODCAST:
    //     {
    //       styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
    //       renderedContent = content?.map(
    //         ({
    //           id,
    //           coverImage,
    //           title,
    //           description,
    //           tags,
    //           createdAt,
    //           isLiked,
    //         }) => (
    //           <PodcastItemCard
    //             key={id}
    //             id={id}
    //             coverImage={coverImage}
    //             title={title}
    //             description={description}
    //             tags={tags}
    //             author={userName}
    //             createdAt={createdAt}
    //             isLiked={isLiked}
    //             handleLikeContent={likeOrDislikeContent}
    //           />
    //         )
    //       );
    //     }
    //     break;
    //   case EQueryType.MEMBERS:
    //     {
    //       // styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
    //       // renderedContent = groups?.map(
    //       //   ({ id, bio, coverImage, members, name }) => (
    //       //     <GroupItemCard
    //       //       key={id}
    //       //       id={id}
    //       //       coverImage={coverImage}
    //       //       title={name}
    //       //       description={bio}
    //       //       members={members}
    //       //     />
    //       //   )
    //       // );
    //     }
    //     break;
    //   default: {
    //     styles = 'flex flex-col flax-wrap gap-5';
    //     renderedContent = content?.map(
    //       ({
    //         id,
    //         title,
    //         coverImage,
    //         description,
    //         tags,
    //         createdAt,
    //         viewsCount,
    //         likesCount,
    //         commentsCount,
    //         isLiked,
    //       }) => (
    //         <PostItemCard
    //           key={id}
    //           id={id}
    //           coverImage={coverImage}
    //           title={title}
    //           description={description}
    //           tags={tags}
    //           createdAt={createdAt}
    //           author={userName}
    //           viewsCount={viewsCount}
    //           likesCount={likesCount}
    //           commentsCount={commentsCount}
    //           isLiked={isLiked}
    //           handleLikeContent={likeOrDislikeContent}
    //         />
    //       )
    //     );
    //   }
    // }

    return {
      styles,
      renderedContent,
    };
  };

  const { renderedContent, styles } = renderContent();

  return (
    <>
      <ContentNavLinks isGroupPage />
      <ul className={styles}>
        {renderedContent}
        {false && (
          <li>
            <LoadingSpinner />
          </li>
        )}
      </ul>
      <Pagination
        currentPage={page}
        totalPage={24}
        disablePrevBtn={page === 1}
        disableNextBtn={false}
        setPage={setPage}
      />
    </>
  );
};

export default GroupContentWrapper;
