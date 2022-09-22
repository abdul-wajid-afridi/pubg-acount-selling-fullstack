import React from "react";

const AppButton = ({ children, onClick, style }) => {
  return (
    <button
      className={`${style} capitalize bg-gradient-to-r flex justify-center items-center hover:from-cyan-300 hover:to-blue-500 rounded-full text-white font-bold tracking-wide   from-blue-600 to-purple-500 py-2 w-full `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AppButton;
