import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Child = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const inter = setTimeout(() => {
      navigate("/login");
    }, 0);
    return () => clearInterval(inter);
  }, [navigate]);
};
const AppProtectRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.UserSlice }));
  return <div>{user ? children : <Child />}</div>;
};

export default AppProtectRoute;
