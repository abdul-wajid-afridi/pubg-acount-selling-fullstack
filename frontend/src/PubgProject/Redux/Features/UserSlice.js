import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllUsers, userLogin, userSignUp } from "../Api";

const baseURL = "http://localhost:5000/";
const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers = JSON.parse(localStorage.getItem("token")).accessToken;
  }
  return req;
});

const initialState = {
  allUsers: [],
  user: null,
  likes: [],
  error: null,
  loading: false,
};
// get All Users
export const asyncGetUsers = createAsyncThunk(
  "get/asyncGetUsers",
  async (data, { rejectWithValue }) => {
    try {
      // const result = await getAllUsers();
      const result = await axios.get(`${baseURL}pubg/register`);

      console.log(result);
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// sign Up User
export const asyncSignUp = createAsyncThunk(
  "post/asyncSignUp",
  async (data, { rejectWithValue }) => {
    const { toast, navigate, userName, email, password, phoneNumber } = data;
    try {
      const result = await userSignUp(data);
      navigate("/login");
      toast.success("Registered successfully");
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

//Login user
export const asyncLoginUser = createAsyncThunk(
  "post/asyncLoginUser",
  async (data, { rejectWithValue }) => {
    const { phoneNumber, password, Navigate, toast } = data;
    try {
      const result = await userLogin(data);
      Navigate("/");
      toast.success("login successfully");
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
//likes
export const asyncLikes = createAsyncThunk(
  "post/asyncLikes",
  async (data, { rejectWithValue }) => {
    // const {  toast } = data;
    try {
      const result = await axios.put();
      return await result.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,

  // simple reducer
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUserLogOut: (state, { payload }) => {
      localStorage.clear();
      state.user = null;
    },
  },

  extraReducers: {
    // // get all users
    [asyncGetUsers.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [asyncGetUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
    },
    [asyncGetUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //sign up
    [asyncSignUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [asyncSignUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    [asyncSignUp.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Login user
    [asyncLoginUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [asyncLoginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("token", JSON.stringify({ ...payload }));
      state.user = payload;
    },
    [asyncLoginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const selectUser = (state) => state.UserSlice.user;
export const selectAllUser = (state) => state.UserSlice.allUsers;
export const selectError = (state) => state.UserSlice.error;
export const selectLoading = (state) => state.UserSlice.loading;
export const { setUser, setUserLogOut } = UserSlice.actions;
export default UserSlice.reducer;
