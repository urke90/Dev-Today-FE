'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { EQueryContentType, type IContent } from '@/types/content';
import type { IGroup } from '@/types/group';
import PostItemCard from './PostItemCard';
import MeetupItemCard from './MeetupItemCard';
import PodcastItemCard from './PodcastItemCard';
import GroupItemCard from './GroupItemCard';
import { typedFetch } from '@/utils/api';

// ----------------------------------------------------------------

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

  useEffect(() => {
    const fetchData = async () => {
      if (contentType === EQueryContentType.GROUPS) {
        const newGroups = await typedFetch<IGroup[]>(`/user/${userId}/groups`);
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);
      } else {
        console.log('uso u FETCH CONTENT');
        const newContent = await typedFetch<{ content: IContent[] }>(
          `/user/${userId}/content?type=${contentType}&page=${page}`
        );

        setContent((prevContent) => [...prevContent, ...newContent.content]);
      }
    };
    if (page !== 1) fetchData();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [contentType]);
  useEffect(() => {
    console.log('content', content);
  }, [content]);

  switch (contentType) {
    case EQueryContentType.POSTS: {
      return (
        <ul className="flex flex-col flax-wrap gap-5">
          {content.map(
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
          {content.map(
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
          {content.map(
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
          {groups.map(({ id, groupBio, coverImg, members, name }, index) => (
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
