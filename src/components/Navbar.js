import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/newsSlice";

export const Navbar = () => {
  const loadingStatus = useSelector((state) => state.news.status);
  const dispatch = useDispatch();

  let buttonContent;
  if (loadingStatus === "loading") {
    buttonContent = <h2>loading</h2>;
  } else {
    buttonContent = <h2>Refresh</h2>;
  }

  const onRefreshClicked = () => {
    dispatch(fetchNews());
  };
  return (
    <nav>
      <section>
        <h1>Hacker News</h1>
        <button onClick={onRefreshClicked}>{buttonContent}</button>
      </section>
    </nav>
  );
};
