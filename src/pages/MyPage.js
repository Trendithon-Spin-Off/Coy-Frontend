import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card_Profile_Project from "../components/Card_Profile_Project";
import { IoChevronDownOutline, IoChevronUpOutline, IoChevronForward } from "react-icons/io5";
import AWS from "aws-sdk";

import "../styles/MyPage.css";
import Upload from "../img/upload.png";
import Default from "../img/NonProfile.png";

const accessKeyId = process.env.REACT_APP_AWS_PROFILE_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_PROFILE_SECRET_ACCESS_KEY;
const region = process.env.REACT_APP_AWS_PROFILE_REGION;
const bucketName = process.env.REACT_APP_AWS_PROFILE_BUCKET_NAME;

const uploadToS3 = async (file) => {
  const s3 = new AWS.S3({
    accessKeyId: "AKIAZBAE57CCNJHI72ZY",
    secretAccessKey: "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",
    region: "ap-northeast-2",
  });

  const params = {
    Bucket: "trendithon.profile",
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

function MyPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setUserName] = useState("");
  const [job, setJob] = useState("");
  const [selectedSubJob, setSelectedSubJob] = useState("");
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isSubJobDropdownOpen, setIsSubJobDropdownOpen] = useState(false);
  const [showStackSelection, setShowStackSelection] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [introduce, setIntroduce] = useState("");
  const [link, setLink] = useState("");
  const [chatlink, setChatLink] = useState("");
  const [projects, setProjects] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [imageUrl, setProfileImage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const API_BASE_URL = "https://likelion-running.store/api";

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    const storedMemberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 memberId 가져오기
    setMemberId(storedMemberId);

    // API 호출 및 데이터 수신
    axios
      .get(`${API_BASE_URL}/information/check/my`, {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
      })
      .then((response) => {
        // API 응답 데이터를 받아와서 상태 변수에 설정
        const userData = response.data;
        setUserName(userData.name);
        setIntroduce(userData.introduce);
        setJob(userData.job);
        setSelectedSubJob(userData.specificDuty);
        setSelectedStacks(userData.technics);
        setLink(userData.link);
        setChatLink(userData.openChatting);
        setProfileImage(userData.imageUrl);
        setProjects(userData.boards);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // 오류 처리
      });
  }, []);

  const setImageFn = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = async (e) => {
    const imageFile = e.target.files[0];

    setImageFn(e);

    try {
      const imageUrl = await uploadToS3(imageFile);
      setProfileImage(imageUrl);
      setSelectedFileName(imageFile ? imageFile.name : "");
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      memberId,
      introduce,
      job,
      specificDuty: selectedSubJob,
      link,
      chatlink,
      technics: selectedStacks,
      imageUrl,
    };
    try {
      await axios.post(`${API_BASE_URL}/information/edit`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 수정 완료 후 reload
      console.log("Profile edit successful");
      window.location.reload();
    } catch (error) {
      console.error("Error editing user profile:", error);
    }
  };

  const isFormFilled = link && chatlink && imageUrl && introduce && job && selectedSubJob && selectedStacks.length > 0;

  const jobOptions = {
    프론트엔드: ["IOS", "안드로이드", "웹프론트엔드", "웹퍼블리셔"],
    백엔드: ["웹서버", "블록체인", "AI", "DB/빅데이터/DS", "게임 서버"],
    디자인: ["그래픽 디자인", "프로덕트 디자인", "3D 디자인", "모션/이펙트디자인"],
    기획: ["기획"],
  };

  const [subJobs, setSubJobs] = useState([]);

  function SelectedStacksDisplay({ selectedStacks }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);

    const handleMouseLeave = () => setShowTooltip(false);

    const displayText =
      selectedStacks.length > 3 ? (
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {selectedStacks.slice(0, 3).join(", ")} +{selectedStacks.length - 3}
        </span>
      ) : (
        selectedStacks.join(", ")
      );

    return (
      <div
        style={{
          color: "grey",
          fontSize: "14px",
          textAlign: "left",
          marginTop: "10px",
          position: "relative",
        }}
      >
        {selectedStacks.length > 0 ? displayText : "아직 선택한 스택이 없어요."}
        {showTooltip && selectedStacks.length > 3 && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "130px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "5px",
              width: "130px",
              zIndex: 1000,
            }}
          >
            {selectedStacks.slice(3).map((stack, index) => (
              <span key={index} style={{ flex: "1 0 calc(50% - 5px)", textAlign: "center" }}>
                {stack}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  const toggleStackSelection = () => {
    setShowStackSelection(!showStackSelection);
  };

  const handleStackSelect = (stack) => {
    if (!selectedStacks.includes(stack)) {
      setSelectedStacks([...selectedStacks, stack]);
    } else {
      setSelectedStacks(selectedStacks.filter((s) => s !== stack));
    }
  };

  const handleJobSelect = (selectedJob) => {
    setJob(selectedJob);
    setSubJobs(jobOptions[selectedJob] || []);
    setSelectedSubJob("");
    setIsJobDropdownOpen(false);
    setIsSubJobDropdownOpen(false);
  };

  const handleSubJobSelect = (subJob) => {
    setSelectedSubJob(subJob);
    setIsSubJobDropdownOpen(false);
  };

  const toggleJobDropdown = () => setIsJobDropdownOpen(!isJobDropdownOpen);
  const toggleSubJobDropdown = () => setIsSubJobDropdownOpen(!isSubJobDropdownOpen);

  const stackOptions = ["JavaScript", "TypeScript", "React", "Vue", "Nodejs", "Spring", "Java", "Nextjs", "Nestjs", "Express", "Go", "C", "Python", "Django", "Swift", "Kotlin", "MySQL", "MongoDB", "php", "GraphQL", "Firebase", "ReactNative", "Unity", "Flutter", "AWS", "Kubernetes", "Docker", "Git", "Figma", "Zeplin"];

  // const projectProfileCards = Array.from({ length: 10 }, (_, index) => <Card_Profile_Project key={index} />);
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
                <div className="Profile-mypage-img">
                  <label htmlFor="file" className="upload-label">
                    <img src={Upload} alt="이미지 업로드" /> 이미지 업로드
                  </label>
                  <input type="file" name="file" id="file" accept="image/*" onChange={handleProfileImageChange} />
                  <div id="file-preview">{imagePreview && <img src={imagePreview} alt="Preview" />}</div>
                  <div className="Profile-mypage-preview-img" style={{ display: imagePreview ? "none" : "block" }}>
                    <img src={imageUrl || Default} alt="프로젝트 이미지" />
                  </div>
                </div>
              </div>

              <div className="Neright-section">
                <div className="Neinput-container" style={{ marginTop: "10px", marginBottom: "0" }}>
                  <div className="Neinput-container" style={{ marginTop: "30px" }}>
                    <p style={{ marginBottom: "0px" }}>
                      이름<span className="Nerequired"> *필수</span>
                    </p>
                    <input className="Neunderline-input" style={{ width: "245px" }} type="text" placeholder="이름을 입력해주세요" value={name} readOnly />
                  </div>

                  <div className="Neinput-container" style={{ marginTop: "30px" }}>
                    <p style={{ marginBottom: "0px" }}>한줄 소개</p>
                    <input className="Neunderline-input" style={{ width: "245px" }} type="text" placeholder="한줄 소개를 입력해주세요" value={introduce} onChange={(e) => setIntroduce(e.target.value)} />
                  </div>

                  <p className="Nepassword-label" style={{ marginTop: "30px" }}>
                    (희망) 직무 선택
                  </p>
                  <div className="Neflex-container" style={{ display: "flex", justifyContent: "space-between", width: "260px" }}>
                    <div className="input-container dropdown-container job-dropdown">
                      <button className={`job-select-btn ${job ? "selected" : ""}`} style={{ width: "100%" }} onClick={toggleJobDropdown}>
                        {job || "직무 선택"}
                        {isJobDropdownOpen ? <IoChevronUpOutline className="dropdown-arrow" /> : <IoChevronDownOutline className="dropdown-arrow" />}
                      </button>
                      {isJobDropdownOpen && (
                        <ul className="dropdown-list">
                          {Object.keys(jobOptions).map((jobOption) => (
                            <li key={jobOption} onClick={() => handleJobSelect(jobOption)} className={`dropdown-item ${job === jobOption ? "selected" : ""}`}>
                              {jobOption}
                              <span className={`checkmark-circle ${job === jobOption ? "selected" : ""}`}></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="input-container dropdown-container ">
                      <button className={`job-select-btn ${selectedSubJob ? "selected" : ""}`} style={{ width: "100%" }} onClick={toggleSubJobDropdown}>
                        {selectedSubJob || "세부직무 선택"}
                        {isSubJobDropdownOpen ? <IoChevronUpOutline className="dropdown-arrow" /> : <IoChevronDownOutline className="dropdown-arrow" />}
                      </button>
                      {isSubJobDropdownOpen && (
                        <ul className="dropdown-list" style={{ width: "140%" }}>
                          {subJobs.map((subJob) => (
                            <li key={subJob} onClick={() => handleSubJobSelect(subJob)} className={`dropdown-item ${selectedSubJob === subJob ? "selected" : ""}`}>
                              {subJob}
                              <span className={`checkmark-circle ${selectedSubJob === subJob ? "selected" : ""}`}></span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="Neinput-container" style={{ marginTop: "0", width: "245px", height: "50px" }}>
                  <div className="Neflex-container" style={{ alignItems: "center", justifyContent: "space-between", display: "flex", width: "100%" }}>
                    <p className="Nepassword-label" style={{ marginBottom: 0, marginRight: "auto" }}>
                      사용 가능한 스택
                    </p>
                    <span onClick={toggleStackSelection} style={{ cursor: "pointer", color: "gray", display: "inline-flex", alignItems: "center" }}>
                      스택 선택하기 <IoChevronForward />
                    </span>
                  </div>

                  <div className="stack-section">
                    {showStackSelection && (
                      <div className="stack-dropdown-container">
                        <div className="stack-dropdown-header">스택 선택하기</div>
                        <div className="stack-dropdown-description">사용 가능한 스택을 모두 골라 주세요!</div>
                        <div className="stack-option-list" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                          {stackOptions.map((stack) => (
                            <div
                              key={stack}
                              onClick={() => handleStackSelect(stack)}
                              className={`stack-option ${selectedStacks.includes(stack) ? "selected" : ""}`}
                              style={{
                                padding: "8px 20px",
                                border: `1px solid ${selectedStacks.includes(stack) ? "rgba(67, 154, 255, 1)" : "#ccc"}`,
                                borderRadius: "20px",
                                cursor: "pointer",
                                color: selectedStacks.includes(stack) ? "rgba(67, 154, 255, 1)" : "#000",
                                backgroundColor: selectedStacks.includes(stack) ? "#fff" : "#fff",
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              {stack}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setShowStackSelection(false)} className="complete-button">
                          완료
                        </button>
                      </div>
                    )}
                    <SelectedStacksDisplay selectedStacks={selectedStacks} />
                  </div>
                </div>

                <div className="Neinput-container" style={{ marginTop: "10px" }}>
                  <p style={{ marginBottom: "0px" }}>Github</p>
                  <input className="Neunderline-input" style={{ width: "245px" }} type="text" placeholder="github.com/" value={link} onChange={(e) => setLink(e.target.value)} />
                </div>

                <div className="Neinput-container" style={{ marginTop: "10px" }}>
                  <p style={{ marginBottom: "0px", marginRight: "0" }}>오픈채팅</p>
                  <input className="Neunderline-input" style={{ width: "245px" }} type="text" placeholder="오픈채팅방 링크를 입력해주세요." value={chatlink} onChange={(e) => setChatLink(e.target.value)} />
                </div>
              </div>

              <div className="Profile-profile-space">
                <div className={`Profile-profile-modify-btn ${isFormFilled ? "active" : ""}`} onClick={handleSubmit} disabled={!isFormFilled}>
                  <p>수정하기</p>
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

export default MyPage;
