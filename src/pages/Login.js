import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/Login.css";
import axios from 'axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8080/api'; // 백엔드 서버 주소 조정 필요

  const isFormFilled = id.length > 0 && password.length > 0;

  const handleLoginClick = async () => {
    if (!isFormFilled) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        memberId: id,
        password: password,
      });
  
      if (response.data && response.data.token) {
        console.log("로그인 성공", response.data);
        localStorage.setItem('token', response.data.token); // JWT 토큰 저장
        navigate('/home'); // 로그인 성공 후 이동할 페이지
      } else {
        // 응답에 토큰이 없는 경우 처리
        alert("로그인 실패: 응답이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패", error.response ? error.response : error);
      // 에러 메시지 개선
      const errorMessage = error.response ? (error.response.data.message || "아이디 또는 비밀번호를 확인해주세요.") : "서버 연결에 실패했습니다.";
      alert(`로그인 실패: ${errorMessage}`);
    }
  };
  

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
              <p>비밀번호</p>
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
              onClick={handleLoginClick}
              disabled={!isFormFilled}
            >
              로그인
            </button>
            <div className="divider">———————— 또는 ————————</div>
            <p className="signup-prompt">
              아직 회원이 아니신가요? 
              <span onClick={handleSignUpClick}> 회원가입 하러 가기</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
