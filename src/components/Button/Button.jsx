import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <div className="button" onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
};

export default Button;
