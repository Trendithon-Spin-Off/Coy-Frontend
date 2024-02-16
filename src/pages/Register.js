import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/Register.css";
import { FiAlertCircle } from "react-icons/fi";
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [id, setId] = useState(''); // 사용자 이름
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // 사용자 아이디
  const [password, setPassword] = useState('');
  const [idStatus, setIdStatus] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const API_BASE_URL = 'http://localhost:8080/api'; // 백엔드 서버 주소 조정 필요

  const isFormFilled = id.length > 0 && email.length > 0 && username.length > 0 && password.length > 0;

  const checkIdAvailability = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/memberId/check`, {
        memberId: username
      });
      setIsIdAvailable(response.data);
      setIdStatus(response.data ? '사용 가능한 아이디입니다.' : '중복된 아이디입니다.');
    } catch (error) {
      console.error("중복 확인 실패", error);
      setIdStatus('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!isIdAvailable) {
      alert('아이디 중복을 확인해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/sign-up`, {
        memberId: username,
        email: email,
        name: id, // 이름
        password: password
      });
      if (response.data) {
        console.log("회원가입 성공");
        navigate('/register2'); // 회원가입 성공 후 이동할 페이지
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error("회원가입 실패", error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
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
            <h2>회원가입</h2>
            <p>회원가입을 통해 더 많은 서비스를 이용해 보세요!</p>

            <div className="input-container">
              <p>이름<span className="required"> *필수</span></p>
              <input
                className="underline-input"
                type="text"
                placeholder="이름을 입력해주세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p>이메일<span className="required"> *필수</span></p>
              <input
                className="underline-input"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-container id-container">
              <p>아이디<span className="required"> *필수</span></p>
              <div className="id-input-group">
                <input
                  className="underline-input id-input"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button 
                  onClick={checkIdAvailability} 
                  className={`check-id ${isIdAvailable ? 'id-available-btn' : ''}`}
                >
                  중복확인
                </button>
              </div>
              {idStatus && (
                <div className={`id-availability ${isIdAvailable ? 'id-available' : 'id-taken'}`}>
                  {idStatus === '중복된 아이디입니다.' && <FiAlertCircle className="id-status-icon" />}
                  {idStatus}
                </div>
              )}
            </div>

            <div className="input-container">
              <p className="password-label">비밀번호<span className="required"> *필수</span></p>
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
              onClick={handleSubmit} 
              disabled={!isFormFilled}
            >
              입력완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
