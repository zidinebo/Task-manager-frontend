import React, { useState } from "react";
import downArrow from "../assets/Vector arrowdown.png";

const DropDown = ({ setTag }) => {
  // const [tag, setTag] = useState("Select a Tag");
  const [options, setOptions] = useState(["Urgent", "Important"]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOption = (option) => {
    setSelected(option);
    setIsOpen(false);
    setTag(option);
  };

  return (
    <div className="tag-new position-relative rounded-2  py-4 px-5">
      <h3 className="position-absolute">Tags</h3>
      <div
        onClick={toggleDropdown}
        className="d-flex d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center gap-5">
          <p className="m-0 py-1 px-2 rounded-1">
            {selected || "Select a Tag"}
          </p>
        </div>
        <img
          src={downArrow}
          style={{
            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "0.3s ease-in-out",
          }}
          alt=""
        />
      </div>

      <ul className="position-absolute mt-4 bg-secondary w-100 list-unstyled start-0 rounded-2 p-1 text-white">
        {isOpen
          ? options.map((option) => {
              return (
                <li
                  onClick={() => {
                    return handleOption(option);
                  }}
                  key={option}
                  className="p-1"
                  style={{ cursor: "pointer" }}
                >
                  {option}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default DropDown;
