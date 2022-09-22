import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppProtectRoute from "./Components/AppProtectRoute";
import IdDetails from "./Components/IdDetails";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Components/PageNotFound";
import AllUsers from "./DashBoard/Pages/AllUsers";
import DashBoardHome from "./DashBoard/Pages/DashBoardHome";
import FavoriteAcounts from "./DashBoard/Pages/FavoriteAcounts";
import UploadIdDetails from "./DashBoard/Pages/UploadIdDetails";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { selectAllUser, selectUser } from "./Redux/Features/UserSlice";

const Index = () => {
  // const user = useSelector(selectUser);

  const userToken = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => ({ ...state.UserSlice }));
  useEffect(() => {}, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idDetails" element={<IdDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/postid-details" element={<UploadIdDetails />} />
        <Route path="*" element={<PageNotFound />} />
        {/* dashboard  */}
        <Route
          path="/dashboard"
          element={
            <AppProtectRoute>
              <DashBoardHome />
            </AppProtectRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <AppProtectRoute>
              <FavoriteAcounts />
            </AppProtectRoute>
          }
        />
        <Route
          path="/allusers"
          element={
            <AppProtectRoute>
              <AllUsers />
            </AppProtectRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Index;
