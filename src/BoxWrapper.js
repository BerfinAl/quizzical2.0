import React from "react";
import { Link } from "react-router-dom";

function Landing({ boxText, buttonText, toLink, imgSrc }) {
  return (
    <div className="box-wrapper">
      <img src={imgSrc} alt="img" />
      <div className="box-text ">{boxText}</div>
      <Link to={toLink} className="box-btn">
        {buttonText}
      </Link>
    </div>
  );
}

export default Landing;
