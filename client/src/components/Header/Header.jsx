// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Header.css";
import image from "../../../public/assets/memories.png";

const Header = () => {
  return (
    <div className="header mt-3 p-1">
      <h1 className="header-text">Reminiscence</h1>
      <img className="header-img" src={image} alt="image" />
    </div>
  );
};

export default Header;
