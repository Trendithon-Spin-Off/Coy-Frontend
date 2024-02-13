import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/Login.css";

function Login() { 
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const isFormFilled = id.length > 0 && password.length > 0;

  const handleSignUpClick = () => {
    navigate('/Register'); 
  };

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
            <h2>로그인</h2>
            <p>간편 로그인을 통해 더 많은 서비스를 이용해 보세요!</p>
            
            <div className="input-container">
              <p>아이디</p>
              <input
                className="underline-input"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p>ㅤ비밀번호</p>
              <input
                className="underline-input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              className={`login-button ${isFormFilled ? 'active' : ''}`}
              type="button"
              onClick={() => console.log("로그인 시도")}
              disabled={!isFormFilled}
            >
              로그인
            </button>
            <div className="divider">———————— 또는  ———————— </div>
            <p className="signup-prompt">
              아직 회원이 아니신가요? 
              <span onClick={handleSignUpClick}>ㅤ회원가입 하러 가기</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
