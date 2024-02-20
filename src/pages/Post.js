import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Post.css";
import Header from "../components/Header";
import DropdownPart from "../components/DropdownMenu/DropdownMenu/DropdownPart";
import DropdownPost from "../components/DropdownMenu/DropdownMenu/DropdownPost";
import Popup from "../components/Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBackground, setProjectBackground] = useState("");
  const [projectFeatures, setProjectFeatures] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [github, setGithub] = useState("");
  const [projectMember, setProjectMember] = useState("");
  const [selectedParts, setSelectedParts] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleProjectImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProjectImage(imageFile);
    setSelectedFileName(imageFile ? imageFile.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // form 데이터 생성
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectDescription", projectDescription);
    formData.append("projectBackground", projectBackground);
    formData.append("projectFeatures", projectFeatures);
    formData.append("projectImage", projectImage);
    formData.append("distribution", distribution);
    formData.append("github", github);
    formData.append("projectMembers", JSON.stringify(projectMembers)); // JSON 형태로 변환하여 추가

    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post("http://localhost:3000/post", formData);

      // 성공적으로 요청을 보낸 경우 팝업 표시
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      // 오류 처리 로직 추가
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate("/project"); // '/project' 경로로 이동
  };

  const handlePartSelect = (part) => {
    setSelectedParts((prevParts) => {
      if (prevParts.includes(part)) {
        return prevParts.filter((p) => p !== part);
      } else {
        return [...prevParts, part];
      }
    });
  };

  const handleAddMember = () => {
    if (projectMember.trim() !== "") {
      setProjectMembers((prevMembers) => [
        ...prevMembers,
        { parts: selectedParts, member: projectMember },
      ]);
      setProjectMember("");
      setSelectedParts([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddMember();
    }
  };

  const handleRemoveMember = (index) => {
    setProjectMembers((prevMembers) =>
      prevMembers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="page">
      <Header />
      <div className="content">
        <Container className="dropdown-post">
          <Row>
            <Col>
              <DropdownPost />
            </Col>
          </Row>
        </Container>
        <div className="project-register">
          <form onSubmit={handleSubmit}>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <div className="text-container">
                    <div className="input-container">
                      <label>
                        💡 프로젝트 이름<span className="required">*필수</span>
                      </label>
                      <input
                        placeholder="프로젝트의 이름을 입력해주세요"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>
                        ✍🏻 프로젝트 한줄 소개
                        <span className="required">*필수</span>
                      </label>
                      <input
                        placeholder="프로젝트의 한줄 소개를 입력해주세요"
                        type="text"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>🧾 프로젝트 제작 배경</label>
                      <textarea
                        placeholder="프로젝트를 제작하게 된 배경을 입력해주세요"
                        value={projectBackground}
                        onChange={(e) => setProjectBackground(e.target.value)}
                      />
                    </div>
                    <div className="input-container">
                      <label>🦾 프로젝트 주요 기능과 특징</label>
                      <textarea
                        placeholder="프로젝트의 주요 기능과 특징을 입력해주세요"
                        value={projectFeatures}
                        onChange={(e) => setProjectFeatures(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col md="auto"></Col>
                <Col>
                  <div className="image-container">
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleProjectImageChange}
                      style={{ display: "none" }}
                    />
                    <div className="image-box">
                      {" "}
                      <button
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                      >
                        <BsUpload />
                        {selectedFileName || "  브로셔/스크린샷 업로드"}
                      </button>
                      <p>최대nnMB 이내의 파일을 업로드 해주세요</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="project-lower-container">
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <div className="url-container">
                      <label>🔗 프로젝트 배포 URL</label>
                      <input
                        placeholder="프로젝트의 이름을 입력해주세요"
                        type="text"
                        value={distribution}
                        onChange={(e) => setDistribution(e.target.value)}
                      />
                    </div>
                    <div className="url-container">
                      <label>
                        <IoLogoGithub />
                        프로젝트 Github
                      </label>
                      <input
                        placeholder="프로젝트의 한줄 소개를 입력해주세요"
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col md="auto"></Col>
                  <Col>
                    <div className="member-container">
                      <label>👥 함께한 팀원</label>
                      <div className="select-member">
                        <DropdownPart
                          selectedParts={selectedParts}
                          onPartSelect={handlePartSelect}
                        />
                        <input
                          placeholder="같이 진행한 팀원의 아이디를 입력해주세요"
                          type="text"
                          value={projectMember}
                          onChange={(e) => setProjectMember(e.target.value)}
                          onKeyDown={handleKeyPress}
                        />
                        <button
                          className="add-member"
                          onClick={handleAddMember}
                        >
                          추가
                        </button>
                      </div>
                      <div>
                        {projectMembers.map((member, index) => (
                          <div key={index} className="member">
                            <span className="member-part">
                              {member.parts.join(", ")}
                            </span>{" "}
                            <div className="member-id">
                              <span>{member.member}</span>
                              <button
                                className="close-button"
                                onClick={() => handleRemoveMember(index)}
                              >
                                <IoIosClose />
                              </button>{" "}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="submit-container">
              <button type="button" className="submit-button">
                등록하기
              </button>
            </div>
          </form>
          {showPopup && (
            <Popup action="등록" confirmAction={handlePopupConfirm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
