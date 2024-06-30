import { useCallback, useRef } from 'react';

// ----------------------------------------------------------------

interface IUseInfiniteScroll {
  isLoading: boolean;
  updatePage: () => void;
  shouldFetch: boolean;
}

// 1. svaki put moram da nakacim observe na novi item

export const useInfiniteScroll = ({
  updatePage,
  isLoading,
  shouldFetch,
}: IUseInfiniteScroll) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastListItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect(); // if we have to add to different elemnts
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && shouldFetch) {
          updatePage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, shouldFetch, updatePage]
  );

  return lastListItemRef;
};
