import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Project from "../components/Card_Project";

import "../styles/LikeProject.css";

function LikeProject() {
  const navigate = useNavigate();

  const handleProjectLike = () => {
    navigate("/like/project");
  };

  const handleRecruitLike = () => {
    navigate("/like/recruitment");
  };

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
            <div className="Like-list-cards">
              <Card_Project />
              <Card_Project />
              <Card_Project />
              <Card_Project />
              <Card_Project />
              <Card_Project />
              <Card_Project />
              <Card_Project />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LikeProject;
