import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHundredNews, fetchStoryById } from "../api/hackNewsApi";

const initialState = {
  stories: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetchHundredNews();
  console.log(response);
  return response;
});

export const fetchSingleStory = createAsyncThunk(
  "news/fetchSingleStory",
  async (id) => {
    const response = await fetchStoryById(id);
    return response;
  }
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
      })
      .addCase(fetchSingleStory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stories.push(action.payload);
      })
      .addCase(fetchSingleStory.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default newsSlice.reducer;

export const selectStoryById = (state, storyId) => {
  return storyId === 0
    ? null
    : state.news.stories.find((story) => story.id === storyId);
};
