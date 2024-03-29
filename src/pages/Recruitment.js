import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import SwiperCore from "swiper";
import CardRecruitment from "../components/Card_Recruitment";
import Card_Burn_Recruitment from "../components/Card_Burn_Recruitment";
import "../styles/Recruitment.css";

const API_BASE_URL = 'https://likelion-running.store/api'

function SearchRecruitment() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [popularJobs, setPopularJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function formatDateTimeForServer(date) {
    const pad = (num) => num.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); 
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); 
      setError('');
    
      const now = formatDateTimeForServer(new Date());
    
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs`, {
          params: {
            now: now,
          }
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError('채용 정보를 불러오는 데 실패했습니다.');
      }

      try {
        const popularResponse = await axios.get(`${API_BASE_URL}/jobs/popular`);
        console.log("Received popular jobs data:", popularResponse.data);
        setPopularJobs(popularResponse.data);
      } catch (error) {
        console.error("Failed to fetch popular jobs:", error);
        setError('인기 채용 정보를 불러오는 데 실패했습니다.');
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

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
  
  
  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Banner">
          <p className="Banner-sub">사람인이 제공하는 최신 공고로 새로운 기회 탐색!</p>
          <p className="Banner-title">채용 공고</p>
        </div>
        <div className="Burning">
          <div className="Burning-content">
            <div className="Burning-text">
              <p className="Burning-title">실시간 인기 채용 공고🔥</p>
              <p className="Burning-sub">지금 뜨고 있는 채용 공고를 구경해 보세요!</p>
            </div>
            <div className="Burning-card-list">
              <div className="Burning-list">
                {popularJobs.map((job) => (
                  <Card_Burn_Recruitment
                  key={job.id}
                  job={job}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="Project-list">
          <div className="Project-content">
            <div className="Project-bar">
              <div className="Project-title">
                <p>채용 공고 탐색하기👀</p>
              </div>
            </div>
            <div className="Project-cards">
            <div className="Project-cards-list">
            {jobs.map((job) => (
  <CardRecruitment
   key={job.id}
      job={job}
  />
))}
</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchRecruitment;
