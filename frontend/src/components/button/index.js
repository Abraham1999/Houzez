import React from "react";

const Button = ({ type, text, className, onClick, ...rest }) => {
  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {text}
    </button>
  );
};

export default Button;
