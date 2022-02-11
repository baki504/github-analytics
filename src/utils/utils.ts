export const localeDateString = (dateString: string) =>
  new Date(dateString).toLocaleString();

export const stringComparator = (
  a: string,
  b: string,
) => ((a < b) ? -1 : 1);
