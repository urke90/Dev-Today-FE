'use client';

// ----------------------------------------------------------------

import MemberItemCard from './MemberItemCard';

import ContentNavLinks from '../shared/ContentNavLinks';
import LoadingSpinner from '../shared/LoadingSpinner';
import MeetupItemCard from '../shared/MeetupItemCard';
import Pagination from '../shared/Pagination';
import PodcastItemCard from '../shared/PodcastItemCard';
import PostItemCard from '../shared/PostItemCard';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  assignAdminRole,
  removeAdminRole,
  removeMemberFromGroup,
} from '@/api/mutations';
import { fetchGroupContent, fetchGroupMembers } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import { revalidateRoute } from '@/lib/actions/revalidate';
import type {
  IGroupContentResponse,
  IGroupMembersResponse,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

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
  groupContent: IGroupContentResponse;
  groupMembers: IGroupMembersResponse;
  viewerId: string;
  groupId: string;
}
const GroupContent: React.FC<IGroupContentWrapperProps> = ({
  contentType,
  groupContent,
  groupMembers,
  viewerId,
  groupId,
}) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<IGroupContentResponse>({
    initialData: groupContent,
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchGroupContent(groupId, page, contentType, viewerId),
    enabled: contentType !== EQueryType.MEMBERS && page !== 1,
  });

  const {
    isLoading: isLoadingMembers,
    error: membersError,
    data: membersData,
  } = useQuery<IGroupMembersResponse>({
    initialData: groupMembers,
    queryKey: [EContentGroupQueries.FETCH_MEMBERS, EQueryType.MEMBERS, page],
    queryFn: () => fetchGroupMembers(groupId, page),
    enabled: contentType === EQueryType.MEMBERS && page !== 1,
  });

  const { isPending, mutateAsync: removeMemberAsync } = useMutation({
    mutationKey: [EContentGroupQueries.DELETE_MEMBER],
    mutationFn: ({
      groupId,
      viewerId,
      userId,
    }: {
      groupId: string;
      viewerId: string;
      userId: string;
    }) => removeMemberFromGroup(groupId, viewerId, userId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: [
          EContentGroupQueries.FETCH_MEMBERS,
          EQueryType.MEMBERS,
          page,
        ],
      });

      queryClient.setQueryData(
        [EContentGroupQueries.FETCH_MEMBERS, EQueryType.MEMBERS, page],
        {
          ...membersData,
          members: membersData.members.filter((member) => member.id !== userId),
        }
      );
      revalidateRoute('groups/[id]', 'page');
    },
  });

  const { mutateAsync: assignAdminRoleAsync } = useMutation({
    mutationKey: [EContentGroupQueries.ASSIGN_ADMIN_ROLE],
    mutationFn: ({
      groupId,
      viewerId,
      userId,
    }: {
      groupId: string;
      viewerId: string;
      userId: string;
    }) => assignAdminRole(groupId, viewerId, userId),
  });

  const { mutateAsync: removeAdminRoleAsync } = useMutation({
    mutationKey: [EContentGroupQueries.REMOVE_ADMIN_ROLE],
    mutationFn: ({
      groupId,
      viewerId,
      userId,
    }: {
      groupId: string;
      viewerId: string;
      userId: string;
    }) => removeAdminRole(groupId, viewerId, userId),
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
          ...contentData,
          contents: contentData.contents.map((content) =>
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
          ...contentData,
          contents: contentData.contents.map((content) =>
            content.id === contentId ? { ...content, isLiked: false } : content
          ),
        }
      );
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  useEffect(() => {
    setPage(1);
    queryClient.setQueryData(
      [updateContentQueryKey(contentType), contentType, 1],
      contentType === EQueryType.MEMBERS ? groupMembers : groupContent
    );
  }, [contentType]);

  const renderContent = () => {
    let styles;
    let renderedContent;

    switch (contentType) {
      case EQueryType.POST:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent = contentData.contents?.map(
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
                author={author}
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
          renderedContent = contentData.contents?.map(
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
          renderedContent = contentData.contents?.map(
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
                author={author}
                createdAt={createdAt}
                isLiked={isLiked}
                handleLikeContent={handleLikeContent}
                handleDislikeContent={handleDislikeContent}
              />
            )
          );
        }
        break;
      case EQueryType.MEMBERS:
        {
          styles = 'grid grid-cols-2 md:grid-cols-2 gap-5';
          renderedContent = membersData.members?.map(
            ({ id, avatarImg, userName, role }) => (
              <MemberItemCard
                key={id}
                id={id}
                avatarImg={avatarImg}
                userName={userName}
                role={role}
                removeMember={() =>
                  removeMemberAsync({ groupId, viewerId, userId: id })
                }
                assignAdminRole={() =>
                  assignAdminRoleAsync({ groupId, viewerId, userId: id })
                }
                removeAdminRole={() =>
                  removeAdminRoleAsync({ groupId, viewerId, userId: id })
                }
              />
            )
          );
        }
        break;
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = contentData.contents?.map(
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
              author={author}
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
  const showPagination =
    (contentType === EQueryType.MEMBERS && membersData?.members?.length > 0) ||
    (contentType !== EQueryType.MEMBERS && contentData?.contents?.length > 0);

  return (
    <>
      <ContentNavLinks isGroupPage />
      <ul className={styles}>{renderedContent}</ul>
      {(isLoadingContent || isLoadingMembers) && (
        <div className="p-1">
          <LoadingSpinner />
        </div>
      )}
      {showPagination && (
        <Pagination
          currentPage={page}
          totalPages={
            contentType === EQueryType.MEMBERS
              ? membersData.totalPages
              : contentData.totalPages
          }
          disablePrevBtn={page === 1}
          disableNextBtn={
            contentType === EQueryType.MEMBERS
              ? !membersData.hasNextPage
              : !contentData.hasNextPage
          }
          setPage={setPage}
        />
      )}
    </>
  );
};

export default GroupContent;
