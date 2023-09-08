export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate: string = date.toLocaleString('en-GB', options);
  return formattedDate;
};

export function addSixMonths(input: string | number): string {
  let date: Date;

  if (typeof input === 'string') {
    date = new Date(input);
  } else if (typeof input === 'number') {
    date = new Date(input);
  } else {
    throw new Error('Invalid input. Expected a date string or a timestamp.');
  }

  date.setMonth(date.getMonth() + 6);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
