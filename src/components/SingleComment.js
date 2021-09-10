import React from "react";
import { useDispatch } from "react-redux";
import { requestAllChildComments } from "../features/commentsSlice";
import { TimeAgo } from "./TimeAgo";

export const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();

  const hasChildComments = !!comment.kids;
  const isMainComment = comment.commentsOrder === 0;
  const hasRecievedComments =
    comment.hasOwnProperty("childComments") && comment.childComments.length > 0;
  const areChildCommentsRemoved =
    comment.hasOwnProperty("deleted") && !!comment.deleted;

  const renderCommentsOrder = (commentsOrder) => {
    const arr = [];
    for (let i = 0; i < commentsOrder; i++) {
      arr.push(i);
    }
    return arr.map((item) => <div className="comment-order" key={item} />);
  };

  const renderChildComments = () => {
    if (hasRecievedComments) {
      return comment.childComments.map((childComment) => {
        if (areChildCommentsRemoved) {
          return null;
        }
        return <SingleComment comment={childComment} key={childComment.id} />;
      });
    }
  };
  const isMainCommentWithKids =
    !hasChildComments || !isMainComment || hasRecievedComments;

  let prompt;
  if (isMainCommentWithKids) {
    prompt = null;
  } else {
    prompt = <p className="comment-show-more">Open branch</p>;
  }

  const onCommentClicked = () => {
    if (isMainCommentWithKids) {
      return;
    } else {
      dispatch(
        requestAllChildComments({
          parentId: comment.id,
          commentsOrder: comment.commentsOrder,
          childCommentsIds: comment.kids,
        })
      );
    }
  };

  return (
    <>
      <div className="comment" onClick={onCommentClicked}>
        {renderCommentsOrder(comment.commentsOrder)}
        <div className={"comment-wrapper"}>
          <div className="comment-headline">
            <p className="comment-author">{comment.by}</p>
            <TimeAgo className="comment-time" timestamp={comment.time} />
            {prompt}
          </div>
          <p
            className="comment-text"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
        </div>
      </div>
      {renderChildComments()}
    </>
  );
};
