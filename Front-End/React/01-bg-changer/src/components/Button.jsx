import React from "react";

const Button = (props) => {
  return (
    <div className="">
      <button className="px-6 cursor-pointer py-1 rounded-2xl"
      style={{background: props.color}}
      >
        {props.color}
      </button>
    </div>
  );
};

export default Button;
