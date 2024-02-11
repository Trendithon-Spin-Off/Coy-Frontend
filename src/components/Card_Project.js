import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";

function Card_Project() {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/read");
  };

  return (
    <div className="Card-Project" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card-Project-img"></div>
      <div className="Card-Project-content">
        <div className="Card-Project-common">
          <div className="Card-Project-content-texts">
            <div className="Card-Project-category">
              <p>카테고리</p>
            </div>
            <div className="Card-Project-text">
              <p className="Card-Project-title">프로젝트 이름</p>
              <p className="Card-Project-description">한줄 소개를 입력해 주세요.</p>
            </div>
          </div>
          <div className="Card-Project-looklike">
            <div className="Card-Project-look">
              <img src={Look} alt="조회수" />
              <p>n,nnn</p>
            </div>
            <div className="Card-Project-like">
              <img src={Like} alt="좋아요수" />
              <p>n,nnn</p>
            </div>
          </div>
        </div>
        <div className="Card-Project-hover">
          <div className="to-project-btn">
            <p>👀</p>
            <img src={Arrow} alt="탐색 버튼" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_Project;
