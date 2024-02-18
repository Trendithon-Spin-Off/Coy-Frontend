import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { SlArrowDown } from "react-icons/sl";

import "./DropdownMenu.css";

function DropdownPost({ selectedParts = [], onPartSelect }) {
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

  function handlePartClick(partName) {
    if (selectedPart === partName) {
      setSelectedPart("");
      setIsPartSelected(false);
      onPartSelect("");
    } else {
      setSelectedPart(partName);
      setIsPartSelected(true);
      onPartSelect(partName);
    }
    setIsOpen(false);
  }

  function DropdownItem({ part }) {
    const isSelected = selectedPart === part.name;

    return (
      <label className={`menu-item ${isSelected ? "selected" : ""}`}>
        {part.name}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handlePartClick(part.name)}
        />
      </label>
    );
  }

  return (
    <div
      className={`dropdown ${isPartSelected ? "open" : ""}`}
      ref={dropdownRef}
    >
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedPart || "파트"}{" "}
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
            <DropdownItem key={part.id} part={part} />
          ))}
        </div>
      </CSSTransition>{" "}
    </div>
  );
}

export default DropdownPost;
