import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleStory,
  storySelected,
  storyUnselected,
} from "../features/newsSlice";
import { Spinner } from "./Spinner";
import { TimeAgo } from "./TimeAgo";

export const SingleStory = ({ match }) => {
  //get storyId from the url and parse
  const { storyId } = match.params;
  const storyIdInt = parseInt(storyId) || 0;

  const dispatch = useDispatch();

  const storyStatus = useSelector((state) => state.news.singleStoryStatus);
  const story = useSelector((state) =>
    state.news.singleStory.find((story) => story.id === storyIdInt)
  );

  useEffect(() => {
    if (!story) {
      dispatch(fetchSingleStory(storyIdInt));
    }
    return () => {
      dispatch(storyUnselected());
    };
  }, []);

  let content;

  if (storyStatus === "loading") {
    content = <Spinner text=" Loading..." />;
  } else if (storyStatus === "failed") {
    content = <h2>Page not found!</h2>;
  } else if (story) {
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
      <article className="story">{content}</article>
    </section>
  );
};
