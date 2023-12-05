import React from "react";

function Tag({ value, background }) {
  return (
    <div
      className={`px-4 py-2 rounded-md text-lg float-right text-white ${background}`}
    >
      {value}
    </div>
  );
}

export default Tag;
