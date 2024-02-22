import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card_Burn_Recruitment.css";

import Look from "../img/see.png";
import Vector from "../img/Vector.png";
import whitelove from "../img/whitelove.png";

function Card_Burn_Recruitment({ job }) {
  const navigate = useNavigate();

  const handleToProjectLink = () => {
    navigate(`/job/${job.id}`); 
  };

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeDiff = deadlineDate - now;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft >= 0 ? `d-${daysLeft}` : "기간 만료";
  };

  return (
    <div className="Card_Burn_Recruitment" onClick={handleToProjectLink} style={{ cursor: "pointer" }}>
      <div className="Card_Burn_Recruitment-content">
        <div className="Card_Burn_Recruitment-looklike">
          <img src={whitelove} alt="좋아요" className="like-icon" />
          <div className="Card_Burn_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>{job.viewCount.toLocaleString()}</p>
          </div>
          <div className="Card_Burn_Recruitment-like">
            <img src={Vector} alt="좋아요수" />
            <p>{job.likeCount.toLocaleString()}</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-info">
          <div className="Card_Burn_Recruitment-company">
            <p className="Card_Burn_Recruitment-company-name">{job.companyName}</p>
            <p className="Card_Burn_Recruitment-title">{job.jobTitle}</p>
          </div>
          <div className="Card_Burn_Recruitment-details">
            <p className="Card_Burn_Recruitment-detail">D-{formatDeadline(job.deadLine)}</p>
            <p className="Card_Burn_Recruitment-detail">{job.level}</p>
            <p className="Card_Burn_Recruitment-detail">{job.type}</p>
          </div>
        </div>
        <div className="Card_Burn_Recruitment-action">
          <button className="apply-text">채용 공고 보러가기</button>
        </div>
      </div>
    </div>
  );
}

export default Card_Burn_Recruitment;
