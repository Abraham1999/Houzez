import React from "react";

const Input = ({
  type,
  label,
  name,
  extraStyle,
  placeholder,
  error,
  disabled,
  value,
  innerRef,
}) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`${extraStyle}`}
        ref={innerRef}
        defaultValue={value}
      />
      {error && <p className="">{label} required</p>}
    </div>
  );
};

export default Input;
