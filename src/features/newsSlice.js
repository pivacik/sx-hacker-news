import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { newsApi } from "../api/newsApi";

const initialState = {
  news: [],
  status: "idle",
  error: null,
};
//hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=100&orderBy=%22$key%22
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch(
    `${newsApi.baseUrl}/newstories${newsApi.fileExtension}${newsApi.limitFirstHundred}`
  );
  console.log(response.json());
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
});

export default newsSlice.reducer;
