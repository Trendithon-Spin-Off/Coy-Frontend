import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Profile_Project from "../components/Card_Profile_Project";

import Default from "../img/NonProfile.png";

import "../styles/Profile.css";

const API_BASE_URL = "https://likelion-running.store/api";

function Profile() {
  const { memberId } = useParams();
  const [name, setUserName] = useState("");
  const [job, setJob] = useState("");
  const [specificDuty, setSpecificDuty] = useState("");
  const [technics, setTechnics] = useState([]);
  const [introduce, setIntroduce] = useState("");
  const [link, setLink] = useState("");
  const [projects, setProjects] = useState([]);
  // const [memberId, setMemberId] = useState("");
  const [imageUrl, setProfileImage] = useState("");

  const navigate = useNavigate();

  const handleChat = () => {
    navigate("/chat");
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/information/check/${memberId}`)
      .then((response) => {
        const userData = response.data;
        setUserName(userData.name);
        setIntroduce(userData.introduce);
        setJob(userData.job);
        setSpecificDuty(userData.specificDuty);
        setTechnics(userData.technics);
        setLink(userData.link);
        setProfileImage(userData.imageUrl);
        setProjects(userData.boards);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [memberId]);

  const projectProfileCards = projects.map((project) => <Card_Profile_Project key={project.bno} projectName={project.projectName} description={project.projectDescription} category={project.category} boardLike={project.boardLike} imageUrl={project.projectImage} onClick={() => handleToProjectLink(project.bno)} />);

  const handleToProjectLink = (bno) => {
    navigate(`/project/read/${bno}`);
  };

  return (
    <div className="page">
      <Header />
      <div className="content">
        <div className="Profile-content">
          <div className="Profile-profile">
            <div className="Profile-profile-content">
              <div className="Profile-profile-space">
                <div className="Profile-profile-img">
                  <img src={imageUrl || Default} alt="프로필 이미지" />
                </div>
              </div>
              <div className="Profile-profile-space">
                <p div className="Profile-profile-name">
                  {name}
                </p>
              </div>
              <div className="Profile-profile-space">
                <p div className="Profile-profile-description">
                  {introduce}
                </p>
              </div>
              <div className="Profile-profile-job">
                <p div className="Profile-profile-title">
                  (희망) 직무
                </p>
                <div className="Profile-profile-text-list">
                  <p div className="Profile-profile-text">
                    {job}
                  </p>
                  <p div className="Profile-profile-text">
                    {specificDuty}
                  </p>
                </div>
              </div>
              <div className="Profile-profile-stack">
                <p div className="Profile-profile-title">
                  사용 가능한 스택
                </p>
                <div className="Profile-profile-text-list-box">
                  <div className="Profile-profile-text-list">
                    {technics.map(
                      (
                        technic,
                        index // technics 표시
                      ) => (
                        <p key={index} div className="Profile-profile-text">
                          {technic}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="Profile-profile-link">
                <p div className="Profile-profile-title">
                  Link
                </p>
                <Link to={link}>
                  <p div className="Profile-profile-text">
                    {link}
                  </p>
                </Link>
              </div>
              <div className="Profile-profile-space">
                <div className="Profile-profile-chat-btn">
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
