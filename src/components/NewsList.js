import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNews, storySelected } from "../features/newsSlice";
import { Spinner } from "./Spinner";
import { TimeAgo } from "./TimeAgo";

export const NewsList = () => {
  const dispatch = useDispatch();

  const storyClicked = (storyId) => {
    dispatch(storySelected({ storyId }));
  };

  const StoryExcerpt = ({ story }) => {
    return (
      <Link to={`/stories/${story.id}`} onClick={() => storyClicked(story.id)}>
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

  const stories = useSelector((state) => state.news.stories);
  const newsStatus = useSelector((state) => state.news.status);

  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setUpdateCount((updateCount) => updateCount + 1),
      1000 * 60
    );
    dispatch(fetchNews());
    return () => clearInterval(interval);
  }, [updateCount]);

  const onRefreshClicked = () => {
    dispatch(fetchNews());
  };

  const content = stories.map((story) => (
    <StoryExcerpt key={story.id} story={story} />
  ));

  return (
    <section>
      <div className="newspage-header">
        <h2>Last News</h2>
        <div className="refresh-button">
          {newsStatus === "loading" && <Spinner size="3em" />}
          <button
            disabled={newsStatus === "loading"}
            onClick={onRefreshClicked}
          >
            Refresh
          </button>
        </div>
      </div>
      {content}
    </section>
  );
};
