import React from "react";
import { Navbar } from "../components/Navbar";
import { NewsList } from "../components/NewsList";

export const MainPage = ({ match }) => {
  return (
    <>
      <Navbar match={match} />
      <NewsList />
    </>
  );
};
