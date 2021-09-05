import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/newsSlice";

export const NewsList = () => {
  const dispatch = useDispatch();

  const news = useSelector((state) => state.news);
  const newsStatus = useSelector((state) => state.news.status);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  return (
    <section>
      <h2>News</h2>
      {/* {news} */}
    </section>
  );
};
