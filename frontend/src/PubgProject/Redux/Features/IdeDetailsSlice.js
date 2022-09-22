import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllDetails, PostIdDetailsData } from "../Api";

const config = {
  headers: {
    token: JSON.parse(localStorage.getItem("token"))?.accessToken,
  },
};
const baseURL = "http://localhost:5000/";
const initialState = {
  AllIdDetailsData: [],
  usersIdPosts: [],
  error: null,
  loading: false,
};

// getting all data 1
export const asyncGetAllIdDetails = createAsyncThunk(
  "get/asyncGetAllIdDetails",
  async (data, { rejectWithValue }) => {
    try {
      // const result = await getAllDetails();
      const result = await axios.get(`${baseURL}pubg/idDetails`);
      return await result.data;
    } catch (error) {
      console.log(error.response.data);
      rejectWithValue(error);
    }
  }
);

//post user data 2
export const asyncPostIdDetails = createAsyncThunk(
  "post/asyncPostIdDetails",
  async (data, { rejectWithValue, getState }) => {
    const { toast, fd } = data;
    try {
      // const res = await PostIdDetailsData(fd);
      // return await res.data
      const res = await axios.post(`${baseURL}pubg/idDetails`, fd, {
        headers: {
          "Content-type": "multipart/form-data",
          token: JSON.parse(localStorage.getItem("token"))?.accessToken,
        },
      });
      toast.success("Data posted");
      return await res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// getting all user data 3
export const asyncGetUsersData = createAsyncThunk(
  "get/asyncGetUsersData",
  async (data, { rejectWithValue }) => {
    try {
      // const result = await getUserData();
      const result = await axios.get(`${baseURL}pubg/users-posts`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token"))?.accessToken,
        },
      });
      return await result.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
// deleteing user data 4
export const asyncDeleteUsersData = createAsyncThunk(
  "get/asyncDeleteUsersData",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const { toast, id } = data;

    try {
      const result = await axios.delete(
        `${baseURL}pubg/idDetails/delete/${id}`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token"))?.accessToken,
          },
        }
      );
      toast.success(`deleted`);
      dispatch(asyncGetUsersData());
      return await result.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
const IdDetails = createSlice({
  name: "IdDetails",
  initialState,

  extraReducers: {
    // get all user id details1
    [asyncGetAllIdDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncGetAllIdDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.AllIdDetailsData = payload;
    },
    [asyncGetAllIdDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // post user id details 2
    [asyncPostIdDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncPostIdDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.AllIdDetailsData = [payload];
    },
    [asyncPostIdDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // get all users posts 3
    [asyncGetUsersData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncGetUsersData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // console.log(payload);
      state.usersIdPosts = payload;
    },
    [asyncGetUsersData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // delete users posts 4
    [asyncDeleteUsersData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncDeleteUsersData.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;

      state.usersIdPosts = state.usersIdPosts.filter(
        (item) => item.id !== action.payload.id
      );
      state.AllIdDetailsData = state.AllIdDetailsData.filter(
        (item) => item.id !== action.payload.id
      );

      // for edit
      // state.usersIdPosts = state.usersIdPosts.map(
      //   (item) => item.id == action.payload.id?action.payload:item
      // );
      // state.AllIdDetailsData = state.AllIdDetailsData.map(
      //   (item) => item.id == action.payload.id?action.payload:item
      // );
    },
    [asyncDeleteUsersData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const selectIdDetailsData = (state) => state.IdDetails.AllIdDetailsData;

export default IdDetails.reducer;
