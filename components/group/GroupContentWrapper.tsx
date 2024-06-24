'use client';

// ----------------------------------------------------------------

import { fetchGroupContent } from '@/api/queries';
import { EContentGroupQueries } from '@/constants/react-query';
import type { IContent } from '@/types/content';
import type {
  IGroupContentResponse,
  IGroupMember,
  IGroupMembersResponse,
} from '@/types/group';
import { EQueryType } from '@/types/queries';
import { typedFetch } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ContentNavLinks from '../shared/ContentNavLinks';
import LoadingSpinner from '../shared/LoadingSpinner';
import MeetupItemCard from '../shared/MeetupItemCard';
import Pagination from '../shared/Pagination';
import PodcastItemCard from '../shared/PodcastItemCard';
import PostItemCard from '../shared/PostItemCard';

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
  userId: string;
  groupId: string;
}

const GroupContentWrapper: React.FC<IGroupContentWrapperProps> = ({
  contentType,
  groupContent,
  groupMembers,
  userId,
  groupId,
}) => {
  const [content, setContent] = useState<IContent[]>(groupContent.contents);
  const [members, setMembers] = useState<IGroupMember[]>(groupMembers.members);
  const [page, setPage] = useState(1);

  const {
    isLoading: isLoadingContent,
    error: contentError,
    data: contentData,
  } = useQuery<IGroupContentResponse>({
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchGroupContent(groupId, page, contentType),
    initialData: groupContent,
    enabled: contentType !== EQueryType.MEMBERS && page !== 1,
  });

  const {
    isLoading: isLoadingMembers,
    error: membersError,
    data: membersData,
  } = useQuery<IGroupMembersResponse>({
    queryKey: [updateContentQueryKey(contentType), contentType, page],
    queryFn: () => fetchGroupContent(groupId, page, contentType),
    initialData: groupMembers,
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

  useEffect(() => {
    setPage(1);
  }, [contentType]);

  useEffect(() => {
    if (contentData.contents) {
      setContent(contentData.contents);
    }
  }, [contentData]);

  useEffect(() => {
    if (membersData.members) {
      setMembers(membersData.members);
    }
  }, [membersData.members]);

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
          // styles = 'grid grid-cols-1 md:grid-cols-2 gap-5';
          // renderedContent = groups?.map(
          //   ({ id, bio, coverImage, members, name }) => (
          //     <GroupItemCard
          //       key={id}
          //       id={id}
          //       coverImage={coverImage}
          //       title={name}
          //       description={bio}
          //       members={members}
          //     />
          //   )
          // );
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
      {(isLoadingContent || isLoadingMembers) && (
        <div className="p-4">
          <LoadingSpinner />
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPage={
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
    </>
  );
};

export default GroupContentWrapper;
