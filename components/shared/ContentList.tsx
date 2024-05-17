'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import { EContentGroupItemsQueries } from '@/constants/react-query';
import PostItemCard from './PostItemCard';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import GroupItemCard from './GroupItemCard';
import { typedFetch } from '@/utils/api';
import { fetchContent, fetchGroups } from '@/api/queries';

// ----------------------------------------------------------------

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
}

const ContentList: React.FC<IContentListProps> = ({
  contentType,
  contentItems,
  groupItems,
  userId,
}) => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<IContent[]>(contentItems);
  const [groups, setGroups] = useState<IGroup[]>(groupItems);

  const updatePageNumber = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<{ content: IContent[] }>({
    queryKey: [updateContentQueryKey(contentType)],
    queryFn: () => fetchContent(userId, contentType, page),
    enabled: contentType !== EQueryContentType.GROUPS && page !== 1,
  });

  console.log('groups', groups);

  const {
    isLoading: isLoadingGroups,
    error: groupsError,
    data: groupsData,
  } = useQuery<IGroup[]>({
    queryKey: [EContentGroupItemsQueries.FETCH_GROUPS],
    queryFn: () => fetchGroups(userId, page),
    enabled: contentType === EQueryContentType.GROUPS && page !== 1,
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
    setPage(1);
  }, [contentType]);

  switch (contentType) {
    case EQueryContentType.POSTS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          {content?.map(
            (
              {
                id,
                title = '',
                coverImage = '',
                contentDescription = '',
                storyTags,
                createdAt,
                viewsCount,
                likesCount,
                commentsCount,
              },
              index
            ) => (
              <PostItemCard
                key={id}
                coverImage={coverImage}
                title={title}
                description={contentDescription}
                tags={storyTags}
                createdAt={createdAt}
                author="Pavel Gray"
                viewsCount={viewsCount}
                likesCount={likesCount}
                commentsCount={commentsCount}
                updatePageNumber={updatePageNumber}
                isLast={index === content.length - 1}
              />
            )
          )}
        </ul>
      );
    }
    case EQueryContentType.MEETUPS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          {content?.map(
            (
              {
                id,
                meetUpDate,
                title = '',
                contentDescription = '',
                coverImage,
                storyTags,
              },
              index
            ) => (
              <MeetupItemCard
                key={id}
                coverImage={coverImage}
                title={title}
                description={contentDescription}
                tags={storyTags}
                location="Innovation Hub, Austin"
                date={meetUpDate}
                updatePageNumber={updatePageNumber}
                isLast={index === content.length - 1}
              />
            )
          )}
        </ul>
      );
    }
    case EQueryContentType.PODCASTS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          {content?.map(
            (
              {
                id,
                coverImage,
                title = '',
                contentDescription = '',
                storyTags,
                createdAt,
              },
              index
            ) => (
              <PodcastItemCard
                key={id}
                coverImage={coverImage}
                title={title}
                description={contentDescription}
                tags={storyTags}
                author="Pavel Gvay"
                createdAt={createdAt}
                updatePageNumber={updatePageNumber}
                isLast={index === content.length - 1}
              />
            )
          )}
        </ul>
      );
    }
    case EQueryContentType.GROUPS: {
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups?.map(({ id, groupBio, coverImg, members, name }, index) => (
            <GroupItemCard
              key={id}
              coverImage={coverImg}
              title={name}
              description={groupBio}
              members={members}
              updatePageNumber={updatePageNumber}
              isLast={index === groups.length - 1}
            />
          ))}
        </ul>
      );
    }
    default: {
      throw new Error('Something went wrong!');
    }
  }
};

export default memo(ContentList);
