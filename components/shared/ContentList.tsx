'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import { EContentGroupItemsQueries } from '@/constants/react-query';
import PostItemCard from './PostItemCard';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import GroupItemCard from './GroupItemCard';
import { fetchContent, fetchGroups } from '@/api/queries';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import LoadingSpinner from './LoadingSpinner';

// ----------------------------------------------------------------

// ako je fetch u toku treba da se disable intersection observer

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
}

const ContentList: React.FC<IContentListProps> = ({
  contentType,
  contentItems,
  groupItems,
  userId,
  userName,
}) => {
  const [content, setContent] = useState<IContent[]>(contentItems);
  const [groups, setGroups] = useState<IGroup[]>(groupItems);
  const [page, setPage] = useState(1);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<{ content: IContent[] }>({
    queryKey: [updateContentQueryKey(contentType), contentType, userId, page],
    queryFn: () => fetchContent(userId, contentType, page),
    enabled: contentType !== EQueryContentType.GROUPS && page !== 1,
    retry: false,
  });

  const {
    isLoading: isLoadingGroups,
    error: groupsError,
    data: groupsData,
  } = useQuery<IGroup[]>({
    queryKey: [EContentGroupItemsQueries.FETCH_GROUPS, userId, page],
    queryFn: () => fetchGroups(userId, page),
    enabled: contentType === EQueryContentType.GROUPS && page !== 1,
    retry: false,
  });

  const { listItemRef, observe } = useInfiniteScroll({
    updatePage: setPage,
    isLoadingContent,
    isLoadingGroups,
  });

  useEffect(() => {
    if (groupsData) {
      setGroups((prevGroups) => [...prevGroups, ...groupsData]);
    }
  }, [groupsData]);

  useEffect(() => {
    if (contentData) {
      setContent((prevContent) => [...prevContent, ...contentData.content]);
    }
  }, [contentData]);

  useEffect(() => {
    if (listItemRef.current) {
      observe(listItemRef.current);
    }
  }, [content, groups, listItemRef, observe]);

  useEffect(() => {
    setPage(1);
  }, [contentType]);

  const renderContent = () => {
    let styles;
    let renderedContent;

    switch (contentType) {
      case EQueryContentType.POSTS: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = content?.map(
          ({
            id,
            title = '',
            coverImage = '',
            contentDescription = '',
            storyTags,
            createdAt,
            viewsCount,
            likesCount,
            commentsCount,
          }) => (
            <PostItemCard
              key={id}
              id={id}
              coverImage={coverImage}
              title={title}
              description={contentDescription}
              tags={storyTags}
              createdAt={createdAt}
              author={userName}
              viewsCount={viewsCount}
              likesCount={likesCount}
              commentsCount={commentsCount}
            />
          )
        );
      }
      case EQueryContentType.MEETUPS: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = content?.map(
          ({
            id,
            meetUpDate = new Date(),
            title = '',
            contentDescription = '',
            coverImage,
            storyTags,
          }) => (
            <MeetupItemCard
              key={id}
              id={id}
              coverImage={coverImage}
              title={title}
              description={contentDescription}
              tags={storyTags}
              location="Innovation Hub, Austin"
              meetupDate={meetUpDate}
            />
          )
        );
      }
      case EQueryContentType.PODCASTS: {
        styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
        renderedContent = content?.map(
          ({
            id,
            coverImage,
            title = '',
            contentDescription = '',
            storyTags,
            createdAt,
          }) => (
            <PodcastItemCard
              key={id}
              id={id}
              coverImage={coverImage}
              title={title}
              description={contentDescription}
              tags={storyTags}
              author={userName}
              createdAt={createdAt}
            />
          )
        );
      }
      case EQueryContentType.GROUPS: {
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
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = content?.map(
          ({
            id,
            title = '',
            coverImage = '',
            contentDescription = '',
            storyTags,
            createdAt,
            viewsCount,
            likesCount,
            commentsCount,
          }) => (
            <PostItemCard
              key={id}
              id={id}
              coverImage={coverImage}
              title={title}
              description={contentDescription}
              tags={storyTags}
              createdAt={createdAt}
              author={userName}
              viewsCount={viewsCount}
              likesCount={likesCount}
              commentsCount={commentsCount}
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
      <li ref={listItemRef} />
      {(isLoadingContent || isLoadingGroups) && (
        <li>
          <LoadingSpinner />
        </li>
      )}
    </ul>
  );
};

export default memo(ContentList);
