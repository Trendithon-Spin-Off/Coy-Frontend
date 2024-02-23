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
import AWS from "aws-sdk";

const uploadToS3 = async (file) => {
  const s3 = new AWS.S3({
    accessKeyId: "AKIAZBAE57CCNJHI72ZY",
    secretAccessKey: "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",
    region: "ap-northeast-2",
  });

  const params = {
    Bucket: "trendithonfile",
    Key: file.name,
    Body: file,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.log("Error uploading to S3:", error);
    throw error;
  }
};

const Post = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBackground, setProjectBackground] = useState("");
  const [projectFeatures, setProjectFeatures] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [github, setGithub] = useState("");
  const [projectMember, setProjectMember] = useState("");
  const [selectedParts, setSelectedParts] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedByButton, setSubmittedByButton] = useState(false);
  const handleProjectImageChange = async (e) => {
    const imageFile = e.target.files[0];

    // 이미지 파일 업로드
    try {
      const imageUrl = await uploadToS3(imageFile);
      setProjectImage(imageUrl); // 업로드된 이미지의 URL 설정
      setSelectedFileName(imageFile ? imageFile.name : "");
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittedByButton) {
      const requestData = {
        category: category,
        projectName: projectName,
        projectDescription: projectDescription,
        projectBackground: projectBackground,
        projectFeatures: projectFeatures,
        distribution: distribution,
        github: github,
        projectImage: projectImage,
        selectedParts: projectMembers.map((member) => member.parts[0]),
        projectMembers: projectMembers.map((member) => member.member), // 멤버 정보 별도 추가
      };
      const API_BASE_URL = "https://likelion-running.store/api";

      try {
        const response = await axios.post(
          `${API_BASE_URL}/project/write`,
          requestData
        );
        console.log("요청 성공");
        console.log(response);
        setShowPopup(true);
        // 성공 시에 다음 동작 수행
      } catch (error) {
        console.error("요청 실패:", error);
      }
    }
  };

  const onClickPost = (e) => {
    e.preventDefault();
    setSubmittedByButton(true);
    handleSubmit(e);
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    navigate("/project");
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
      const newMember = {
        parts: selectedParts,
        member: projectMember,
      };
      setProjectMembers((prevMembers) => [...prevMembers, newMember]);
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
        <Container>
          <Row>
            <Col>
              <form onSubmit={handleSubmit}>
                <DropdownPost setCategory={setCategory} />
                <div className="project-register">
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col>
                        <div className="text-container">
                          <div className="input-container">
                            <label>
                              💡 프로젝트 이름
                              <span className="required">*필수</span>
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
                              placeholder="프로젝트의 한줄 소개를 입력해주세요 (최대 66byte)"
                              type="text"
                              value={projectDescription}
                              onChange={(e) =>
                                setProjectDescription(e.target.value)
                              }
                            />
                          </div>
                          <div className="input-container">
                            <label>🧾 프로젝트 제작 배경</label>
                            <textarea
                              placeholder="프로젝트를 제작하게 된 배경을 입력해주세요 (최대 66byte)"
                              value={projectBackground}
                              onChange={(e) =>
                                setProjectBackground(e.target.value)
                              }
                            />
                          </div>
                          <div className="input-container">
                            <label>🦾 프로젝트 주요 기능과 특징</label>
                            <textarea
                              placeholder="프로젝트의 주요 기능과 특징을 입력해주세요 (최대 66byte)"
                              value={projectFeatures}
                              onChange={(e) =>
                                setProjectFeatures(e.target.value)
                              }
                            />
                          </div>
                          {/* 이미지 업로드 등의 폼 컨텐츠 */}
                        </div>
                      </Col>
                      <Col md="auto"></Col>
                      <Col>
                        <div className="image-container">
                          <label htmlFor="fileInput" />
                          <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            onChange={handleProjectImageChange}
                            style={{ display: "none" }}
                          />
                          <div className="image-box">
                            <img src={projectImage} alt="Project" />
                            <button
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              <BsUpload />
                              {selectedFileName || "  브로셔/스크린샷 업로드"}
                            </button>
                            <p>최대 10MB 이내의 파일을 업로드 해주세요</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="project-lower-container">
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col>
                        <div className="url-container">
                          <label>🔗 프로젝트 배포 URL</label>
                          <input
                            placeholder="프로젝트의 배포 URL을 입력해주세요"
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
                            placeholder="프로젝트의 Github 주소를 입력해주세요"
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
                              placeholder="팀원의 아이디를 입력해주세요"
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
                            {projectMembers.map((member, index) => (
                              <div key={index} className="member">
                                <span className="member-part">
                                  {member.parts.join(", ")}{" "}
                                  {/* 파트를 문자열로 조인하여 표시 */}
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
                    onClick={onClickPost}
                  >
                    등록하기
                  </button>
                </div>
              </form>
              {showPopup && (
                <Popup action="등록" confirmAction={handlePopupConfirm} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Post;
