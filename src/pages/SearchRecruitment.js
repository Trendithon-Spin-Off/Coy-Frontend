import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardRecruitment from "../components/Card_Recruitment"; 
import "../styles/SearchRecruitment.css";

const API_BASE_URL = 'https://likelion-running.store/api'


function SearchRecruitment() {
  const { searchData } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const now = formatDateTimeForServer(new Date());

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
    const trimmedSearchData = searchData.trim();
    if (!trimmedSearchData) return; 
    
    setLoading(true); 
    setError('');

    const now = formatDateTimeForServer(new Date());

    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/search`, {
        params: {
          now: now, 
          companyName: trimmedSearchData,
          jobTitle: trimmedSearchData,
        }
      });
      console.log("Received response data:", response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setError('채용 정보를 불러오는 데 실패했습니다.');
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setLoading(false); 
    }
  };

  fetchJobs();
}, [searchData]);

  const handleProjectSearch = () => {
    navigate(`/search/project/${searchData.trim()}`);
  };

  const handleRecruitSearch = () => {
    navigate(`/search/recruitment/${searchData.trim()}`);
  };

  const recruitCards = Array.from({ length: 10 }, (_, index) => <Card_Recruitment key={index} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Search-text">
          <p className="Search-title">
            🔎 '{searchData}'에 대한 검색 결과
          </p>
          {loading ? (
            <p className="Search-sub">데이터를 불러오는 중...</p>
          ) : error ? (
            <p className="Search-sub">{error}</p>
          ) : (
            <p className="Search-sub">
              {jobs.length}개의 검색결과를 발견했어요.
            </p>
          )}
        </div>
        <div className="Search-content">
          <div className="Search-bar">
            <p className="Search-bar-project-2" onClick={handleProjectSearch}>
              프로젝트
            </p>
            <p className="Search-bar-recruit-2" onClick={handleRecruitSearch}>
              채용 공고
            </p>
          </div>
          <div className="Search-list">
          <div className="Search-list">
  <div className="Search-list-cards">
    {jobs.map((job) => (
      <CardRecruitment
        key={job.id}
        logoUrl={job.logoUrl}
        companyName={job.companyName}
        viewCount={job.viewCount}
        applicantsCount={job.applicantsCount}
        jobTitle={job.jobTitle}
        type={job.type}
        deadLine={job.deadLine}
        level={job.level}
        likeCount={job.likeCount}
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
