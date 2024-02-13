import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Card_Recruitment.css';

import Look from "../img/see.png";
import love from "../img/love.png";
import Arrow from "../img/arrow.png";
import Vector from "../img/Vector.png";
import ProfileIcon from "../img/profile-icon.png"; 

function CardRecruitment() { 
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate("/project/link");
  };

  return (
    <div className="Card_Recruitment" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card_Recruitment-content">
        <div className="Card_Recruitment-looklike">
          <div className="Card_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>n,nnn</p>
          </div>
          <div className="Card_Recruitment-like">
            <img src={Vector} alt="좋아요수" />
            <p>n,nnn</p>
            <p>ㅤㅤㅤㅤㅤㅤㅤㅤㅤD-nn</p>
          </div>
        </div>
        <div className="Card_Recruitment-company">
          <img src={ProfileIcon} alt="회사 프로필" className="company-profile-icon" />
          <p className="company-name">기업명</p>
        </div>
        <div className="Card_Recruitment-common">
          <div className="Card_Recruitment-content-texts">
            <div className="Card_Recruitment-text">
              <p className="Card_Recruitment-title">채용 공고명</p>
              <p className="Card_Recruitment-description">경력ㅤㅤㅤㅤㅤㅤㅤ근무형태</p>
            </div>
            
            
            <div className="Card_Recruitment-action">
  <img src={love} alt="좋아요" className="like-icon" />
  <p className="apply">채용 공고 보러가기</p>
</div>
          </div>
        </div>
        <div className="Card_Recruitment-hover">
          <div className="to-project-btn">
            <p>👀</p>
            <img src={Arrow} alt="탐색 버튼" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRecruitment;
