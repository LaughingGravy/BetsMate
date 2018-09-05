import  { compareAsc } from 'date-fns'

const getUTCDate = (dateString = Date.now()) => {
  const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

const isFirstEarlierThanSecond = (firstDate, secondDate) => {
  console.log("firstDate, secondDate", firstDate, secondDate)
  return compareAsc(firstDate, secondDate) == -1
}

export { getUTCDate, isFirstEarlierThanSecond }