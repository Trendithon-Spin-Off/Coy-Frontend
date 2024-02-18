import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Burn_Project from "../components/Card_Burn_Project";
import Card_Project from "../components/Card_Project";
import DropdownMenu from "../components/DropdownMenu/DropdownMenu/DropdownMenu";

import "../styles/Project.css";

import Add from "../img/plus.png";

function Project() {
  const navigate = useNavigate();

  const handleToPostLink = () => {
    navigate("/project/post");
  };

  const projectCards = Array.from({ length: 10 }, (_, index) => <Card_Project key={index} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Banner">
          <p className="Banner-sub">가치도 증명하고 아이디어도 탐색할 시간!</p>
          <p className="Banner-title">프로젝트</p>
        </div>
        <div className="Burning">
          <div className="Burning-content">
            <div className="Burning-text">
              <p className="Burning-title">실시간 인기 프로젝트🔥</p>
              <p className="Burning-sub">지금 뜨고 있는 프로젝트를 구경해 보세요!</p>
            </div>
            <div className="Burning-card-list">
              <div className="Burning-list">
                <Card_Burn_Project />
                <Card_Burn_Project />
                <Card_Burn_Project />
                <Card_Burn_Project />
              </div>
            </div>
          </div>
        </div>
        <div className="Project-list">
          <div className="Project-content">
            <div className="Project-bar">
              <div className="Project-title">
                <p>프로젝트 탐색하기👀</p>
              </div>
              <div className="Project-btn" onClick={handleToPostLink} style={{ cursor: "pointer" }}>
                <img src={Add} alt="프로젝트 등록 버튼" />
                <p> 프로젝트 등록하기</p>
              </div>
            </div>
            <div className="Project-category">
              <DropdownMenu />
            </div>
            <div className="Project-cards">
              <div className="Project-cards-list">{projectCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Project;
