export const formatNumberWithCommas = (value: number | string) => {
  // ? DO I need to check the type of value since we own the BE and choose the type of data?
  if (typeof value === 'string') return 0;

  let result = ''; // final result
  const numberString = value.toString();

  const startCommaPosition = numberString.length % 3; // can be 0, 1, 2  ---> start comma position

  if (startCommaPosition > 0) {
    result = numberString.substring(0, startCommaPosition); // we check the number converted to string before for loop
  }

  for (let i = startCommaPosition; i < numberString.length; i += 3) {
    // since we increment index by 3 then we add ','(comma) after each 3 digits
    if (result.length > 0) result += ',';

    // slice the numberString after each ','(comma) and add 3 digits.
    result += numberString.substring(i, i + 3);
  }

  return result;
};
