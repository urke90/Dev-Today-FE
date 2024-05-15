import { useEffect, useRef } from 'react';

// ----------------------------------------------------------------

interface IUseInfiniteScroll {
  updatePageNumber: () => void;
  isLast: boolean;
}

export const useInfiniteScroll = ({
  updatePageNumber,
  isLast,
}: IUseInfiniteScroll) => {
  const listItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!listItemRef?.current) return;

    const observer = new IntersectionObserver(([item]) => {
      if (isLast && item.isIntersecting) {
        updatePageNumber();
        observer.unobserve(item.target);
      }
    });

    observer.observe(listItemRef.current);
  }, []);

  return listItemRef;
};
