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
import Like from "../img/like.png";
const Read = () => {
  const [likes, setLikes] = useState(0);
  const [memberId, setmemberId] = useState("");
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
        setLikes(response.data.boardLike);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [bno]);

  const handleLike = () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    const storedMemberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기

    // requestData 객체 생성
    const requestData = {
      memberId: storedMemberId, // 회원 ID 추가
      bno, // 프로젝트 번호
    };
    console.log(requestData);
    axios
      .put(`${API_BASE_URL}/board/like`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("좋아요 +1");

        // 서버에서 좋아요 수를 업데이트한 후에 클라이언트에서 상태를 업데이트
        setLikes((prevLikes) => prevLikes + 1);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          // 이미 좋아요를 누른 경우
          console.log("이미 좋아요를 누른 상태입니다.");
        } else {
          console.error("Error submitting like:", error);
        }
      });
  };

  const handleToProfileLink = (memberId) => {
    navigate(`/profile/${memberId}`);
  };

  // 로딩 중일 때 보여줄 컴포넌트
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page">
      <Header />
      <div className="content">
        <Container className="proj-explanation">
          <Row style={{ cursor: "pointer" }} className="justify-content-md-center">
            <Col style={{ width: "50%" }}>
              <div className="category-part">
                <p>{project.category || "미선택"}</p>
              </div>
              <div className="project-explanation-label">
                <label> 💡 프로젝트 이름</label>
                <div className="project-explanation-content">{project.projectName || "미작성"}</div>
              </div>
              <div className="project-explanation-label">
                <label>✍🏻 프로젝트 한줄 소개</label>
                <div className="project-explanation-content">{project.projectDescription || "미작성"}</div>
              </div>
              <div className="project-explanation-label">
                <label>🧾 프로젝트 제작 배경</label>
                <div className="project-explanation-content">{project.projectBackground || "미작성"}</div>
              </div>
              <div className="project-explanation-label">
                <label>🦾 프로젝트 주요 기능과 특징</label>
                <div className="project-explanation-content">{project.projectFeatures || "미작성"}</div>
              </div>
            </Col>
            <Col style={{ width: "50%" }}>
              <div className="like-img">
                <img src={Like} alt="좋아요 수" />
              </div>
              <span>{likes}</span>
              <div className="project-main-img">
                <img src={project.projectImage} alt="Project" />
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
                  <button onClick={() => window.open(project.distribution)} className="project-link-button">
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
                  <button onClick={() => window.open(project.github)} className="project-link-button">
                    바로가기
                  </button>
                </div>
              </Col>
              <Col md={4}>
                <div className="project-url-label">
                  <label>👥 함께한 팀원</label>
                  {project.member1 && (
                    <div className="member-id" style={{ cursor: "pointer" }} onClick={() => handleToProfileLink(project.member1)}>
                      <span>{project.member1}</span>
                    </div>
                  )}
                  {project.member2 && (
                    <div className="member-id" style={{ marginTop: "5px", cursor: "pointer" }} onClick={() => handleToProfileLink(project.member2)}>
                      <span>{project.member2}</span>
                    </div>
                  )}
                  {project.member3 && (
                    <div className="member-id" style={{ marginTop: "5px", cursor: "pointer" }} onClick={() => handleToProfileLink(project.member3)}>
                      <span>{project.member3}</span>
                    </div>
                  )}
                  {project.member4 && (
                    <div className="member-id" style={{ marginTop: "5px", cursor: "pointer" }} onClick={() => handleToProfileLink(project.member4)}>
                      <span>{project.member4}</span>
                    </div>
                  )}
                  {project.member5 && (
                    <div className="member-id" style={{ marginTop: "5px", cursor: "pointer" }} onClick={() => handleToProfileLink(project.member5)}>
                      <span>{project.member5}</span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="project-like-container">
        <button className="project-read-like" onClick={handleLike}>
          <CiHeart className="project-like" /> 프로젝트 좋아요
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Read;
