import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

import search from "../img/search.png";

function Header() {
  const [searchData, setSearchData] = useState({
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const navigate = useNavigate();

  const handleMainLink = () => {
    navigate("/");
  };

  const handleProjectLink = () => {
    navigate("/project");
  };

  const handleRecruitmentLink = () => {
    navigate("/recruitment");
  };

  const handleLoginLink = () => {
    navigate("/login");
  };

  const handleRegisterLink = () => {
    navigate("/register");
  };

  return (
    <div className="Header">
      <div className="header-left">
        <p onClick={handleMainLink} style={{ cursor: "pointer" }}>
          Logo
        </p>
        <p onClick={handleProjectLink} style={{ cursor: "pointer" }}>
          프로젝트
        </p>
        <p onClick={handleRecruitmentLink} style={{ cursor: "pointer" }}>
          채용 공고
        </p>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <img src={search} alt="검색 이미지" />
          <input className="search-text" type="text" name="content" onChange={handleInputChange} placeholder="새로운 인사이트를 검색해보세요" />
        </div>
        <div className="user-bar">
          <p onClick={handleLoginLink} style={{ cursor: "pointer" }}>
            로그인
          </p>
          <p>/</p>
          <p onClick={handleRegisterLink} style={{ cursor: "pointer" }}>
            회원가입
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
