import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { SlArrowDown } from "react-icons/sl";
import "./DropdownMenu.css";

function DropdownPost() {
  const categories = [
    { id: 1, name: "소셜 네트워크" },
    { id: 2, name: "게임/엔터테이먼트" },
    { id: 3, name: "뉴스/정보" },
    { id: 4, name: "금융" },
    { id: 5, name: "기타" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리를 담는 상태로 변경
  const [menuHeight, setMenuHeight] = useState(null);
  const [isItemSelected, setIsItemSelected] = useState(false); // 아이템이 선택되었는지 여부를 저장하는 상태
  const dropdownRef = useRef(null); // 드롭다운 메뉴 참조를 위한 useRef 추가

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  useEffect(() => {
    // 아무 곳이나 클릭 시 메뉴 닫기 처리
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
      setSelectedCategory(""); // 같은 아이템을 클릭하면 선택 해제
      setIsItemSelected(false); // 선택이 해제되었으므로 상태 변경
    } else {
      setSelectedCategory(categoryName);
      setIsItemSelected(true); // 아이템이 선택되었음을 표시
    }
    setIsOpen(false); // 카테고리를 선택했으므로 메뉴 닫기
  }

  function DropdownItem({ category }) {
    const isSelected = selectedCategory === category.name; // 선택된 카테고리와 현재 아이템의 카테고리를 비교하여 isSelected 설정

    return (
      <label className={`menu-item ${isSelected ? "selected" : ""}`}>
        {category.name}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCategoryClick(category.name)}
        />
      </label>
    );
  }

  return (
    <div
      className={`dropdown ${isItemSelected ? "open" : ""}`}
      ref={dropdownRef}
    >
      {/* 아이템이 선택되었을 때 버튼 색상 변경 */}
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory || "카테고리"}{" "}
        {/* 선택된 카테고리가 없을 경우 기본값으로 "카테고리"를 표시합니다. */}
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
          {categories.map((category) => (
            <DropdownItem key={category.id} category={category} />
          ))}
        </div>
      </CSSTransition>{" "}
    </div>
  );
}

export default DropdownPost;
