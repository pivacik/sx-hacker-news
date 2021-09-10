import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHundredNews, fetchItemById } from "../api/hackNewsApi";

const initialState = {
  stories: [],
  singleStory: null,
  singleStoryStatus: "idle",
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetchHundredNews();
  return response;
});

export const fetchSingleStory = createAsyncThunk(
  "news/fetchSingleStory",
  async (id) => {
    const response = await fetchItemById(id);
    return response;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    storySelected(state, action) {
      const { storyId } = action.payload;
      const existingStory = state.stories.find((story) => story.id === storyId);
      if (existingStory) {
        state.singleStory = existingStory;
      }
    },
    storyUnselected(state, action) {
      state.singleStory = null;
      state.singleStoryStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stories = action.payload.filter((story) => story !== null);
        state.stories.sort((a, b) => a - b);
      })

      .addCase(fetchSingleStory.pending, (state, action) => {
        state.singleStoryStatus = "loading";
      })
      .addCase(fetchSingleStory.fulfilled, (state, action) => {
        state.singleStoryStatus = "succeeded";
        state.singleStory = action.payload;
      })
      .addCase(fetchSingleStory.rejected, (state, action) => {
        state.singleStoryStatus = "failed";
      });
  },
});

export default newsSlice.reducer;

export const { storySelected, storyUnselected } = newsSlice.actions;

export const selectStoryById = (state, storyId) => {
  return storyId === 0
    ? null
    : state.news.stories.find((story) => story.id === storyId);
};
