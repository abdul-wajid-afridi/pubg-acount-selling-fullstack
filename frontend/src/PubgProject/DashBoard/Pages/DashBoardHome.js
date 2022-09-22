import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserPostCard from "../../Components/Posts/Post/UserPostCard";
import {
  asyncDeleteUsersData,
  asyncGetAllIdDetails,
  asyncGetUsersData,
} from "../../Redux/Features/IdeDetailsSlice";
import AllUsers from "./AllUsers";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { base_url } from "../../Config/UrlConfig";
const DashBoardHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { AllIdDetailsData, usersIdPosts, loading } = useSelector((state) => ({
    ...state.IdDetails,
  }));
  const { user } = useSelector((state) => ({
    ...state.UserSlice,
  }));
  const handleDelete = (id) => {
    if (window.confirm("are you sure to delete")) {
      dispatch(asyncDeleteUsersData({ id, toast }));
    }
  };
  useEffect(() => {
    dispatch(asyncGetUsersData());
  }, [dispatch, user?.userName]);

  if (usersIdPosts?.result?.length < 1) {
    return (
      <p className="text-3xl sm:text-xl text-center text-red-700 font-bold mt-20 animate-bounce">
        No data Found
      </p>
    );
  }
  return (
    <section className="flex flex-col items-center  sm:gap-10 gap-20 mt-10 ">
      {usersIdPosts?.result &&
        usersIdPosts?.result.map((it) => (
          <>
            <UserPostCard
              title={it.title}
              idLevel={it.idLevel}
              img={it.image.slice(0, 1).map((it) => `${base_url}/${it.url}`)}
              iconEdit={<FaEdit />}
              iconTrash={<FaTrash />}
              onDelete={() => handleDelete(it.id)}
              // onEdit={{}}
            />
          </>
        ))}
    </section>
  );
};

export default DashBoardHome;
