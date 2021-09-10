import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/newsSlice";
import commentsReducer from "../features/commentsSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
  },
});
