import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Landing.css";

import LandingImg from "../img/Landing.jpg";
import arrow from "../img/arrow2.png";

function Landing() {
  const navigate = useNavigate();

  const handleProjectLink = () => {
    navigate("/project");
  };

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Landing-img">
          <img src={LandingImg} alt="랜딩 페이지" />
        </div>
        <div className="Landing-btn-space">
          <div className="Landing-btn" onClick={handleProjectLink}>
            <p>더 탐색하러 가기</p>
            <div className="Landing-btn-img">
              <img src={arrow} alt="화살표" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
