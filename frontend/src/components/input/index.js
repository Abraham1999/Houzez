import React from "react";

const Input = ({
  type,
  label,
  name,
  placeholder,
  error,
  disabled,
  value,
  innerRef,
}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`${
          error && "border border-red-500"
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        ref={innerRef}
        defaultValue={value}
      />
      {error && (
        <p className="mt-2 text-red-500 text-sm italic">{label} required</p>
      )}
    </div>
  );
};

export default Input;
