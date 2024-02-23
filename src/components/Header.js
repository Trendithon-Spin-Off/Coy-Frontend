import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import styled from "styled-components";

import Coy from "../img/Coy.png";
import search from "../img/search.png";
import bell from "../img/bell.png";
import defalut from "../img/NonProfile.png";

const API_BASE_URL = "https://likelion-running.store/api";

const DropdownContainer = styled.div`
  z-index: 2;
  position: absolute;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 145px;
  top: 55px;
  right: 0;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
`;

const DropdownItem = styled.div`
  height: 45px;
  color: #353e4f;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    color: #439aff;
  }
  > img {
    width: 24px;
    height: 24px;
    margin-right: 5px;
    margin-left: 15px;
  }
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }

  /* 로그인되지 않은 상태일 때 모든 가장자리의 radius를 추가 */
  &:only-child {
    border-radius: 10px;
  }
`;

const DropdownBellContainer = styled.div`
  z-index: 2;
  position: absolute;
  width: 370px;
  height: 395px;
  top: 50.5px;
  right: 0;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0.1, 0.1, 0.1, 0.2);
`;

function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const bellDropdownRef = useRef(null);

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const [searchData, setSearchData] = useState("");

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
  };

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

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");

    // 로그아웃 후 /home으로 이동
    navigate("/");

    // 강제로 페이지 새로고침
    window.location.reload();
  };

  // 드롭다운 관련 코드
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isBellDropdownVisible, setBellDropdownVisible] = useState(false);

  const handleMenuClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBellMenuClick = () => {
    setBellDropdownVisible(!isBellDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellDropdownRef.current && !bellDropdownRef.current.contains(event.target)) {
        setBellDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
            <div className="img-bell" onClick={handleBellMenuClick} style={{ position: "relative" }} ref={bellDropdownRef}>
              <img src={bell} alt="알람창" style={{ cursor: "pointer" }} />
              {isBellDropdownVisible && (
                <DropdownBellContainer isVisible={isBellDropdownVisible}>
                  <div className="bell-title">알림</div>
                  <div className="bell-list">
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                    <div className="bell-content">
                      <img src={defalut} alt="프로필 사진" />
                      <p>nnn 님이 프로젝트 'nnnnnnn'를 좋아합니다.</p>
                    </div>
                  </div>
                </DropdownBellContainer>
              )}
            </div>
            <div className="img-profile" onClick={handleMenuClick} style={{ position: "relative" }} ref={dropdownRef}>
              <img src={defalut} alt="내 프로필" style={{ cursor: "pointer" }} />
              {isDropdownVisible && (
                <DropdownContainer isVisible={isDropdownVisible}>
                  <DropdownItem onClick={() => handleNavLinkClick("/mypage")}>내 프로필</DropdownItem>
                  <DropdownItem onClick={() => handleNavLinkClick("/like/project")}>내 좋아요</DropdownItem>
                  <div className="header-line" />
                  <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                </DropdownContainer>
              )}
            </div>
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
