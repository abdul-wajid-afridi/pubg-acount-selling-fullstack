import React from "react";
import "../Styles/Form.css";
const Form = ({ children, width }) => {
  return (
    <div
      className={`flex flex-col bg-gray-100 gap-10 shadow-lg p-10 ${
        width ? width : "w-[320px] sm:w-[400px]"
      }`}
    >
      {children}
    </div>
  );
};

export default Form;
