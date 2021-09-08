import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleStory, selectStoryById } from "../features/newsSlice";
import { TimeAgo } from "./TimeAgo";

export const SingleStoryPage = ({ match }) => {
  //get storyId from the url and parse
  const { storyId } = match.params;
  const storyIdInt = parseInt(storyId) || 0;

  const dispatch = useDispatch();

  //   check if the story is arlready in the store
  const newsStatus = useSelector((state) => state.news.status);
  const story = useSelector((state) => selectStoryById(state, storyIdInt));

  useEffect(() => {
    if (!story) {
      dispatch(fetchSingleStory(storyIdInt));
    }
  }, []);

  let content;

  if (newsStatus === "loading") {
    content = <h2>Loading...</h2>;
  } else if (newsStatus === "failed") {
    content = <h2>Page not found!</h2>;
  } else if (newsStatus === "succeeded") {
    if (story.type !== "story") {
      content = <h2>We couldn't find any story with this Id</h2>;
    } else {
      content = (
        <>
          <h2>{story.title}</h2>
          <div>
            <span>{story.by}</span>
            <TimeAgo timestamp={story.time} />
          </div>
          <p>
            <a href={story.url}>{story.url}</a>
          </p>
        </>
      );
    }
  }
  return (
    <section>
      <article className="story">
        {content}
        <Link to={"/"} className="button">
          Back to main page
        </Link>
      </article>
    </section>
  );
};
