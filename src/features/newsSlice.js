import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHundredNews, fetchStoryById } from "../api/hackNewsApi";

const initialState = {
  stories: [],
  singleStory: [],
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
    const response = await fetchStoryById(id);
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
        state.singleStory.push(existingStory);
      }
    },
    storyUnselected(state, action) {
      state.singleStory = [];
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
        state.stories = action.payload;
        state.stories.sort((a, b) => a - b);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchSingleStory.pending, (state, action) => {
        state.singleStoryStatus = "loading";
      })
      .addCase(fetchSingleStory.fulfilled, (state, action) => {
        state.singleStoryStatus = "succeeded";
        state.singleStory.push(action.payload);
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
