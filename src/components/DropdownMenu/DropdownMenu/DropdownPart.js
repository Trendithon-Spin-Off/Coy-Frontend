import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { SlArrowDown } from "react-icons/sl";

import "./DropdownMenu.css";

function DropdownPart({ selectedParts = [], onPartSelect }) {
  const parts = [
    { id: 1, name: "기획" },
    { id: 2, name: "디자인" },
    { id: 3, name: "백엔드" },
    { id: 4, name: "프론트엔드" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState("");
  const [menuHeight, setMenuHeight] = useState(null);
  const [isPartSelected, setIsPartSelected] = useState(false);
  const dropdownRef = useRef(null);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handlePartSelect = (part) => {
    setSelectedPart((prevParts) => {
      if (prevParts.includes(part)) {
        return prevParts.filter((p) => p !== part);
      } else {
        return [...prevParts, part];
      }
    });
    setIsOpen(false);
  };

  function DropdownItem({ part }) {
    const isSelected = selectedParts.includes(part.name);

    return (
      <label className={`menu-item ${isSelected ? "selected" : ""}`}>
        {part.name}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handlePartSelect(part.name)}
        />
      </label>
    );
  }

  return (
    <div
      className={`dropdown ${selectedParts.length > 0 ? "open" : ""}`}
      ref={dropdownRef}
    >
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedParts.length > 0 ? selectedParts.join(", ") : "파트"}{" "}
        <SlArrowDown className={`arrow-button ${isOpen ? "rotate" : ""}`} />
      </button>
      <CSSTransition
        in={isOpen}
        unmountOnExit
        timeout={10}
        onEnter={calcHeight}
        classNames="menu-primary"
      >
        <div className="menu" style={{ height: isOpen ? menuHeight : 0 }}>
          {parts.map((part) => (
            <label
              key={part.id}
              className={`menu-item ${
                selectedParts.includes(part.name) ? "selected" : ""
              }`}
            >
              {part.name}
              <input
                type="checkbox"
                checked={selectedParts.includes(part.name)}
                onChange={() => onPartSelect(part.name)}
              />
            </label>
          ))}
        </div>
      </CSSTransition>{" "}
    </div>
  );
}

export default DropdownPart;
