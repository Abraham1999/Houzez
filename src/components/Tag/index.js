import React from "react";

function Tag({ value, extraStyle }) {
  return (
    <div className={`px-4 py-2 rounded-lg text-lg text-white ${extraStyle}`}>
      {value}
    </div>
  );
}

export default Tag;
