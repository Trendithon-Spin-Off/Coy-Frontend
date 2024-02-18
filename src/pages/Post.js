import React, { useState } from "react";
import { BsUpload } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";

import { IoIosClose } from "react-icons/io";
//리액트 부트스트랩
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/Post.css";
import Header from "../components/Header";
import DropdownPart from "../components/DropdownMenu/DropdownMenu/DropdownPart";
import DropdownPost from "../components/DropdownMenu/DropdownMenu/DropdownPost";
import Popup from "../components/Popup";

function Post() {
  // 프로젝트 세부 정보에 대한 상태 변수들
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBackground, setProjectBackground] = useState("");
  const [projectFeatures, setProjectFeatures] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [github, setGithub] = useState("");

  // 프로젝트 이미지 변경을 처리하는 함수
  const handleProjectImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProjectImage(imageFile);
    setSelectedFileName(imageFile ? imageFile.name : "");
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
  };

  // 프로젝트 멤버에 대한 상태 변수들
  const [projectMember, setProjectMember] = useState("");
  const [selectedParts, setSelectedParts] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);

  // 프로젝트 부분 선택을 처리하는 함수
  const handlePartSelect = (part) => {
    setSelectedParts((prevParts) => {
      if (prevParts.includes(part)) {
        return prevParts.filter((p) => p !== part);
      } else {
        return [...prevParts, part];
      }
    });
  };

  // 새로운 프로젝트 멤버를 추가하는 함수
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

  //엔터키 눌렀을 떄 추가 버튼이랑 똑같은 역할 수행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //엔터키 기본동작 막기
      event.preventDefault();
      handleAddMember();
    }
  };

  // 프로젝트 멤버를 제거하는 함수
  const handleRemoveMember = (index) => {
    setProjectMembers((prevMembers) =>
      prevMembers.filter((_, i) => i !== index)
    );
  };

  //등록 완료 팝업 창
  const [showPopup, setShowPopup] = useState(false);

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
        {/* 프로젝트 세부 정보 입력 폼 */}
        <div className="project-register">
          <form onSubmit={handleSubmit}>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  {/* 프로젝트 세부 정보 입력란 */}
                  <div className="text-container">
                    {/* 프로젝트 이름 입력란 */}
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
                    {/* 프로젝트 설명 입력란 */}
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
                    {/* 프로젝트 제작 배경 입력란 */}
                    <div className="input-container">
                      <label>🧾 프로젝트 제작 배경</label>
                      <textarea
                        placeholder="프로젝트를 제작하게 된 배경을 입력해주세요"
                        value={projectBackground}
                        onChange={(e) => setProjectBackground(e.target.value)}
                      />
                    </div>
                    {/* 프로젝트 주요 기능과 특징 입력란 */}
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
                  {/* 프로젝트 이미지 업로드 입력란 */}
                  <div className="image-container">
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleProjectImageChange}
                      style={{ display: "none" }} // 기본 파일 선택 UI를 숨김
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
            {/* 프로젝트 하단 입력란 */}
            <div className="project-lower-container">
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    {/* 프로젝트 배포 URL 입력란 */}
                    <div className="url-container">
                      <label>🔗 프로젝트 배포 URL</label>
                      <input
                        placeholder="프로젝트의 이름을 입력해주세요"
                        type="text"
                        value={distribution}
                        onChange={(e) => setDistribution(e.target.value)}
                      />
                    </div>
                    {/* 프로젝트 Github URL 입력란 */}
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
                    {/* 프로젝트 멤버 입력란 */}
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
                        {/* 멤버 추가 */}
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
              <button
                type="submit"
                className="submit-button"
                onClick={() => setShowPopup(true)}
              >
                등록하기
              </button>
            </div>
          </form>
          {showPopup && <Popup action="등록" />}
        </div>
      </div>
    </div>
  );
}

export default Post;
