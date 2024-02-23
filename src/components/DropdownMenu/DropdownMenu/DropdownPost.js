import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { SlArrowDown } from "react-icons/sl";
import "./DropdownMenu.css";

function DropdownPost({ setCategory }) {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  // setCategory 함수를 props로 전달받음
  const categories = [
    { id: 1, name: "소셜 네트워크" },
    { id: 2, name: "게임/엔터테인먼트" },
    { id: 3, name: "뉴스/정보" },
    { id: 4, name: "금융" },
    { id: 5, name: "기타" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태 추가
  const [menuHeight, setMenuHeight] = useState(null);
  const [isItemSelected, setIsItemSelected] = useState(false);
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

  function handleCategoryClick(categoryName) {
    if (selectedCategory === categoryName) {
      setSelectedCategory("");
      setIsItemSelected(false);
      setCategory(""); // 카테고리 선택 해제 시, 상위 컴포넌트의 카테고리 값을 빈 문자열로 업데이트
    } else {
      setSelectedCategory(categoryName);
      setIsItemSelected(true);
      setCategory(categoryName); // 카테고리 선택 시, 상위 컴포넌트의 카테고리 값을 선택된 카테고리로 업데이트
    }
    setIsOpen(false);
  }

  function DropdownItem({ category }) {
    const isSelected = selectedCategory === category.name;

    return (
      <label className={`menu-item ${isSelected ? "selected" : ""}`}>
        {category.name}
        <input type="checkbox" checked={isSelected} onChange={() => handleCategoryClick(category.name)} />
      </label>
    );
  }

  return (
    <div className={`dropdown ${isItemSelected ? "open" : ""}`} ref={dropdownRef}>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)} onChange={handleCategoryChange}>
        {selectedCategory || "카테고리"} <SlArrowDown className={`arrow-button ${isOpen ? "rotate" : ""}`} />
      </button>
      <CSSTransition in={isOpen} unmountOnExit timeout={10} onEnter={calcHeight} classNames="menu-primary">
        <div className="menu" style={{ height: isOpen ? menuHeight : 0 }}>
          {categories.map((category) => (
            <DropdownItem key={category.id} category={category} />
          ))}
        </div>
      </CSSTransition>{" "}
    </div>
  );
}

export default DropdownPost;
