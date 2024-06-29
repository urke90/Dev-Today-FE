export const formatNumberWithCommas = (
  value: number | string | null | undefined
) => {
  if (typeof value === 'string' || !value) return 0;

  return new Intl.NumberFormat().format(value);
};

// const timeAgoFormat = (value: Date | null | undefined) => {
//   return new Intl.RelativeTimeFormat();
// };

const units = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'week', seconds: 604800 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 },
];

export const calculateTimeAgo = (date: string | number | Date) => {
  const time = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );
  const { interval, unit } = calculateTimeDifference(time);
  const suffix = interval === 1 ? '' : 's';
  return `${interval} ${unit}${suffix} ago`;
};

const calculateTimeDifference = (time: number) => {
  for (let { label, seconds } of units) {
    const interval = Math.floor(time / seconds);
    if (interval >= 1) {
      return {
        interval,
        unit: label,
      };
    }
  }
  return {
    interval: 0,
    unit: '',
  };
};

export const parseDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-us', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(date));
};

// ! Left this in case currently used function doesn't work
// const timeAgo = (date: Date) => {
//   const seconds = Math.floor((new Date() - date) / 1000);

//   const interval = Math.floor(seconds / 31536000);

//   if (interval > 1) {
//       return interval + " years ago";
//   }
//   if (interval === 1) {
//       return interval + " year ago";
//   }

//   const months = Math.floor(seconds / 2628000);
//   if (months > 1) {
//       return months + " months ago";
//   }
//   if (months === 1) {
//       return months + " month ago";
//   }

//   const days = Math.floor(seconds / 86400);
//   if (days > 1) {
//       return days + " days ago";
//   }
//   if (days === 1) {
//       return days + " day ago";
//   }

//   const hours = Math.floor(seconds / 3600);
//   if (hours > 1) {
//       return hours + " hours ago";
//   }
//   if (hours === 1) {
//       return hours + " hour ago";
//   }

//   const minutes = Math.floor(seconds / 60);
//   if (minutes > 1) {
//       return minutes + " minutes ago";
//   }
//   if (minutes === 1) {
//       return minutes + " minute ago";
//   }

//   return "just now";
// }

export const getFirstName = (authorName: string): string => {
  if (authorName.includes(' ')) {
    return authorName.split(' ')[0];
  } else {
    return authorName;
  }
};
export const formatDate = (date: Date | string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(date)
  );
  return formattedDate;
};
