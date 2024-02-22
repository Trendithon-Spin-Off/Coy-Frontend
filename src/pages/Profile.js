import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Profile_Project from "../components/Card_Profile_Project";

import Default from "../img/NonProfile.png";

import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate("/chat");
  };

  const projectProfileCards = Array.from({ length: 10 }, (_, index) => <Card_Profile_Project key={index} />);

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Profile-content">
          <div className="Profile-profile">
            <div className="Profile-profile-content">
              <div className="Profile-profile-space">
                <div className="Profile-profile-img">
                  <img src={Default} alt="프로필 이미지" />
                </div>
              </div>
              <div className="Profile-profile-space">
                <p div className="Profile-profile-name">
                  이름
                </p>
              </div>
              <div className="Profile-profile-space">
                <p div className="Profile-profile-description">
                  한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개
                </p>
              </div>
              <div className="Profile-profile-job">
                <p div className="Profile-profile-title">
                  (희망) 직무
                </p>
                <div className="Profile-profile-text-list">
                  <p div className="Profile-profile-text">
                    프론트엔드
                  </p>
                  <p div className="Profile-profile-text">
                    웹퍼블리셔
                  </p>
                </div>
              </div>
              <div className="Profile-profile-stack">
                <p div className="Profile-profile-title">
                  사용 가능한 스택
                </p>
                <div className="Profile-profile-text-list-box">
                  <div className="Profile-profile-text-list">
                    <p div className="Profile-profile-text">
                      JavaScript
                    </p>
                    <p div className="Profile-profile-text">
                      CSS
                    </p>
                    <p div className="Profile-profile-text">
                      HTML
                    </p>
                  </div>
                </div>
              </div>
              <div className="Profile-profile-link">
                <p div className="Profile-profile-title">
                  Link
                </p>
                <Link to="#">
                  <p div className="Profile-profile-text">
                    https://
                  </p>
                </Link>
              </div>
              <div className="Profile-profile-space">
                <div className="Profile-profile-chat-btn" onClick={handleChat}>
                  <p>1:1 채팅</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Profile-projects">
            <p div className="Profile-projects-title">
              👩🏻‍💻프로젝트
            </p>
            <div className="Profile-project-list">
              <div className="Profile-project-list-cards">{projectProfileCards}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
