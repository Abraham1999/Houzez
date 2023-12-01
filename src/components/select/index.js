import React from "react";

const Select = ({ label, name, value, options, onChange }) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className=""
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
