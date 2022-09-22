import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetUsers, selectAllUser } from "../../Redux/Features/UserSlice";

const AllUsers = () => {
  const allUsers = useSelector(selectAllUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetUsers());
  }, []);
  // console.log(allUsers);
  return <div>AllUsers</div>;
};

export default AllUsers;
