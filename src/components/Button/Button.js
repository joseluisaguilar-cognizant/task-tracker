import PropTypes from "prop-types";
import React from "react";

// In this component we're gonna use default arguments
const Button = ({ color = "steelblue", text = "Click", clickEvent }) => {
  return (
    <button
      onClick={clickEvent}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
