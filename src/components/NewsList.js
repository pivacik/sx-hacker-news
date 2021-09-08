import React, { useEffect } from "react";
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
  const newsStatus = useSelector((state) => state.news.status);

  useEffect(() => {
    if (stories.length < 100) dispatch(fetchNews());
    return () => {};
  }, []);

  let content;

  if (newsStatus === "loading") {
    content = <h2>Loading...</h2>;
  } else if (newsStatus === "succeeded") {
    content = stories.map((story) => (
      <StoryExcerpt key={story.id} story={story} />
    ));
  }

  return (
    <section>
      <h2>Last News</h2>
      {content}
    </section>
  );
};
