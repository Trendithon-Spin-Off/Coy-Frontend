import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Burn_Project.css";

import Look from "../img/see.png";
import Like from "../img/like.png";
import Arrow from "../img/arrow.png";
import Default from "../img/NonProject.png";

function Card_Project() {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/read");
  };

  return (
    <div className="Card-Burn-Project" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card-Burn-img">
        <img src={Default} alt="프로젝트 이미지" />
      </div>
      <div className="Card-Burn-Project-common">
        <div className="Card-Burn-Project-looklike">
          <div className="Card-Project-look">
            <img src={Look} alt="조회수" />
            <p>n,nnn</p>
          </div>
          <div className="Card-Project-like">
            <img src={Like} alt="좋아요수" />
            <p>n,nnn</p>
          </div>
        </div>

        <div className="Card-Project-content-texts">
          <div className="Card-Burn-Project-category">
            <p>카테고리</p>
          </div>
          <div className="Card-Burn-Project-text">
            <p className="Card-Burn-Project-title">프로젝트 이름</p>
            <p className="Card-Burn-Project-description">한줄 소개를 입력해 주세요.</p>
          </div>
        </div>
      </div>
      <div className="Card-Burn-Project-hover">
        <div className="to-Burn-project-btn">
          <p>🔥</p>
          <img src={Arrow} alt="인기 프로젝트 탐색 버튼" />
        </div>
      </div>
    </div>
  );
}

export default Card_Project;
