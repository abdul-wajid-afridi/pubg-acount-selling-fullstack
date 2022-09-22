import React from "react";
import AppRoundButton from "./AppRoundButton";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const AppPagination = ({
  setCurrentPage,
  dispatch,
  currentPage,
  numberOfPages,
}) => {
  const nextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  const prevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };
  // console.log(numberOfPages);
  const Paggination = () => {
    if (currentPage == numberOfPages && currentPage === 1) {
      return null;
    }
    if (currentPage == 1) {
      return (
        <AppRoundButton onClick={nextPage}>
          <FaArrowRight />
        </AppRoundButton>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <div className="flex gap-3">
          <AppRoundButton onClick={prevPage}>
            <FaArrowLeft />
          </AppRoundButton>
          <AppRoundButton onClick={nextPage}>
            <FaArrowRight />
          </AppRoundButton>
        </div>
      );
    } else {
      return (
        <AppRoundButton onClick={prevPage}>
          <FaArrowLeft />
        </AppRoundButton>
      );
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 my-10 ">
      {Paggination()}
      {currentPage} of ...{numberOfPages}
    </div>
  );
};

export default AppPagination;
