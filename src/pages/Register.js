import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import "../styles/Register.css";
import { FiAlertCircle } from "react-icons/fi";
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState(''); 
  const [password, setPassword] = useState('');
  const [idStatus, setIdStatus] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false);

  const API_BASE_URL = 'http://localhost:8080/api';

  const isFormFilled = userName.length > 0 && email.length > 0 && memberId.length > 0 && password.length > 0;

  const checkIdAvailability = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/memberId/check`, {
        memberId: memberId
      });
      setIsIdAvailable(response.data);
      setIdStatus(response.data ? '사용 가능한 아이디입니다.' : '중복된 아이디입니다.');
    } catch (error) {
      console.error("중복 확인 실패", error);
      setIdStatus('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!isFormFilled) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (!isIdAvailable) {
      alert('아이디 중복을 확인해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/sign-up`, {
        memberId,
        email,
        name: userName,
        password
      });
      if (response.data) {
        console.log("회원가입 성공");
        navigate('/register2', { state: { id: memberId } });
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
      <div className="Nelogin-container">
        <div className="Neleft-section">
          <h1>반가워요!</h1>
          <p>프로젝트 뒤 숨겨진 당신의 가치를</p>
          <p>보여줄 준비가 되셨나요?</p>
        </div>
        <div className="Neright-section">
          <div className="Nelogin-box">
            <h2>회원가입</h2>
            <p>회원가입을 통해 더 많은 서비스를 이용해 보세요!</p>

            <div className="Neinput-container">
            <p>이름<span className="Nerequired"> *필수</span></p>
              <input
                className="Neunderline-input"
                type="text"
                placeholder="이름을 입력해주세요"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="Neinput-container">
              <p>이메일<span className="Nerequired"> *필수</span></p>
              <input
                className="Neunderline-input"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="Neinput-container Neid-container">
              <p>아이디<span className="Nerequired"> *필수</span></p>
              <div className="Neid-input-group">
                <input
                  className="Neunderline-input Neid-input"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
                <button 
                  onClick={checkIdAvailability} 
                  className={`Necheck-id ${isIdAvailable ? 'Neid-available-btn' : ''}`}
                >
                  중복확인
                </button>
              </div>
              {idStatus && (
                <div className={`Neid-availability ${isIdAvailable ? 'Neid-available' : 'Neid-taken'}`}>
                  {idStatus === '중복된 아이디입니다.' && <FiAlertCircle className="Neid-status-icon" />}
                  {idStatus}
                </div>
              )}
            </div>

            <div className="Neinput-container">
              <p className="Nepassword-label">비밀번호<span className="Nerequired"> *필수</span></p>
              <input
                className="Neunderline-input"
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
