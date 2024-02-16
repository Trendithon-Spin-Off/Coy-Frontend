import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Burn_Recruitment.css";

import Look from "../img/see.png";
import Vector from "../img/Vector.png";
import whitelove from "../img/whitelove.png";

function Card_Burn_Recruitment() {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/link");
  };

  return (
    <div className="Card_Burn_Recruitment" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card_Burn_Recruitment-content">
        <div className="Card_Burn_Recruitment-looklike">
          <img src={whitelove} alt="좋아요" className="like-icon" />
          <div className="Card_Burn_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>n,nnn</p>
          </div>
          <div className="Card_Burn_Recruitment-like">
            <img src={Vector} alt="좋아요수" />
            <p>n,nnn</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-info">
          <div className="Card_Burn_Recruitment-company">
            <p className="Card_Burn_Recruitment-company-name">기업명</p> 
            <p className="Card_Burn_Recruitment-title">채용 공고명</p> 
          </div>
          <div className="Card_Burn_Recruitment-details"> 
            <p className="Card_Burn_Recruitment-detail">D-nn</p>
            <p className="Card_Burn_Recruitment-detail">경력</p>
            <p className="Card_Burn_Recruitment-detail">근무형태</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-action">
        <button className="apply-text">채용 공고 보러가기</button>
        </div>

        <div className="Card_Burn_Recruitment-hover">
        </div>
      </div>
    </div>
  );
}

export default Card_Burn_Recruitment;