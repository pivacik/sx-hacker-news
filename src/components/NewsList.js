import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNews } from "../features/newsSlice";
import { TimeAgo } from "./TimeAgo";

const StoryExcerpt = ({ story }) => {
  return (
    <Link to={`/stories/${story.id}`}>
      <article className="story-excerpt" key={story.id}>
        <h2>{story.title}</h2>
        <div>
          <span>by {story.by}</span>
          <TimeAgo timestamp={story.time} />
        </div>
      </article>
    </Link>
  );
};

export const NewsList = () => {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.news.stories);

  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setUpdateCount((updateCount) => updateCount + 1),
      1000 * 60
    );
    dispatch(fetchNews());
    return () => clearInterval(interval);
  }, [updateCount]);

  const content = stories.map((story) => (
    <StoryExcerpt key={story.id} story={story} />
  ));

  return (
    <section>
      <h2>Last News</h2>
      {content}
    </section>
  );
};
