import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardGallary from "../Components/CardGallary";
import HomeCard from "../Components/HomeCard";
import {
  asyncGetAllIdDetails,
  asyncGetUsersData,
} from "../Redux/Features/IdeDetailsSlice";
import {
  asyncGetHearts,
  asyncGiveHearts,
} from "../Redux/Features/LikesHeartsSlice";
const Home = () => {
  const [Color, setColor] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { AllIdDetailsData } = useSelector((state) => ({ ...state.IdDetails }));
  const { userHearts } = useSelector((state) => ({ ...state.LikesHearts }));
  const { user } = useSelector((state) => ({ ...state.UserSlice }));
  useEffect(() => {
    dispatch(asyncGetUsersData());
    dispatch(asyncGetHearts());
    dispatch(asyncGetAllIdDetails());
  }, [dispatch]);
  // console.log(userHearts?.result?.map((it) => it.users_id));
  // userHearts?.result;
  // console.log(user.id);
  // console.log(
  //   userHearts?.result?.map((it) => (it?.idDetails_id ? "red" : "green"))
  // );
  if (AllIdDetailsData?.result?.length < 1) {
    return (
      <p className="text-3xl sm:text-xl text-center text-red-700 font-bold mt-20 animate-bounce">
        No data Found
      </p>
    );
  }
  return (
    <CardGallary>
      {AllIdDetailsData?.result &&
        AllIdDetailsData?.result.map((item) => {
          return (
            <HomeCard
              key={item.id}
              onClick={() => Navigate("/idDetails", { state: item })}
              item={item}
              idLevel={item?.idLevel}
              // bg_color={"text-red-600"}
              bg_color={userHearts?.result?.map((it) =>
                it?.idDetails_id === item.id ? "text-red-600" : "text-red-100"
              )}
              image={item?.image}
              handleHeart={() => dispatch(asyncGiveHearts(item.id))}
            />
          );
        })}
    </CardGallary>
  );
};

export default Home;
