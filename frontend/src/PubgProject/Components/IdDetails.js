import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  asyncDeleteComment,
  asyncGetPostComments,
  asyncPostComments,
  selectpostComments,
} from "../Redux/Features/CommentsSlice";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import AppInput from "./Forms/AppInput";
import AppComments from "./Forms/AppComments";
import { base_url } from "../Config/UrlConfig";
const IdDetails = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [comment_text, setCommentText] = useState("");
  const { image, title, id, subTitle, discription, idLevel, price } = state;
  const postsComments = useSelector(selectpostComments);
  const { user } = useSelector((state) => state.UserSlice);

  const commentHandler = (e) => {
    e.preventDefault();
    dispatch(asyncPostComments({ comment_text, id, toast }));
    setCommentText("");
  };

  useEffect(() => {
    dispatch(asyncGetPostComments(id));
  }, [dispatch]);
  return (
    <section className="flex justify-center flex-wrap mt-10 sm:px-10 sm:justify-center">
      <div className="flex flex-col  w-[70%]">
        <div className="flex flex-wrap gap-10">
          {image.map((it) => {
            return (
              <img
                key={it.url}
                src={`${base_url}/${it.url}`}
                className="h-[400px] sm:w-[400px] w-[100%]"
              />
            );
          })}
        </div>
        <div className="text-gray-800">
          <p>{subTitle}</p>
          <p>{title}</p>
          <p>{price}</p>
          <p>{idLevel}</p>
          <p>{discription}</p>
        </div>
      </div>

      {/* comments side */}
      <section className="flex flex-col">
        {user?.userName && (
          <form
            onSubmit={commentHandler}
            className="flex items-center gap-4 py-3 mb-4"
          >
            <AppInput
              type="text"
              placeholder="comments"
              value={comment_text}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <FaPaperPlane
              onClick={commentHandler}
              className="text-3xl text-blue-600"
            />
          </form>
        )}

        <div className="flex flex-col gap-7">
          {postsComments?.result &&
            postsComments?.result &&
            postsComments?.result.map((it) => {
              return (
                <AppComments
                  comment_Text={it.comment_text}
                  userName={it.userName}
                  onDelete={() =>
                    dispatch(
                      asyncDeleteComment({ id: it.id, toast, post_id: id })
                    )
                  }
                />
              );
            })}
        </div>
      </section>
    </section>
  );
};

export default IdDetails;
