import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestComments, commentsRemoved } from "../features/commentsSlice";
import { SingleComment } from "./SingleComment";
import { Spinner } from "./Spinner";

export const Comments = () => {
  const dispatch = useDispatch();
  const story = useSelector((state) => state.news.singleStory);
  const comments = useSelector((state) => state.comments.comments);
  const commentsStatus = useSelector((state) => state.comments.status);

  const isLoading = commentsStatus === "loading";

  const childComments =
    !!story && story.hasOwnProperty("kids") ? story.kids : null;

  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setUpdateCount((updateCount) => updateCount + 1),
      1000 * 60
    );
    dispatch(requestComments());
    return () => clearInterval(interval);
  }, [updateCount]);

  const onRefreshClicked = () => {
    dispatch(requestComments(childComments));
  };

  useEffect(() => {
    if (!!childComments && childComments.length !== 0) {
      dispatch(requestComments(childComments));
    }
    return () => {
      dispatch(commentsRemoved());
    };
  }, [childComments]);

  return (
    <section className="comments">
      <div className="newspage-header">
        <div className="comments-title-wrapper">
          <h2>Comments</h2>
          <span className="comments-count">
            {(!!story && story.descendants) || 0}
          </span>
        </div>
        <div className="refresh-button">
          {isLoading && <Spinner size="3em" />}
          <button disabled={isLoading} onClick={onRefreshClicked}>
            Refresh
          </button>
        </div>
      </div>

      {comments.map((comment) => {
        if (comment.hasOwnProperty("deleted")) {
          return null;
        }
        return <SingleComment comment={comment} key={comment.id} />;
      })}
    </section>
  );
};
