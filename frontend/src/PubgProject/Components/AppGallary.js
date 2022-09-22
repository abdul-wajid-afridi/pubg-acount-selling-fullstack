import React from "react";

const AppGallary = ({ children }) => {
  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {children}
    </div>
  );
};

export default AppGallary;
