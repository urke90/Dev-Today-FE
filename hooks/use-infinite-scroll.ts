import { EQueryContentType } from '@/types/content';
import { useCallback, useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------

interface IUseInfiniteScroll {
  isLoadingContent: boolean;
  isLoadingGroups: boolean;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
}

// 1. svaki put moram da nakacim observe na novi item

export const useInfiniteScroll = ({
  updatePage,
  isLoadingContent,
  isLoadingGroups,
}: IUseInfiniteScroll) => {
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = useCallback((node: Element) => {
    console.log('node', node);
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([item]) => {
      if (item.isIntersecting && !isLoadingContent && !isLoadingGroups) {
        updatePage((prevPage) => prevPage + 1);
        console.log('OBSERVER');
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (listItemRef.current) {
      observe(listItemRef.current);
    }
  }, [observe, listItemRef.current]);

  return { listItemRef, observe };
};
