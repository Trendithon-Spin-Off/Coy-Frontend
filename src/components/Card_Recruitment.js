import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Card_Recruitment.css';

import Look from "../img/see.png";
import Love from "../img/love.png"; 
import FillLove from "../img/filllove.png";
import Vector from "../img/Vector.png";

const calculateRemainingDays = (deadLine) => {
  const deadlineDate = new Date(deadLine);
  const now = new Date();
  const timeDiff = deadlineDate - now;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft >= 0 ? `d-${daysLeft}` : "기간 만료";
};

function CardRecruitment({ 
  viewCount,
  id, 
  logoUrl,
  companyName,
  applicantsCount = 0,
  jobTitle,
  type,
  deadLine,
  level,
  likeCount = 0,
}) {
  console.log('CardRecruitment id:', id);
  const navigate = useNavigate();
  const [currentLikeCount, setLikeCount] = useState(likeCount);
  const [liked, setLiked] = useState(false);
  const [localViewCount, setLocalViewCount] = useState(viewCount);

  const toggleLike = (e) => {
    e.stopPropagation();
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
  };

  const API_BASE_URL = 'https://likelion-running.store/api'

  const increaseViewCountAndNavigate = () => {
    if (id) {
      axios.post(`${API_BASE_URL}/view/increase/${id}`)
        .then(response => {
          if (response.data === true) {
            setLocalViewCount(prevCount => prevCount + 1);
            navigate(`/recruitment/${id}`);
          } else {
            console.error("조회수 증가 요청 실패");
          }
        })
        .catch(error => {
          console.error("조회수 증가 요청 실패:", error);
        });
    } else {
      console.error("id 값이 유효하지 않습니다.");
    }
  };

  const remainingDays = calculateRemainingDays(deadLine);
  
  return (
    <div className="Card_Recruitment" style={{ cursor: "pointer" }}>
      <div className="Card_Recruitment-content">
        <div className="Card_Recruitment-looklike">
          <div className="Card_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>{viewCount !== undefined ? viewCount.toLocaleString() : '0'}</p>
          </div>
          <div className="Card_Recruitment-like">
            <img src={Vector} alt="지원자 수" />
            <p>{applicantsCount !== undefined ? applicantsCount.toLocaleString() : '0'}</p>
            <div className="deadline" >ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ{remainingDays}</div>
          </div>
        </div>
        <div className="Card_Recruitment-company">
          <img src={logoUrl} alt="회사 로고" className="company-profile-icon" />
          <p className="company-name">{companyName}</p>
        </div>
        <div className="Card_Recruitment-common">
          <div className="Card_Recruitment-content-texts">
            <div className="Card_Recruitment-text">
              <p className="Card_Recruitment-title">{jobTitle}</p>
              <p className="CardRecruitment-description" style={{ color: 'gray', fontSize: '80%', whiteSpace: 'nowrap', marginTop:'10px' }}>
                경력: {level} | 근무형태: {type}
              </p>
            </div>
            <div className="Card_Recruitment-action">
              <img src={liked ? FillLove : Love} alt="좋아요" className="like-icon" onClick={toggleLike} />
              <button className="apply" onClick={increaseViewCountAndNavigate}>채용 공고 보러가기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRecruitment;
