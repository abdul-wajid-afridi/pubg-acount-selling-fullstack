import React from "react";
import "../styles/HomeCard.css";
import { FaHeart } from "react-icons/fa";
import { base_url } from "../Config/UrlConfig";
const HomeCard = ({
  onClick,
  item,
  title,
  subTitle,
  price,
  idLevel,
  image,
  bg_color,
  handleHeart,
}) => {
  return (
    <div className="home__card">
      {image &&
        image.slice(0, 1).map((it) => {
          return (
            <img
              onClick={onClick}
              key={it.url}
              src={`${base_url}/${it.url}`}
              alt={title}
            />
          );
        })}
      <div className="home__card__text">
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
        <h4>{price}</h4>
        <p>{idLevel}</p>
        <span onClick={handleHeart}>
          <FaHeart className={`home__heart ${bg_color}`} />
        </span>
      </div>
    </div>
  );
};

export default HomeCard;
