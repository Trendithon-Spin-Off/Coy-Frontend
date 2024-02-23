import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/Read.css";
import { IoLogoGithub } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const Read = () => {
  const [project, setProject] = useState(null); // 단일 게시글을 저장할 상태
  const navigate = useNavigate();
  const { bno } = useParams();
  const API_BASE_URL = "https://likelion-running.store/api";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/project/${bno}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false); // 로딩 상태 변경
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [bno]);

  // 로딩 중일 때 보여줄 컴포넌트
  if (loading) {
    return <p>Loading...</p>;
  }
  //좋아요
  const handleLike = () => {
    axios
      .post(`${API_BASE_URL}/api/board/like/${bno}`)
      .then((response) => {
        // 좋아요가 성공적으로 처리되었을 때 클라이언트에서 할 일
        console.log("Like submitted successfully!");
        // 이후 필요한 작업 수행
      })
      .catch((error) => {
        console.error("Error submitting like:", error);
      });
  };

  //...

  <button className="project-read-like" onClick={handleLike}>
    <CiHeart className="project-like" /> 프로젝트 좋아요
  </button>;
  return (
    <div className="page">
      <Header />
      <div className="content">
        <Container className="proj-explanation">
          <Row
            style={{ cursor: "pointer" }}
            className="justify-content-md-center"
          >
            <Col style={{ width: "50%" }}>
              <div className="category-part">
                <p>{project.category}</p>
              </div>
              <div className="project-explanation-label">
                <label> 💡 프로젝트 이름</label>
                <div className="project-explanation-content">
                  {project.projectName}
                </div>
              </div>
              <div className="project-explanation-label">
                <label>✍🏻 프로젝트 한줄 소개</label>
                <div className="project-explanation-content">
                  {project.description}
                </div>
              </div>
              <div className="project-explanation-label">
                <label>🧾 프로젝트 제작 배경</label>
                <div className="project-explanation-content">
                  {project.projBackground}
                </div>
              </div>
              <div className="project-explanation-label">
                <label>🦾 프로젝트 주요 기능과 특징</label>
                <div className="project-explanation-content">
                  {project.mainFeature}
                </div>
              </div>
            </Col>
            <Col style={{ width: "50%" }}>
              <p>Likes: {project.boardLike}</p>
              <div className="project-main-img">
                <img src={project.imageUrl} alt="Project" />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="project-lower-container">
          <Container>
            <Row className="justify-content-md-center">
              <Col md={4}>
                <div className="project-url-label">
                  <label>🔗 프로젝트 배포 URL</label>
                  <button
                    onClick={() => window.open(project.projUrl)}
                    className="project-link-button"
                  >
                    바로가기
                  </button>
                </div>
              </Col>
              <Col md={4}>
                <div className="project-url-label">
                  <label>
                    <IoLogoGithub />
                    프로젝트 Github
                  </label>
                  <button
                    onClick={() => window.open(project.githubUrl)}
                    className="project-link-button"
                  >
                    바로가기
                  </button>
                </div>
              </Col>
              <Col md={4}>
                <div className="project-url-label">
                  <label>👥 함께한 팀원</label>
                  <div className="member-id">
                    <span>{project.member1}</span> {/* 팀원 이름 표시 */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="project-like-container">
        <button className="project-read-like">
          <CiHeart className="project-like" /> 프로젝트 좋아요
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Read;
