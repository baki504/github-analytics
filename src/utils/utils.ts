export const localeDateString = (dateString: string) =>
  new Date(dateString).toLocaleString();

export const stringComparator = (
  a: string,
  b: string,
) => ((a < b) ? -1 : 1);

export const getFixedNumber = (num: number, digits: number) =>
  Number(num.toFixed(digits));
