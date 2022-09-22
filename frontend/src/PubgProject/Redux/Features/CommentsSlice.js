import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"))?.accessToken;

const headers = {
  token: JSON.parse(localStorage.getItem("token"))?.accessToken,
};
const baseURL = "http://localhost:5000/";
const initialState = {
  AllComments: [],
  postComments: [],
  error: null,
  loading: false,
};

// getting all data 1
export const asyncGetPostComments = createAsyncThunk(
  "get/asyncGetPostComments",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${baseURL}pubg/comments/${id}`, {
        headers,
      });
      // console.log(result.data);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// // get all comments
// export const asyncGetAllComments = createAsyncThunk(
//   "get/asyncGetAllComments",
//   async (id, { rejectWithValue }) => {
//     try {
//       const result = await axios.get(`${baseURL}pubg/comments/${id}`, {
//         headers,
//       });
//       console.log(result.data);
//       return result.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

//post user data 2
export const asyncPostComments = createAsyncThunk(
  "post/asyncPostComments",
  async (data, { rejectWithValue, dispatch }) => {
    const { id, toast, comment_text } = data;
    // console.log(data);
    try {
      const res = await axios.post(
        `${baseURL}pubg/comments/${id}`,
        { comment_text },
        {
          headers,
        }
      );
      dispatch(asyncGetPostComments(id));
      toast.success("Comment added");
      return await res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// getting all user data 3
export const asyncDeleteComment = createAsyncThunk(
  "get/asyncDeleteComment",
  async (data, { rejectWithValue, dispatch }) => {
    const { id, toast, post_id } = data;
    console.log(data);
    try {
      const result = await axios.delete(
        `${baseURL}pubg/comments/delete/${id}`,
        {
          headers,
        }
      );
      toast.success("comments deleted");
      dispatch(asyncGetPostComments(post_id));
      return await result.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
// deleteing user data 4
export const asyncUpdateComment = createAsyncThunk(
  "get/asyncUpdateComment",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const { toast, id } = data;

    try {
      const result = await axios.put(`${baseURL}pubg/comments/update/${id}`, {
        headers,
      });
      toast.success(`updated successfully`);
      dispatch(asyncGetPostComments());
      return await result.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
const CommentsSlice = createSlice({
  name: "CommentsSlice",
  initialState,

  extraReducers: {
    // get all comments
    [asyncGetPostComments.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncGetPostComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.postComments = payload;
    },
    [asyncGetPostComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // post user comments
    [asyncPostComments.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [asyncPostComments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.postComments = [payload];
      // state.postComments = state.postComments.map((item) => {
      //   console.log(item.id);
      //   return item.it == payload.id ? payload : item;
      // });
    },
    [asyncPostComments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // delete users comments 3
    [asyncDeleteComment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    //  extraReducers: {

    [asyncDeleteComment.fulfilled]: (state, { payload }) => {
      state.loading = false;

      // const {
      //   arg: { id },
      // } = action.meta;

      // state.postComments = state.postComments.filter(
      //   (item) => item.id !== action.payload.id
      // );
      //   state.AllIdDetailsData = state.AllIdDetailsData.map(
      //     (item) => item.id == action.payload.id?action.payload:item
      //   );
    },
    [asyncDeleteComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // update users comments 4
    [asyncUpdateComment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncUpdateComment.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;

      // for edit
      state.postComments = state.postComments.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );
      //   state.AllIdDetailsData = state.AllIdDetailsData.map(
      //     (item) => item.id == action.payload.id?action.payload:item
      //   );
    },
    [asyncUpdateComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const selectpostComments = (state) => state.CommentsSlice.postComments;

export default CommentsSlice.reducer;
