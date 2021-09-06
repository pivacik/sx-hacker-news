import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHundredNews } from "../api/hackNewsApi";

const initialState = {
  stories: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetchHundredNews();
  return response;
});

export const fetchSingleStory = createAsyncThunk(
  "news/fetchSingleStory",
  async (id) => {}
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stories = action.payload;
      });
  },
});

export default newsSlice.reducer;
