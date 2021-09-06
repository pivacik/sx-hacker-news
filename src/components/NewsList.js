import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/newsSlice";

const StoryExcerpt = ({ story }) => {
  return (
    <article className="story-excerpt" key={story.id}>
      <h2>{story.title}</h2>
      <div>
        <h3>by {story.by}</h3>
      </div>
    </article>
  );
};

export const NewsList = () => {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.news.stories);
  const newsStatus = useSelector((state) => state.news.status);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

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
      <h2>News</h2>
      {content}
    </section>
  );
};
