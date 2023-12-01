import React from "react";

function RadioButton({ name, value, label, onChange, checked }) {
  return (
    <div className="">
      <input
        className=""
        type="radio"
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <label
        className="mt-px inline-blok pl-4 hover:cursor-pointer"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
