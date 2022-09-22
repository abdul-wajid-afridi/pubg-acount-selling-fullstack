import React from "react";

const UserPostCard = ({ image, icon1, icon2, onEdit, onDelete }) => {
  return (
    <div className="flex flex-row gap-10 justify-center sm:justify-between items-center flex-wrap w-full sm:w-[70%] shadow-lg ">
      <div className="w-full sm:w-[320px] h-[220px]">
        <img src={image} className="w-full h-full" alt="image" />
      </div>
      <div className="flex  sm:flex-col gap-10 m-10 items-center ">
        <span onClick={onDelete}>{icon1}</span>

        <span onClick={onEdit}>{icon2}</span>
      </div>
    </div>
  );
};

export default UserPostCard;
