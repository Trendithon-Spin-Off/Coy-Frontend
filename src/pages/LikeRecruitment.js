import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Recruitment from "../components/Card_Recruitment";

import "../styles/LikeRecruitment.css";

const API_BASE_URL = 'https://likelion-running.store/api';

function LikeRecruitment() {
  const navigate = useNavigate();
  const [likedJobs, setLikedJobs] = useState([]);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const token = localStorage.getItem('token'); 

        if (!memberId || memberId === "anonymousUser" || !token) {
          console.error("Invalid memberId or token found");
          navigate("/login");
          return;
        }
  
        const response = await axios.get(`${API_BASE_URL}/jobs/like`, {
          headers: {
            'Member-ID': memberId,
            'Authorization': `Bearer ${token}`
          }
        });
        setLikedJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch liked jobs:", error);
      }
    };
  
    fetchLikedJobs();
  }, [navigate]);
  
  const handleProjectLike = () => {
    navigate("/like/project");
  };

  const handleRecruitLike = () => {
    navigate("/like/recruitment");
  };


  const recruitCards = Array.from({ length: 10 }, (_, index) => <Card_Recruitment key={index} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Like-content">
          <p className="Like-Title"> 
            내 좋아요
          </p>
          <div className="Like-bar">
            <p className="Like-bar-project-2" onClick={handleProjectLike}>
              프로젝트
            </p>
            <p className="Like-bar-recruit-2" onClick={handleRecruitLike}>
              채용 공고
            </p>
          </div>
          <div className="Like-list">
            <div className="Like-list-cards">
              {likedJobs.map((job) => (
                <Card_Recruitment
                key={job.id}
                job={job}
                  />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

export default LikeRecruitment;
