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

function Post() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBackground, setProjectBackground] = useState("");
  const [projectFeatures, setProjectFeatures] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [github, setGithub] = useState("");

  const handleProjectImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProjectImage(imageFile);
    setSelectedFileName(imageFile ? imageFile.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출의 기본 동작 방지
  };

  const [projectMember, setProjectMember] = useState("");
  const [selectedParts, setSelectedParts] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);

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
        { parts: selectedParts, member: projectMember }, // categories를 parts로 변경
      ]);
      setProjectMember("");
      setSelectedParts([]);
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
        {/*상단입력*/}
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
            {/*하단 입력 */}
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
                        />

                        <button
                          className="add-member"
                          onClick={handleAddMember}
                        >
                          추가
                        </button>
                      </div>
                      <div>
                        {/*멤버 추가 */}
                        {projectMembers.map((member, index) => (
                          <div key={index} className="member">
                            <span>{member.parts.join(", ")}</span>{" "}
                            <span>{member.member}</span>
                            <button onClick={() => handleRemoveMember(index)}>
                              <IoIosClose />
                            </button>{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="submit-container">
              <button type="submit" className="submit-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
