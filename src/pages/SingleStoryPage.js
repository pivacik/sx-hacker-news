import React from "react";
import { Navbar } from "../components/Navbar";
import { SingleStory } from "../components/SingleStory";

export const SingleStoryPage = ({ match }) => {
  return (
    <>
      <Navbar match={match} />
      <SingleStory match={match} />
    </>
  );
};
