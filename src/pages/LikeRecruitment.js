import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Recruitment from "../components/Card_Recruitment";

import "../styles/LikeRecruitment.css";

function LikeRecruitment() {
  const navigate = useNavigate();

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
          <p div className="Like-Title">
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
            <div className="Like-list-cards">{recruitCards}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LikeRecruitment;
