import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Project from "../components/Card_Project";

import "../styles/LikeProject.css";

const API_BASE_URL = "https://likelion-running.store/api";

function LikeProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    axios
      .get(`${API_BASE_URL}/check/like/my`, {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const handleProjectLike = () => {
    navigate("/like/project");
  };

  const handleRecruitLike = () => {
    navigate("/like/recruitment");
  };

  const handleToProjectLink = (bno) => {
    navigate(`/project/read/${bno}`);
  };

  const projectCards = projects.map((project) => <Card_Project key={project.bno} projectName={project.projectName} description={project.projectDescription} category={project.category} boardLike={project.boardLike} imageUrl={project.projectImage} onClick={() => handleToProjectLink(project.bno)} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Like-content">
          <p div className="Like-Title">
            내 좋아요
          </p>
          <div className="Like-bar">
            <p className="Like-bar-project-1" onClick={handleProjectLike}>
              프로젝트
            </p>
            <p className="Like-bar-recruit-1" onClick={handleRecruitLike}>
              채용 공고
            </p>
          </div>
          <div className="Like-list">
            <div className="Like-list-cards">{projectCards}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LikeProject;
