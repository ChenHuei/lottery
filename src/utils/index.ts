export const formateSecondToString = (second: number): string => {
  const date = new Date(0);
  date.setSeconds(second);
  return date.toISOString().substr(11, 8);
};
