import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Profile_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";
import Default from "../img/NonProject.png";

function Card_Profile_Project() {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/read");
  };

  return (
    <div className="Card-Profile-Project" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card-Profile-Project-img">
        <img src={Default} alt="프로젝트 이미지" />
      </div>
      <div className="Card-Profile-Project-content">
        <div className="Card-Project-common">
          <div className="Card-Project-content-texts">
            <div className="Card-Profile-Project-category">
              <p>카테고리</p>
            </div>
            <div className="Card-Project-text">
              <p className="Card-Profile-Project-title">프로젝트 이름</p>
              <p className="Card-Profile-Project-description">한줄 소개를 입력해 주세요.</p>
            </div>
          </div>
          <div className="Card-Project-looklike">
            <div className="Card-Profile-Project-look">
              <img src={Look} alt="조회수" />
              <p>n,nnn</p>
            </div>
            <div className="Card-Profile-Project-like">
              <img src={Like} alt="좋아요수" />
              <p>n,nnn</p>
            </div>
          </div>
        </div>
        <div className="Card-Profile-Project-hover">
          <div className="to-Profile-project-btn">
            <p>👀</p>
            <img src={Arrow} alt="탐색 버튼" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_Profile_Project;
