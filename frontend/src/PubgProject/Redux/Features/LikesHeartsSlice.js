import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../Config/UrlConfig";

const initialState = {
  userHearts: [],
  error: false,
  loading: false,
};

// way number 1 try
// axios.defaults.headers.common["token"] = JSON.parse(
//   localStorage.getItem("token").accessToken
// );

// try this first
// const api = axios.create({
//   baseURL: "http://localhost:5000/",
//   headers: JSON.parse(localStorage.getItem("token")).accessToken,
// });

// get all hearts
export const asyncGetHearts = createAsyncThunk(
  "get/asyncGetHearts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${base_url}/pubg/heart`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token"))?.accessToken,
        },
      });
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//give heart
export const asyncGiveHearts = createAsyncThunk(
  "get/asyncGiveHearts",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.post(
        `${base_url}/pubg/heart`,
        { idDetails_id: id },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token"))?.accessToken,
          },
        }
      );
      dispatch(asyncGetHearts());
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const LikesHeartSlice = createSlice({
  name: "likesHeart",
  initialState,
  reducers: {},
  extraReducers: {
    // get hearts
    [asyncGetHearts.pending]: (state, { payload }) => {
      state.loading = true;
      state.errors = false;
    },
    [asyncGetHearts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userHearts = payload;
    },
    [asyncGetHearts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // give hearts
    // [asyncGiveHeart.pending]: (state, { payload }) => {
    //   state.loading = true;
    //   state.errors = false;
    // },
    // [asyncGiveHeart.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userHearts = [payload];
    // },
    // [asyncGiveHeart.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

export default LikesHeartSlice.reducer;
