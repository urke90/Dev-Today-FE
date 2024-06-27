'use client';

// ----------------------------------------------------------------

import { fetchGroupContent, fetchGroupMembers } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import type {
  IGroupContentResponse,
  IGroupMembersResponse,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ContentNavLinks from '../shared/ContentNavLinks';
import LoadingSpinner from '../shared/LoadingSpinner';
import MeetupItemCard from '../shared/MeetupItemCard';
import Pagination from '../shared/Pagination';
import PodcastItemCard from '../shared/PodcastItemCard';
import PostItemCard from '../shared/PostItemCard';
import MemberItemCard from './MemberItemCard';

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
  const [content, setContent] = useState<IGroupContentResponse>(groupContent);
  const [members, setMembers] = useState<IGroupMembersResponse>(groupMembers);
  const [page, setPage] = useState(1);

  const {
    // isPending: isPendingContent,
    isLoading: isPendingContent,
    error: contentError,
    data: contentData,
  } = useQuery<IGroupContentResponse>({
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchGroupContent(groupId, page, contentType, viewerId),
    enabled: contentType !== EQueryType.MEMBERS && page !== 1,
  });

  const {
    isLoading: isPendingMembers,
    error: membersError,
    data: membersData,
  } = useQuery<IGroupMembersResponse>({
    queryKey: [EContentGroupQueries.FETCH_MEMBERS, EQueryType.MEMBERS, page],
    queryFn: () => fetchGroupMembers(groupId, page),
    enabled: contentType === EQueryType.MEMBERS && page !== 1,
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
      setContent((prevContent) => ({
        ...prevContent,
        contents: prevContent.contents.map((content) =>
          content.id === contentId
            ? { ...content, isLiked: !content.isLiked }
            : content
        ),
      }));
    } catch (error) {
      toast.error('Ooops, something went wrong!');
    }
  };

  useEffect(() => {
    setPage(1);
  }, [contentType]);

  //&& contentType !== EQueryType.MEMBERS
  useEffect(() => {
    if (contentData) {
      setContent((prevContent) => ({ ...prevContent, ...contentData }));
    }
  }, [contentData]);

  useEffect(() => {
    //&& contentType === EQueryType.MEMBERS
    if (membersData) {
      setMembers((prevMembers) => ({ ...prevMembers, ...membersData }));
    }
  }, [membersData]);

  const renderContent = () => {
    let styles;
    let renderedContent;

    switch (contentType) {
      case EQueryType.POST:
        {
          styles = 'flex flex-col flex-wrap gap-5';
          renderedContent = content.contents?.map(
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
          renderedContent = groupContent.contents?.map(
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
          renderedContent = content.contents?.map(
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
      case EQueryType.MEMBERS:
        {
          styles = 'grid grid-cols-2 md:grid-cols-2 gap-5';
          renderedContent = members.members?.map(
            ({ id, avatarImg, userName }) => (
              <MemberItemCard
                key={id}
                id={id}
                avatarImg={avatarImg}
                userName={userName}
              />
            )
          );
        }
        break;
      default: {
        styles = 'flex flex-col flax-wrap gap-5';
        renderedContent = content.contents?.map(
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
      <ContentNavLinks isGroupPage />
      <ul className={styles}>{renderedContent}</ul>
      {(isPendingContent || isPendingMembers) && (
        <div className="p-1">
          <LoadingSpinner />
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={
          contentType === EQueryType.MEMBERS
            ? members.totalPages
            : content.totalPages
        }
        disablePrevBtn={page === 1}
        disableNextBtn={
          contentType === EQueryType.MEMBERS
            ? !members.hasNextPage
            : !content.hasNextPage
        }
        setPage={setPage}
      />
    </>
  );
};

export default memo(GroupContent);
