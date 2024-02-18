import Header from "../components/Header";
import "../styles/Read.css";
import { IoLogoGithub } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
//리액트 부트스트랩
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Read() {
  return (
    <div className="page">
      <Header />
      <div className="content">
        <Container>
          <Row className="justify-content-md-center">
            <Col style={{ width: "50%" }}>
              <div className="project-explanation-label">
                <label> 💡 프로젝트 이름</label>
                <div className="project-explanation-content">
                  어쩌고저쩌꼬~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                </div>
              </div>
              <div className="project-explanation-label">
                <label>✍🏻 프로젝트 한줄 소개</label>
                <div className="project-explanation-content">
                  어쩌고저쩌꼬~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                </div>
              </div>
              <div className="project-explanation-label">
                {" "}
                <label>🧾 프로젝트 제작 배경</label>
                <div className="project-explanation-content">
                  어쩌고저쩌꼬~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                </div>
              </div>
              <div className="project-explanation-label">
                <label>🦾 프로젝트 주요 기능과 특징</label>
                <div className="project-explanation-content">
                  어쩌고저쩌꼬~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                </div>
              </div>
            </Col>
            <Col md="auto"></Col>
            <Col style={{ width: "50%" }}>
              <div className="project-main-img">{/*이미지 */}</div>
            </Col>
          </Row>
        </Container>
        <div className="project-link-container">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <div className="project-url-label">
                  <label>🔗 프로젝트 배포 URL</label>
                  <button className="project-link-button">바로가기</button>
                </div>
              </Col>
              <Col>
                <div className="project-url-label">
                  <label>
                    <IoLogoGithub />
                    프로젝트 Github
                  </label>

                  <button className="project-link-button">바로가기</button>
                </div>
              </Col>
              <Col>
                <div className="project-explanation-label">
                  <label>👥 함께한 팀원</label>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="project-like-container">
          <button className="project-read-like">
            <CiHeart className="project-like" /> 프로젝트 좋아요
          </button>
        </div>
      </div>
    </div>
  );
}

export default Read;
