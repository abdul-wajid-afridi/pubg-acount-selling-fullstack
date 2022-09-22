import React from "react";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../../Config/UrlConfig";
import {
  asyncGetHearts,
  asyncGiveHearts,
} from "../../Redux/Features/LikesHeartsSlice";

const FavoriteAcounts = () => {
  const { userHearts } = useSelector((state) => state.LikesHearts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetHearts());
  }, [dispatch]);
  console.log(userHearts?.result);
  if (userHearts?.result?.length < 1) {
    return (
      <p className="text-3xl sm:text-xl text-center text-red-700 font-bold mt-20 animate-bounce">
        No data Found
      </p>
    );
  }
  return (
    <div>
      {userHearts?.result?.map((it) => {
        return (
          <>
            <p>{it.idDetails_id}</p>
            <p>{it.users_id}</p>
            <p>{it.title}</p>
            <span onClick={() => dispatch(asyncGiveHearts(it.id))}>
              <FaTrash />
            </span>
            {it?.image?.slice(0, 1).map((it) => {
              return (
                <img
                  src={`${base_url}/${it.url}`}
                  className="h-32 w-32"
                  alt=""
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default FavoriteAcounts;
