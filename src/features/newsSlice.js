import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
});

export default newsSlice.reducer;
