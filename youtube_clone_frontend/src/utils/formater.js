// Function to calculate the time elapsed since a given upload time
export const timeAgo = (uploadTime) => {
  const currentTime = new Date(); // Get the current time
  const uploadedTime = new Date(uploadTime); // Convert the upload time to a Date object

  const diffInSeconds = Math.floor((currentTime - uploadedTime) / 1000); // Calculate the difference in seconds
  // Return the appropriate time difference as a human-readable string
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`; // Less than a minute ago
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60); // Calculate the difference in minutes
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`; // Less than an hour ago
  }

  const diffInHours = Math.floor(diffInMinutes / 60); // Calculate the difference in hours
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`; // Less than a day ago
  }

  const diffInDays = Math.floor(diffInHours / 24); // Calculate the difference in days
  if (diffInDays < 7) {
    return `${diffInDays} days ago`; // Less than a week ago
  }

  const diffInWeeks = Math.floor(diffInDays / 7); // Calculate the difference in weeks
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`; // Less than a month ago
  }

  const diffInMonths = Math.floor(diffInDays / 30); // Calculate the difference in months
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`; // Less than a year ago
  }

  const diffInYears = Math.floor(diffInDays / 365); // Calculate the difference in years
  return `${diffInYears} years ago`; // More than a year ago
};

// Function to format large numbers for subscribers or views into readable units
export const formatSubscribers$Views = (subscribers) => {
  if (subscribers < 1000) {
    return `${subscribers}`; // Return the number as is if less than 1,000
  } else if (subscribers >= 1000 && subscribers < 1000000) {
    // Format numbers in the thousands (e.g., 1,200 -> 1.2k)
    return `${(subscribers / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  } else if (subscribers >= 1000000) {
    // Format numbers in the millions (e.g., 1,200,000 -> 1.2M)
    return `${(subscribers / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
};
