'use client';

import { fetchAllContents } from '@/api/queries';
import type { IContentPagesResponse } from '@/types/content';
import { EQueryType, ESortByFilter } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { updateContentQueryKey } from '@/utils/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
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

  const likeOrDislikeContent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await typedFetch({
        url: `/user/content/${viewerId}/like`,
        method: 'POST',
        body: { contentId },
      });
      queryClient.setQueryData(
        [updateContentQueryKey(contentType), contentType, page],
        {
          ...data,
          contents: data?.contents.map((content) =>
            content.id === contentId
              ? { ...content, isLiked: !content.isLiked }
              : content
          ),
        }
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  const renderContent = () => {
    let styles;
    let renderedContent;

    switch (contentType) {
      case EQueryType.POST:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent = data?.contents?.map(
            ({
              id,
              title,
              coverImage,
              description,
              tags,
              createdAt,
              viewsCount,
              likesCount,
              commentsCount,
              isLiked,
              author,
            }) => (
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
                handleLikeContent={likeOrDislikeContent}
              />
            )
          );
        }
        break;
      case EQueryType.MEETUP:
        {
          styles = 'flex flex-col flax-wrap gap-5';
          renderedContent = data?.contents?.map(
            ({ id, meetupDate, title, description, coverImage, tags }) => (
              <MeetupItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
                location="Innovation Hub, Austin"
                meetupDate={meetupDate}
              />
            )
          );
        }
        break;
      case EQueryType.PODCAST:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent = data?.contents?.map(
            ({
              id,
              coverImage,
              title,
              description,
              tags,
              createdAt,
              isLiked,
              author,
            }) => (
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
                handleLikeContent={likeOrDislikeContent}
              />
            )
          );
        }
        break;
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = data?.contents?.map(
          ({
            id,
            title,
            coverImage,
            description,
            tags,
            createdAt,
            viewsCount,
            likesCount,
            commentsCount,
            isLiked,
            author,
          }) => (
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
              handleLikeContent={likeOrDislikeContent}
            />
          )
        );
      }
    }

    return {
      styles,
      renderedContent,
    };
  };

  const { renderedContent, styles } = renderContent();

  return (
    <>
      <ul className={`mb-5 md:mb-10 ${styles}`}>{renderedContent}</ul>
      <Pagination
        currentPage={page}
        disableNextBtn={!data.hasNextPage}
        disablePrevBtn={page === 1}
        totalPages={data.totalPages}
        setPage={setPage}
      />
    </>
  );
};

export default ContentList;
