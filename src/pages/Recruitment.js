import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Burn_Project from "../components/Card_Burn_Project";
import Card_Project from "../components/Card_Project";

import "../styles/Recruitment.css";

function Recruitment() {
  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Banner">
          <p className="Banner-sub">서브 타이틀 멘트 생각 좀 해볼게요...</p>
          <p className="Banner-title">채용 공고</p>
        </div>
        <div className="Burning">
          <div className="Burning-content">
            <div className="Burning-text">
              <p className="Burning-title">실시간 인기 채용 공고🔥</p>
              <p className="Burning-sub">지금 뜨고 있는 채용 공고를 구경해 보세요!</p>
            </div>
            <div className="Burning-card-list">
              <div className="Burning-list">해당 컴포넌트 삽입해주세요 !</div>
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
              <div className="Project-cards-list">해당 컴포넌트 삽입해주세요 !</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recruitment;
