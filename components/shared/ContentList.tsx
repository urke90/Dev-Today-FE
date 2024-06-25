'use client';

import GroupItemCard from './GroupItemCard';
import LoadingSpinner from './LoadingSpinner';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import PostItemCard from './PostItemCard';

import { useQuery } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useState } from 'react';

import { fetchUserContent, fetchUserGroups } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import type { IContent } from '@/types/content';
import type { IProfilePageGroup } from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------

const getShouldFetch = (items: IContent[] | IProfilePageGroup[]) => {
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

interface IContentListProps {
  contentType: EQueryType;
  contentItems: IContent[];
  groupItems: IProfilePageGroup[];
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
  const [groups, setGroups] = useState<IProfilePageGroup[]>(groupItems);
  const [page, setPage] = useState(2);

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
    contentType === EQueryType.GROUP ? groups : content
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
    queryFn: () => fetchUserContent(userId, contentType, page, viewerId),
    enabled: shouldFetch && contentType !== EQueryType.GROUP && page !== 1,
    retry: false,
  });

  const {
    isLoading: isLoadingGroups,
    error: groupsError,
    data: groupsData,
  } = useQuery<IProfilePageGroup[]>({
    queryKey: [EContentGroupQueries.FETCH_GROUPS, userId, page],
    queryFn: () => fetchUserGroups(userId, page),
    enabled: shouldFetch && contentType === EQueryType.GROUP && page !== 1,
    retry: false,
  });

  const lastListItemRef = useInfiniteScroll({
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
      case EQueryType.POST:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent = content?.map(
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
            }) => (
              <PostItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
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
      case EQueryType.MEETUP:
        {
          styles = 'flex flex-col flax-wrap gap-5';
          renderedContent = content?.map(
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
          renderedContent = content?.map(
            ({
              id,
              coverImage,
              title,
              description,
              tags,
              createdAt,
              isLiked,
            }) => (
              <PodcastItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={title}
                description={description}
                tags={tags}
                author={userName}
                createdAt={createdAt}
                isLiked={isLiked}
                handleLikeContent={likeOrDislikeContent}
              />
            )
          );
        }
        break;
      case EQueryType.GROUP:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent = groups?.map(
            ({ id, bio, coverImage, members, name, _count }) => (
              <GroupItemCard
                key={id}
                id={id}
                coverImage={coverImage}
                title={name}
                description={bio}
                members={members}
                totalMembers={_count.members}
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
            tags,
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
              tags={tags}
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
