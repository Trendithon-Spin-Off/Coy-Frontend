import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Recruitment from "../components/Card_Recruitment";
import Card_Burn_Recruitment from "../components/Card_Burn_Recruitment";
import "../styles/Recruitment.css";

function Recruitment() {
  const recruitCards = Array.from({ length: 10 }, (_, index) => <Card_Recruitment key={index} />);

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
                <Card_Burn_Recruitment />
                <Card_Burn_Recruitment />
                <Card_Burn_Recruitment />
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
              <div className="Project-cards-list">{recruitCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recruitment;
