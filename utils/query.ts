import { EContentGroupQueries } from '@/constants/react-query';
import { EQueryType } from '@/types/queries';

/**
 * @type {function} Function for parsing search query parameters and returning default values if queries are not specified.
 */
export const parseSearchParams = <T extends string = string>(
  param: string | string[] | undefined,
  defaultValue: string
) => {
  if (Array.isArray(param)) {
    return param[0] as T;
  } else if (typeof param === 'string' && param !== '') {
    return param as T;
  }

  return defaultValue as T;
};

export const updateContentQueryKey = (contentType: EQueryType) => {
  if (contentType === EQueryType.GROUP || contentType === EQueryType.MEMBERS) {
    return;
  }
  const FETCH_QUERIES = {
    post: EContentGroupQueries.FETCH_POSTS,
    meetup: EContentGroupQueries.FETCH_MEETUPS,
    podcast: EContentGroupQueries.FETCH_PODCASTS,
  };

  return FETCH_QUERIES[contentType];
};
