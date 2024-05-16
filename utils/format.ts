/**
 *
 * 2
 * 23
 * 345
 * 3,555
 * 43,555
 * 545,555
 * 2,777,444
 * 43,555,444
 * 545,777,888
 */

export const formatNumber = (value: number | string) => {
  // ? DO I need to check the type of value since we own the BE and choose the type of data?
  let number: number;
  if (typeof value !== 'string') {
    return 0;
  }
};
