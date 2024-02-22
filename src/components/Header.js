import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

import Coy from "../img/Coy.png";
import search from "../img/search.png";
import bell from "../img/bell.png";
import defalut from "../img/NonProfile.png";

const API_BASE_URL = "https://likelion-running.store/api";

function Header() {
  const [searchData, setSearchData] = useState("");

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
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

  const handleSearch = () => {
    if (searchData.trim() !== "") {
      navigate(`/search/project/${searchData.trim()}`); // 검색어를 trim하여 공백을 제거하고 검색합니다.
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  // 로그인 상태 관리
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 불러오기
    const storedToken = localStorage.getItem("token");

    // 토큰이 존재하면 로그인 상태를 true로 설정
    if (storedToken) {
      setLoggedIn(true);
      console.log("true");
    } else {
      setLoggedIn(false);
      console.log("false");
    }
  }, []);

  return (
    <div className="Header">
      <div className="header-left">
        <img src={Coy} alt="코이 로고" onClick={handleMainLink} style={{ cursor: "pointer" }} />
        <p onClick={handleProjectLink} style={{ cursor: "pointer" }}>
          프로젝트
        </p>
        <p onClick={handleRecruitmentLink} style={{ cursor: "pointer", marginLeft: "-25px" }}>
          채용 공고
        </p>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <img src={search} alt="검색 이미지" onClick={handleSearch} style={{ cursor: "pointer" }} />
          <input className="search-text" type="text" value={searchData} onChange={handleInputChange} onKeyPress={handleOnKeyPress} placeholder="새로운 인사이트를 검색해보세요" />
        </div>
        {isLoggedIn ? (
          <div className="login-user">
            <img className="img-bell" src={bell} alt="알람창" />
            <img className="img-profile" src={defalut} alt="내 프로필" />
          </div>
        ) : (
          <div className="user-bar">
            <p onClick={handleLoginLink} style={{ cursor: "pointer" }}>
              로그인
            </p>
            <p>/</p>
            <p onClick={handleRegisterLink} style={{ cursor: "pointer" }}>
              회원가입
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
