import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../api/hackNewsApi";
import axios from "axios";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

export const requestComments = createAsyncThunk(
  "comments/requestComments",
  async (idList) => {
    const response = await fetchComments(idList);
    return response;
  }
);

const openCommentsBranch = async (commentsOrder, childCommentsIds) => {
  const comments = await fetchComments(childCommentsIds);
  comments.sort((a, b) => {
    return b.time - a.time;
  });

  let commentsInBranch = axios.all(
    comments.map(async (comment) => {
      comment.commentsOrder = commentsOrder + 1;

      if (comment.hasOwnProperty("kids") && comment.kids.length > 0) {
        comment.childComments = await openCommentsBranch(
          comment.commentsOrder,
          comment.kids
        );
      }
      return comment;
    })
  );
  return commentsInBranch;
};

export const requestAllChildComments = createAsyncThunk(
  "comments/requestAllChildComments",
  async (props) => {
    const { parentId, commentsOrder, childCommentsIds } = props;

    const data = await openCommentsBranch(commentsOrder, childCommentsIds);
    return { data, parentId };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRemoved(state, action) {
      state.comments = [];
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(requestComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
        state.comments = state.comments.map((comment) => {
          comment.commentsOrder = 0;
          return comment;
        });
        state.comments.sort((a, b) => b.time - a.time);
      })
      .addCase(requestComments.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(requestAllChildComments.fulfilled, (state, action) => {
        state.comments.map((comment) => {
          if (comment.id === action.payload.parentId) {
            comment.childComments = action.payload.data;
          }
          return comment;
        });
      });
  },
});

export const { commentsRemoved } = commentsSlice.actions;

export default commentsSlice.reducer;
