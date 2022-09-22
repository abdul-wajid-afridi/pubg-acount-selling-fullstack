import React from "react";

const AppHeader = ({ children }) => {
  return (
    <p className="text-center my-10 text-xl  bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-500 sm:font-bold sm:text-3xl">
      {children}
    </p>
  );
};

export default AppHeader;
