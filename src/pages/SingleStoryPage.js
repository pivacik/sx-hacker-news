import React from "react";
import { Comments } from "../components/Comments";
import { Navbar } from "../components/Navbar";
import { SingleStory } from "../components/SingleStory";

export const SingleStoryPage = ({ match }) => {
  return (
    <>
      <Navbar match={match} />
      <SingleStory match={match} />
      <Comments />
    </>
  );
};
