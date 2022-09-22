import React from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
const AppComments = ({ comment_Text, userName, onDelete }) => {
  const { user } = useSelector((state) => state.UserSlice);

  return (
    <div className="bg-gray-200 rounded-xl relative rounded-tl-3xl rounded-br-none p-3">
      <p className="font-bold">{userName}</p>
      <p className="text-gray-700">{comment_Text}</p>
      {user?.userName && (
        <FaTrash
          onClick={onDelete}
          className="absolute top-2 right-2 text-red-600"
        />
      )}
    </div>
  );
};

export default AppComments;
