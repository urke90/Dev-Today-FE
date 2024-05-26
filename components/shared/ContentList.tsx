'use client';

import GroupItemCard from './GroupItemCard';
import LoadingSpinner from './LoadingSpinner';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import PostItemCard from './PostItemCard';

import { useQuery } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';

import { fetchContent, fetchGroups } from '@/api/queries';
import { EContentGroupItemsQueries } from '@/constants/react-query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import { typedFetch } from '@/utils/api';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------

const getShouldFetch = (items: IContent[] | IGroup[]) => {
  return items.length % 6 === 0 && items.length !== 0;
};

const updateContentQueryKey = (contentType: EQueryContentType) => {
  if (contentType === EQueryContentType.GROUPS) {
    return;
  }
  const FETCH_QUERIES = {
    posts: EContentGroupItemsQueries.FETCH_POSTS,
    meetups: EContentGroupItemsQueries.FETCH_MEETUPS,
    podcasts: EContentGroupItemsQueries.FETCH_PODCASTS,
  };

  return FETCH_QUERIES[contentType];
};

interface IContentListProps {
  contentType: EQueryContentType;
  contentItems: IContent[];
  groupItems: IGroup[];
  userId: string;
  userName: string;
  viewerId: string;
}

const ContentList: React.FC<IContentListProps> = ({
  contentType,
  contentItems,
  groupItems,
  userId,
  userName,
  viewerId,
}) => {
  const [content, setContent] = useState<IContent[]>(contentItems);
  const [groups, setGroups] = useState<IGroup[]>(groupItems);
  const [page, setPage] = useState(1);

  const likeOrDislikeContent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await typedFetch({
        url: `/user/content/${userId}/like`,
        method: 'POST',
        body: { contentId },
      });
      setContent((prevContent) =>
        prevContent.map((content) =>
          content.id === contentId
            ? { ...content, isLiked: !content.isLiked }
            : content
        )
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  const shouldFetch = getShouldFetch(
    contentType === EQueryContentType.GROUPS ? groups : content
  );

  const updatePage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<IContent[]>({
    queryKey: [updateContentQueryKey(contentType), contentType, userId, page],
    queryFn: () => fetchContent(userId, contentType, page, viewerId),
    enabled:
      shouldFetch && contentType !== EQueryContentType.GROUPS && page !== 1,
    retry: false,
  });

  const {
    isLoading: isLoadingGroups,
    error: groupsError,
    data: groupsData,
  } = useQuery<IGroup[]>({
    queryKey: [EContentGroupItemsQueries.FETCH_GROUPS, userId, page],
    queryFn: () => fetchGroups(userId, page),
    enabled:
      shouldFetch && contentType === EQueryContentType.GROUPS && page !== 1,
    retry: false,
  });

  const { lastListItemRef } = useInfiniteScroll({
    updatePage,
    isLoading: isLoadingContent || isLoadingGroups,
    shouldFetch,
  });

  useEffect(() => {
    if (groupsData) {
      setGroups((prevGroups) => [...prevGroups, ...groupsData]);
    }
  }, [groupsData]);

  useEffect(() => {
    if (contentData) {
      setContent((prevContent) => [...prevContent, ...contentData]);
    }
  }, [contentData]);

  useEffect(() => {
    setPage(1);
  }, [contentType]);

  const renderContent = () => {
    let styles;
    let renderedContent;

    switch (contentType) {
      case EQueryContentType.POSTS:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent = content?.map(
            ({
              id,
              title,
              coverImage,
              description,
              storyTags,
              createdAt,
              viewsCount,
              likesCount,
              commentsCount,
              isLiked,
            }) => (
              <PostItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={storyTags}
                createdAt={createdAt}
                author={userName}
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
      case EQueryContentType.MEETUPS:
        {
          styles = 'flex flex-col flax-wrap gap-5';
          renderedContent = content?.map(
            ({ id, meetupDate, title, description, coverImage, storyTags }) => (
              <MeetupItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={storyTags}
                location="Innovation Hub, Austin"
                meetupDate={meetupDate}
              />
            )
          );
        }
        break;
      case EQueryContentType.PODCASTS:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent = content?.map(
            ({
              id,
              coverImage,
              title,
              description,
              storyTags,
              createdAt,
              isLiked,
            }) => (
              <PodcastItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={storyTags}
                author={userName}
                createdAt={createdAt}
                isLiked={isLiked}
                handleLikeContent={likeOrDislikeContent}
              />
            )
          );
        }
        break;
      case EQueryContentType.GROUPS:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent = groups?.map(
            ({ id, groupBio, coverImg, members, name }) => (
              <GroupItemCard
                key={id}
                id={id}
                coverImage={coverImg}
                title={name}
                description={groupBio}
                members={members}
              />
            )
          );
        }
        break;
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = content?.map(
          ({
            id,
            title,
            coverImage,
            description,
            storyTags,
            createdAt,
            viewsCount,
            likesCount,
            commentsCount,
            isLiked,
          }) => (
            <PostItemCard
              key={id}
              id={id}
              coverImage={coverImage}
              title={title}
              description={description}
              tags={storyTags}
              createdAt={createdAt}
              author={userName}
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
    <ul className={styles}>
      {renderedContent}
      <li ref={lastListItemRef} />
      {(isLoadingContent || isLoadingGroups) && (
        <li>
          <LoadingSpinner />
        </li>
      )}
    </ul>
  );
};

export default memo(ContentList);
