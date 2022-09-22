import React from "react";

const UserPostCard = ({
  img,
  iconEdit,
  iconTrash,
  title,
  idLevel,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="flex sm:shadow-lg sm:flex-row flex-col items-center sm:h-[120px] h-[350px] w-[80%] justify-between">
      <div className="flex  sm:h-[120px] h-[250px]  gap-5">
        <img
          src={img}
          className="h-[250px]  sm:h-[120px] sm:w-[120px] w-[200px]"
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <p>{title}</p>
          <p>{idLevel}</p>
        </div>
      </div>
      <div className="flex sm:flex-col items-center justify-center gap-5 mr-3">
        <p className="sm:text-2xl text-xl text-indigo-600" onClick={onEdit}>
          {iconEdit}
        </p>
        <p className="sm:text-2xl text-xl text-red-600" onClick={onDelete}>
          {iconTrash}
        </p>
      </div>
    </section>
  );
};

export default UserPostCard;
