import { EQueryContentType } from '@/types/content';
import { useCallback, useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------

interface IUseInfiniteScroll {
  isLoadingContent: boolean;
  isLoadingGroups: boolean;
  updatePage: () => void;
  shouldFetchContent: boolean;
  shouldFetchGroups: boolean;
}

// 1. svaki put moram da nakacim observe na novi item

export const useInfiniteScroll = ({
  updatePage,
  isLoadingContent,
  isLoadingGroups,
  shouldFetchContent,
  shouldFetchGroups,
}: IUseInfiniteScroll) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastListItemRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoadingContent || isLoadingGroups) return;
      if (observer.current) observer.current.disconnect(); // if we have to add to different elemnts
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && (shouldFetchContent || shouldFetchGroups)) {
          updatePage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingContent, isLoadingGroups, shouldFetchContent, shouldFetchGroups]
  );

  return { lastListItemRef };
};
