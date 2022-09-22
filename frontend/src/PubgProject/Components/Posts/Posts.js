import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncGetPosts,
  asyncLikeCount,
  asyncLikePosts,
  selectCurrentPage,
  selectNumberOfPages,
  selectPost,
  setCurrentPage,
} from "../../Redux/reduxSlices/PostSlice";
import AppGallary from "../AppGallary";
import AppPagination from "../AppPagination";
import "../Styles/Posts.css";
import Post from "./Post/Post";
const Posts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectPost);
  const currentPage = useSelector(selectCurrentPage);
  const numberOfPages = useSelector(selectNumberOfPages);
  useEffect(() => {
    dispatch(asyncGetPosts(currentPage));
  }, [dispatch, currentPage]);

  const likeHandler = (id) => {
    dispatch(asyncLikePosts({ id }));
  };
  return (
    <>
      <AppGallary>
        {data &&
          data.map((it) => {
            return (
              <Post
                key={it._id}
                state={it}
                creatorName={it.creatorName}
                selectedFile={it.selectedFile}
                likeCount={it.likeCount.length}
                tags={it.tags}
                title={it.title}
                message={it.message}
                createdAt={it.createdAt}
                onClick={() => likeHandler(it._id)}
              />
            );
          })}
      </AppGallary>
      <AppPagination
        setCurrentPage={setCurrentPage}
        dispatch={dispatch}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </>
  );
};

export default Posts;
