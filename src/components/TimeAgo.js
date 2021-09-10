import React from "react";
import { formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  let date;
  if (timestamp) {
    date = new Date(timestamp * 1000);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className="time-posted" title={date}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};
