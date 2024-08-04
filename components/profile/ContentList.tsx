'use client';

import LoadingSpinner from '../shared/LoadingSpinner';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { fetchUserContent, fetchUserGroups } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import {
  type IContent,
  type IProfilePageContentResponse,
} from '@/types/content';
import type {
  IProfilePageGroup,
  IProfilePageGroupsResponse,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import toast from 'react-hot-toast';

import GroupItemCard from '../shared/GroupItemCard';
import MeetupItemCard from '../shared/MeetupItemCard';
import PodcastItemCard from '../shared/PodcastItemCard';
import PostItemCard from '../shared/PostItemCard';

// ----------------------------------------------------------------

const getShouldFetch = (items: IContent[] | IProfilePageGroup[]) => {
  return items.length % 6 === 0 && items.length !== 0;
};

const updateContentQueryKey = (contentType: EQueryType) => {
  if (contentType === EQueryType.GROUP || contentType === EQueryType.MEMBERS) {
    return;
  }
  const FETCH_QUERIES = {
    post: EContentGroupQueries.FETCH_POSTS,
    meetup: EContentGroupQueries.FETCH_MEETUPS,
    podcast: EContentGroupQueries.FETCH_PODCASTS,
    // members: EContentGroupQueries.FETCH_MEMBERS,
  };

  return FETCH_QUERIES[contentType];
};

interface IContentListProps {
  contentType: EQueryType;
  contentData: IProfilePageContentResponse;
  groupsData: IProfilePageGroupsResponse;
  userId: string;
  userName: string;
  viewerId: string;
}

// TODO figure out why without "groupsToRender[0] !== undefined &&" logic for rendering groups is not working
const ContentList: React.FC<IContentListProps> = ({
  contentType,
  contentData,
  groupsData,
  userId,
  userName,
  viewerId,
}) => {
  const queryClient = useQueryClient();
  // const [groups, setGroups] = useState<IProfilePageGroup[]>(groupItems);
  const [page, setPage] = useState(1);
  // const [content, setContent] = useState<IContent[]>(contentItems);

  const {
    isLoading: isLoadingContent,
    data: content,
    hasNextPage: hasNextContentPage,
    fetchNextPage: fetchNextContentPage,
  } = useInfiniteQuery({
    queryKey: [updateContentQueryKey(contentType), contentType],
    queryFn: ({ pageParam = 1 }) =>
      fetchUserContent(userId, contentType, pageParam, viewerId),
    initialPageParam: 1,
    initialData: {
      pages: [contentData],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages?.length + 1 : undefined;
    },
    enabled: contentType !== EQueryType.GROUP,
  });

  const {
    isLoading: isLoadingGroups,
    data: groups,
    hasNextPage: hasNextGroupsPage,
    fetchNextPage: fetchNextGroupsPage,
  } = useInfiniteQuery({
    queryKey: [EContentGroupQueries.FETCH_GROUPS, EQueryType.GROUP],
    queryFn: ({ pageParam = 1 }) => fetchUserGroups(userId, pageParam),
    initialPageParam: 1,
    initialData: {
      pages: [groupsData],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, allPages, firstPageParam) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    enabled: contentType === EQueryType.GROUP,
  });

  const lastListItemRef = useInfiniteScroll({
    updatePage:
      contentType === EQueryType.GROUP
        ? fetchNextGroupsPage
        : fetchNextContentPage,
    isLoading: isLoadingContent || isLoadingGroups,
    shouldFetch:
      contentType === EQueryType.GROUP ? hasNextGroupsPage : hasNextContentPage,
  });

  const handleLikeContent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contentId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await typedFetch({
        url: `/content/${userId}/like`,
        method: 'POST',
        body: { contentId },
      });
      queryClient.setQueryData(
        [updateContentQueryKey(contentType), contentType],
        {
          ...content,
          pages: content.pages.map((page) => ({
            ...page,
            contents: page.contents.map((content) =>
              content.id === contentId ? { ...content, isLiked: true } : content
            ),
          })),
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
        url: `/content/${userId}/dislike`,
        method: 'DELETE',
        body: { contentId },
      });
      queryClient.setQueryData(
        [updateContentQueryKey(contentType), contentType],
        {
          ...content,
          pages: content.pages.map((page) => ({
            ...page,
            contents: page.contents.map((content) =>
              content.id === contentId
                ? { ...content, isLiked: false }
                : content
            ),
          })),
        }
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  useEffect(() => {
    // queryClient.setQueryData(
    //   [EContentGroupQueries.FETCH_GROUPS, EQueryType.GROUP, 1],
    //   contentType === EQueryType.GROUP ? groupsData : contentData
    // );
    queryClient.setQueryData(
      [EContentGroupQueries.FETCH_GROUPS, EQueryType.GROUP],
      {
        pages: contentType === EQueryType.GROUP ? [groupsData] : [contentData],
        pageParams: [1],
      }
    );
    // queryClient.setQueryData(
    //   [EContentGroupQueries.FETCH_GROUPS, EQueryType.GROUP, 1],
    //   contentType === EQueryType.GROUP ? groupsData : contentData
    // );
  }, [contentType, groupsData, contentData]);

  const renderContent = () => {
    let styles;
    let renderedContent;

    const contentToRender = content?.pages?.flatMap((page) => page.contents);
    const groupsToRender = groups?.pages?.flatMap((page) => page.groups);

    switch (contentType) {
      case EQueryType.POST:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent =
            contentToRender[0] !== undefined &&
            contentToRender?.map(
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
                  handleLikeContent={handleLikeContent}
                  handleDislikeContent={handleDislikeContent}
                />
              )
            );
        }
        break;
      case EQueryType.MEETUP:
        {
          styles = 'flex flex-col flax-wrap gap-5';
          renderedContent =
            contentToRender[0] !== undefined &&
            contentToRender?.map(
              ({
                id,
                meetupDate,
                title,
                description,
                coverImage,
                tags,
                meetupLocation,
              }) => (
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
              )
            );
        }
        break;
      case EQueryType.PODCAST:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent =
            contentToRender[0] !== undefined &&
            contentToRender?.map(
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
                  handleLikeContent={handleLikeContent}
                  handleDislikeContent={handleDislikeContent}
                />
              )
            );
        }
        break;
      case EQueryType.GROUP:
        {
          styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          renderedContent =
            groupsToRender[0] !== undefined &&
            groupsToRender?.map(
              ({ id, bio, coverImage, members, name, _count }) => (
                <GroupItemCard
                  key={id}
                  id={id}
                  coverImage={coverImage}
                  title={name}
                  description={bio}
                  members={members}
                  totalMembers={_count?.members}
                />
              )
            );
        }
        break;
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent =
          contentToRender[0] !== undefined &&
          contentToRender?.map(
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
                handleLikeContent={handleLikeContent}
                handleDislikeContent={handleDislikeContent}
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
      <ul className={styles}>
        {renderedContent}
        {(isLoadingContent || isLoadingGroups) && (
          <li>
            <LoadingSpinner />
          </li>
        )}
      </ul>
      <div ref={lastListItemRef} />
    </>
  );
};

export default ContentList;
