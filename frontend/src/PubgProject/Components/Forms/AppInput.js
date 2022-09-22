import React from "react";
const AppInput = ({ icon, type, placeholder, value, onChange, style }) => {
  return (
    <div
      className={`${style} flex items-center gap-3 shadow-lg rounded-xl hover:bg-gray-300 transition-all duration-300 px-3 bg-gray-100 w-full `}
    >
      <span>{icon}</span>
      <input
        className="bg-transparent w-full py-2 outline-none border-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AppInput;
