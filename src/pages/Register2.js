import React, { useState } from 'react';
import Header from "../components/Header";
import "../styles/Register2.css";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

function Register2() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedSubJob, setSelectedSubJob] = useState('');
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [isSubJobDropdownOpen, setIsSubJobDropdownOpen] = useState(false);
  const [showStackSelection, setShowStackSelection] = useState(false);
  const [selectedStacks, setSelectedStacks] = useState([]);

  const isFormFilled = id && password && selectedJob && selectedSubJob;
  
  
  const jobOptions = {
    "프론트엔드": ["IOS", "안드로이드", "웹프론트엔드", "웹퍼블리셔"],
    "백엔드": ["웹서버", "블록체인", "AI", "DB/빅데이터/DS", "게임 서버"],
    "디자인": ["그래픽 디자인", "프로덕트 디자인", "3D 디자인", "모션/이펙트 디자인"],
    "기획" : ["기획"]
  };
  const [subJobs, setSubJobs] = useState([]);

  function SelectedStacksDisplay({ selectedStacks }) {
    const [showTooltip, setShowTooltip] = useState(false);
  
    const handleMouseEnter = () => setShowTooltip(true);
  
    const handleMouseLeave = () => setShowTooltip(false);
  
    const displayText = selectedStacks.length > 3
      ? (
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {selectedStacks.slice(0, 3).join(', ')} +{selectedStacks.length - 3}
        </span>
      ) : selectedStacks.join(', ');
  
    return (
      <div style={{ 
        color: 'grey', 
        fontSize: '14px', 
        textAlign: 'left', 
        marginTop: '10px',
        marginLeft: '15px', 
        position: 'relative' 
      }}>
        {selectedStacks.length > 0 ? displayText : "아직 선택한 스택이 없어요."}
        {showTooltip && selectedStacks.length > 3 && (
  <div style={{
    position: 'absolute',
    top: '20px',
    right: '130px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '5px',
    borderRadius: '5px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    gap: '5px',
    width: '130px',
    zIndex: 1000,
  }}>
    {selectedStacks.slice(3).map((stack, index) => (
      <span key={index} style={{ flex: '1 0 calc(50% - 5px)', textAlign: 'center' }}>{stack}</span>
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
      setSelectedStacks(selectedStacks.filter(s => s !== stack));
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSubJobs(jobOptions[job] || []);
    setSelectedSubJob('');
    setIsJobDropdownOpen(false);
    setIsSubJobDropdownOpen(false); 
  };

  const handleSubJobSelect = (subJob) => {
    setSelectedSubJob(subJob);
    setIsSubJobDropdownOpen(false);
  };
  
  const toggleJobDropdown = () => setIsJobDropdownOpen(!isJobDropdownOpen);
  const toggleSubJobDropdown = () => setIsSubJobDropdownOpen(!isSubJobDropdownOpen);

  const stackOptions = ["JavaScript", "TypeScript", "React", "Vue", "Nodejs","Spring", "Java", "Nextjs", "Nestjs", "Express", "Go", "C", "Python", "Django", "Swift", "Kotlin", "MySQL", "MongoDB", "php", "GraphQL", "Firebase", "ReactNative", "nity", "Flutter", "AWS", "Kubermnets", "Docker", "Git", "Figma", "Zeplin"]; 

  return (
    <div className="page">
      <Header />
      <div className="login-container">
        <div className="left-section">
          <h1>반가워요!</h1>
          <p>프로젝트 뒤 숨겨진 당신의 가치를</p>
          <p>보여줄 준비가 되셨나요?</p>
        </div>
        <div className="right-section">
          <div className="login-box">
            <h2>추가 정보 입력</h2>
            <p>추가 정보를 입력하면 더 많은 기회를 얻을 수 있어요.</p>
            
            <div className="input-container">
              <p>한줄 소개</p>
              <input
                className="underline-input"
                type="text"
                placeholder="한줄 소개를 입력해주세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="input-container">
              <p className="password-label">ㅤ(희망) 직무 선택</p>
            <div className="flex-container">
  <div className="input-container dropdown-container job-dropdown">
    <button className={`job-select-btn ${selectedJob ? 'selected' : ''}`} onClick={toggleJobDropdown}>
      {selectedJob || "직무 선택"}
      {isJobDropdownOpen ? <IoChevronUpOutline className="dropdown-arrow" /> : <IoChevronDownOutline className="dropdown-arrow" />}
    </button>
        {isJobDropdownOpen && (
          <ul className="dropdown-list">
            {Object.keys(jobOptions).map((job) => (
              <li 
                key={job} 
                onClick={() => handleJobSelect(job)} 
                className={`dropdown-item ${selectedJob === job ? 'selected' : ''}`}
              >
                {job}
                <span className={`checkmark-circle ${selectedJob === job ? 'selected' : ''}`}></span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="input-container dropdown-container">
        <button className={`job-select-btn ${selectedSubJob ? 'selected' : ''}`} onClick={toggleSubJobDropdown}>
          {selectedSubJob || "세부직무 선택"}
          {isSubJobDropdownOpen ? <IoChevronUpOutline className="dropdown-arrow" /> : <IoChevronDownOutline className="dropdown-arrow" />}
        </button>
        {isSubJobDropdownOpen && (
          <ul className="dropdown-list">
            {subJobs.map((subJob) => (
              <li 
                key={subJob} 
                onClick={() => handleSubJobSelect(subJob)} 
                className={`dropdown-item ${selectedSubJob === subJob ? 'selected' : ''}`}
              >
                {subJob}
                <span className={`checkmark-circle ${selectedSubJob === subJob ? 'selected' : ''}`}></span>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>


      <div className="input-container" style={{ marginTop: '-10px' }}>
  <div className="flex-container" style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex', width: '100%' }}>
    <p className="password-label" style={{ marginBottom: 0, marginRight: 'auto' }}>ㅤ사용 가능한 스택</p>
    <span onClick={toggleStackSelection} style={{ cursor: 'pointer', color: 'gray', display: 'inline-flex', alignItems: 'center' }}>
      스택 선택하기 <IoChevronForward />
    </span>
  </div>
  
  <div className="stack-section">
    {showStackSelection && (
      <div className="stack-dropdown-container">
        <div className="stack-dropdown-header">스택 선택하기</div>
        <div className="stack-dropdown-description">사용 가능한 스택을 모두 골라 주세요!</div>
        <div className="stack-option-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
  {stackOptions.map((stack) => (
    <div 
      key={stack} 
      onClick={() => handleStackSelect(stack)}
      className={`stack-option ${selectedStacks.includes(stack) ? 'selected' : ''}`}
      style={{
        padding: '8px 20px',
        border: `1px solid ${selectedStacks.includes(stack) ? 'rgba(67, 154, 255, 1)' : '#ccc'}`,
        borderRadius: '20px',
        cursor: 'pointer',
        color: selectedStacks.includes(stack) ? 'rgba(67, 154, 255, 1)' : '#000',
        backgroundColor: selectedStacks.includes(stack) ? '#fff' : '#fff',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
            <div className="input-container">
              <p>Linkㅤㅤ</p>
              <input
                className="underline-input"
                type="text"
                placeholder="github.com/"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              className={`login-button ${isFormFilled ? 'active' : ''}`}
              type="button"
              onClick={() => console.log("회원가입 시도")}
              disabled={!isFormFilled}
            >
              입력완료
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register2;