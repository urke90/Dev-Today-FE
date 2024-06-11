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
