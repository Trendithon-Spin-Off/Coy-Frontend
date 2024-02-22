import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/Card_Burn_Recruitment.css";

import Look from "../img/see.png";
import Vector from "../img/Vector.png";
import whitelove from "../img/whitelove.png";
import whitefilllove from "../img/whitefilllove.png";


function Card_Burn_Recruitment({ job }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(job.viewCount);

  if (!job || job.viewCount === undefined || job.likeCount === undefined) {
    return <div>Loading...</div>;
  }

  const handleToProjectLink = () => {
    navigate(`/job/${job.id}`);
  };

  const API_BASE_URL = 'https://likelion-running.store/api';

  const increaseViewCountAndNavigate = () => {
    if (job.id) {
      axios.post(`${API_BASE_URL}/view/increase/${job.id}`)
        .then(response => {
          if (response.data === true) {
            setViewCount(prevCount => prevCount + 1);
            navigate(`/recruitment/${job.id}`);
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

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft >= 0 ? `D-${daysLeft}` : "기간 만료";
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="Card_Burn_Recruitment" style={{ cursor: "pointer" }} onClick={increaseViewCountAndNavigate}>
      <div className="Card_Burn_Recruitment-content">
        <div className="Card_Burn_Recruitment-looklike">
          <img src={liked ? whitefilllove : whitelove} alt="좋아요" className="like-icon" onClick={(e) => {e.stopPropagation(); toggleLike();}} />
          <div className="Card_Burn_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>{viewCount.toLocaleString()}</p>
          </div>
          <div className="Card_Burn_Recruitment-like">
            <img src={Vector} alt="지원자수" />
            <p>{job.likeCount.toLocaleString()}</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-info">
          <div className="Card_Burn_Recruitment-company">
            <p className="Card_Burn_Recruitment-company-name">{job.companyName}</p>
            <p className="Card_Burn_Recruitment-title">{job.jobTitle}</p>
          </div>
          <div className="Card_Burn_Recruitment-details">
            <p className="Card_Burn_Recruitment-detail">{formatDeadline(job.deadLine)}</p>
            <p className="Card_Burn_Recruitment-detail">{job.level}</p>
            <p className="Card_Burn_Recruitment-detail">{job.type}</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-action">
          <button className="apply-text" onClick={handleToProjectLink}>채용 공고 보러가기</button>
        </div>
      </div>
    </div>
  );
}

export default Card_Burn_Recruitment;
