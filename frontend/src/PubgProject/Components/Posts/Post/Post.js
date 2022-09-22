import React from "react";
import "../../Styles/Post.css";
import moment from "moment";
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import "../../Styles/PostCard.css";
import { Link } from "react-router-dom";
const shortText = (str) => {
  if (str?.length > 22) {
    str = str.substring(0, 30) + "...";
  }
  return str;
};

const Post = ({
  onClick,
  createdAt,
  title,
  tags,
  image,
  message,
  creatorName,
  likeCount,
  width,
  state,
}) => {
  return (
    <Link to={"/postDetails"} state={state}>
      <section
        className={` ${
          width ? width : "w-[350px]"
        } w-full flex flex-col h-[500px]  relative shadow-xl shadow-slate-400 `}
      >
        <div className="post__card__upper">
          <div className="flex flex-col">
            <p>{creatorName}</p>
          </div>
          <div>
            <p>{title}</p>
          </div>
        </div>
        <img src={image} className="w-full h-[380px]" alt="" />
        <div className="flex w-full justify-between px-2">
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">{tags}</p>
            <p>{width ? message : shortText(message)}</p>
          </div>
          <div>
            <p className="text-gray-700">{moment(createdAt).fromNow()}</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between px-2">
          <p
            onClick={onClick}
            className="flex items-center gap-2 bg-blue-500 px-2 rounded-md"
          >
            {likeCount}
            <span className="text-white">
              <FaThumbsUp />
            </span>
          </p>
        </div>
      </section>
    </Link>
  );
};

export default Post;
