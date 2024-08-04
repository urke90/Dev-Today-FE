'use client';

import { fetchAllContents } from '@/api/queries';
import type { IContentPagesResponse } from '@/types/content';
import { EQueryType, ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { updateContentQueryKey } from '@/utils/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../shared/LoadingSpinner';
import MeetupItemCard from '../shared/MeetupItemCard';
import Pagination from '../shared/Pagination';
import PodcastItemCard from '../shared/PodcastItemCard';
import PostItemCard from '../shared/PostItemCard';

// ----------------------------------------------------------------

interface IContentListProps {
  contentData: IContentPagesResponse;
  contentType: EQueryType;
  viewerId: string;
  sortBy: ESortByFilter;
}

const ContentList: React.FC<IContentListProps> = ({
  contentData,
  contentType,
  viewerId,
  sortBy,
}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { isLoading, data } = useQuery<IContentPagesResponse>({
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchAllContents(contentType, page, viewerId, 4, sortBy),
    initialData: contentData,
  });

  const handleLikeContent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await typedFetch({
        url: `/content/${viewerId}/like`,
        method: 'POST',
        body: { contentId },
      });
      queryClient.setQueryData(
        [updateContentQueryKey(contentType), contentType, page],
        {
          ...data,
          contents: data?.contents.map((content) =>
            content.id === contentId ? { ...content, isLiked: true } : content
          ),
        }
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  const handleDislikeContent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await typedFetch({
        url: `/content/${viewerId}/dislike`,
        method: 'DELETE',
        body: { contentId },
      });
      queryClient.setQueryData(
        [updateContentQueryKey(contentType), contentType, page],
        {
          ...data,
          contents: data?.contents.map((content) =>
            content.id === contentId ? { ...content, isLiked: false } : content
          ),
        }
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  useEffect(() => {
    queryClient.setQueryData(
      [updateContentQueryKey(contentType), contentType, 1],
      contentData
    );
  }, [sortBy]);

  const renderContent = () => {
    let styles;

    const renderedContent = data.contents.map(
      ({
        id,
        coverImage,
        title,
        description,
        tags,
        createdAt,
        author,
        viewsCount,
        likesCount,
        commentsCount,
        isLiked,
        meetupDate,
        meetupLocation,
      }) => {
        switch (contentType) {
          case EQueryType.POST: {
            styles = 'flex flex-col flex-wrap gap-5';
            return (
              <PostItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
                createdAt={createdAt}
                author={author.userName}
                viewsCount={viewsCount}
                likesCount={likesCount}
                commentsCount={commentsCount}
                isLiked={isLiked}
                handleLikeContent={handleLikeContent}
                handleDislikeContent={handleDislikeContent}
              />
            );
          }
          case EQueryType.MEETUP: {
            styles = 'flex flex-col flax-wrap gap-5';
            return (
              <MeetupItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
                address={meetupLocation?.address}
                meetupDate={meetupDate}
              />
            );
          }
          case EQueryType.PODCAST: {
            styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
            return (
              <PodcastItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
                author={author.userName}
                createdAt={createdAt}
                isLiked={isLiked}
                handleLikeContent={handleLikeContent}
                handleDislikeContent={handleDislikeContent}
              />
            );
          }
          default: {
            return <li className="h2-bold">Invalid Type</li>;
          }
        }
      }
    );

    return {
      styles,
      renderedContent,
    };
  };

  const { renderedContent, styles } = renderContent();

  return (
    <>
      <ul className={`mb-5 md:mb-10 ${styles}`}>{renderedContent}</ul>
      {isLoading && (
        <div className="p-0.5">
          <LoadingSpinner />
        </div>
      )}
      {data.contents.length > 0 ? (
        <Pagination
          currentPage={page}
          disableNextBtn={!data.hasNextPage}
          disablePrevBtn={page === 1}
          totalPages={data.totalPages}
          setPage={setPage}
        />
      ) : (
        <h2 className="h2-medium">There is no content to show at the moment</h2>
      )}
    </>
  );
};

export default ContentList;
