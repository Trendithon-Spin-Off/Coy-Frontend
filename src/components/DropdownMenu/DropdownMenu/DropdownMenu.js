import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { SlArrowDown } from "react-icons/sl";
import "./DropdownMenu.css";

function DropdownMenu() {
  const categories = [
    { id: 1, name: "소셜 네트워크" },
    { id: 2, name: "게임/엔터테인먼트" },
    { id: 3, name: "뉴스/정보" },
    { id: 4, name: "금융" },
    { id: 5, name: "기타" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [menuHeight, setMenuHeight] = useState(null);
  const [isItemSelected, setIsItemSelected] = useState(false); // 아이템이 선택되었는지 여부를 저장하는 상태
  const dropdownRef = useRef(null); // 드롭다운 메뉴 참조를 위한 useRef 추가

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  useEffect(() => {
    //아무 곳이나 클릭 시 메뉴 닫기 처리
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
    const index = selectedCategories.indexOf(categoryName);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, categoryName]);
      setIsItemSelected(true); // 아이템이 선택되었음을 표시
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
      setIsItemSelected(false); // 아이템이 선택 해제되었음을 표시
    }
  }

  function DropdownItem({ category }) {
    const isSelected = selectedCategories.includes(category.name);

    return (
      <label className={`menu-item ${isSelected ? "selected" : ""}`}>
        {category.name}
        <input type="checkbox" checked={isSelected} onChange={() => handleCategoryClick(category.name)} />
      </label>
    );
  }

  return (
    <div className={`dropdown ${isItemSelected ? "open" : ""}`} ref={dropdownRef}>
      {/* 아이템이 선택되었을 때 버튼 색상 변경 */}
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        카테고리
        <SlArrowDown className="arrow-button" />
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

export default DropdownMenu;
