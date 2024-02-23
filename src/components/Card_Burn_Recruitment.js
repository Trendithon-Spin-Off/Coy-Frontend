import React, { useState, useEffect } from "react";
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

  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    if (memberId) {
      const likedJobs = JSON.parse(localStorage.getItem(`likedJobs_${memberId}`)) || {};
      const jobLiked = likedJobs[job.id] || false;
      setLiked(jobLiked);
    }
  }, [job.id]);

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

  const handleToProjectLink = () => {
    navigate(`/job/${job.id}`);
  };

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft >= 0 ? `D-${daysLeft}` : "기간 만료";
  };

  const toggleLike = async () => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) return;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      data: {
        memberId: memberId,
        jobPostingId: job.id,
      }
    };

    try {
      let response;
      if (!liked) {
        response = await axios.put(`${API_BASE_URL}/job/like`, config.data, { headers: config.headers });
      } else {
        response = await axios.delete(`${API_BASE_URL}/job/unlike`, config);
      }

      if (response.data.success) {
        const newLikedState = !liked;
        setLiked(newLikedState);

        const likedJobs = JSON.parse(localStorage.getItem(`likedJobs_${memberId}`)) || {};
        likedJobs[job.id] = newLikedState;
        localStorage.setItem(`likedJobs_${memberId}`, JSON.stringify(likedJobs));
      } else {
        console.error("좋아요 처리 실패:", response.data.message);
      }
    } catch (error) {
      console.error("좋아요 처리 중 에러 발생:", error.response ? error.response.data : error);
    }
  };
  const handleLogout = () => {
    const memberId = localStorage.getItem('memberId');
  
    if (memberId) {
      localStorage.removeItem(`likedJobs_${memberId}`);
    }
  
    localStorage.removeItem('memberId');
    localStorage.removeItem('token');
  
    navigate('/'); 

    window.location.reload();
  };

  if (!job || job.viewCount === undefined || job.likeCount === undefined) {
    return <div>Loading...</div>;
  }


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
