import React from "react";

const AppRoundButton = ({ onClick, children, style }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} flex justify-center items-center capitalize text-2xl text-blue-200 hover:text-white bg-blue-600 hover:bg-blue-800 rounded-full h-[38px] w-[40px]`}
    >
      {children}
    </button>
  );
};

export default AppRoundButton;
