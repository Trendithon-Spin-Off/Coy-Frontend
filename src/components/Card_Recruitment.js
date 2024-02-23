import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Card_Recruitment.css';

import Look from "../img/see.png";
import Love from "../img/love.png"; 
import FillLove from "../img/filllove.png";
import Vector from "../img/Vector.png";

function CardRecruitment({ job }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(job.viewCount);

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
    <div className="Card_Recruitment" onClick={increaseViewCountAndNavigate} style={{ cursor: "pointer" }}>
      <div className="Card_Recruitment-content">
        <div className="Card_Recruitment-looklike">
          <div className="Card_Recruitment-look">
            <img src={Look} alt="조회수" />
            <p>{viewCount !== undefined ? viewCount.toLocaleString() : '0'}</p>
          </div>
          <div className="Card_Recruitment-like">
            <img src={Vector} alt="지원자 수" />
            <p>{job.applicantsCount !== undefined ? job.applicantsCount.toLocaleString() : '0'}</p>
            <div className="deadline">{job.remainingDays}</div>
          </div>
        </div>
        <div className="Card_Recruitment-company">
          <img src={job.logoUrl} alt="회사 로고" className="company-profile-icon" />
          <p className="company-name">{job.companyName}</p>
        </div>
        <div className="Card_Recruitment-common">
          <div className="Card_Recruitment-content-texts">
            <div className="Card_Recruitment-text">
              <p className="Card_Recruitment-title">{job.jobTitle}</p>
              <p className="CardRecruitment-description" style={{ color: 'gray', fontSize: '80%', whiteSpace: 'nowrap', marginTop: '10px' }}>
                경력: {job.level} | 근무형태: {job.type}
              </p>
            </div>
            <div className="Card_Recruitment-action">
              <img src={liked ? FillLove : Love} alt="좋아요" className="like-icon" onClick={toggleLike} />
              <button className="apply">채용 공고 보러가기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRecruitment;
