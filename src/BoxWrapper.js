import React from "react";
import { Link } from "react-router-dom";

function Landing({boxText , buttonText , toLink }) {
  return (
    <div className="box-wrapper">
      <div className="box-text ">
       {boxText}
      </div>
      <Link to={toLink} className="box-btn">
        {buttonText}
      </Link>
    </div>
  );
}

export default Landing;
