import React, { useState } from 'react';
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import "../styles/Register.css";
import { FiAlertCircle } from "react-icons/fi";

function Register() {
  const navigate = useNavigate(); 
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idStatus, setIdStatus] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false); 

  const isFormFilled = id.length > 0 && email.length > 0 && username.length > 0 && password.length > 0;

  const checkIdAvailability = () => {
    const isAvailable = Math.random() > 0.5;
    setIsIdAvailable(isAvailable); 
    if (isAvailable) {
      setIdStatus('사용 가능한 아이디입니다.');
    } else {
      setIdStatus('중복된 아이디입니다.');
    }
  };

  const handleSubmit = () => {
  
    console.log("회원가입 두번째 페이지");
    navigate('/register2'); 
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
                <div className={`id-availability ${idStatus === '사용 가능한 아이디입니다.' ? 'id-available' : 'id-taken'}`}>
                  {idStatus === '중복된 아이디입니다.' && <FiAlertCircle className="id-status-icon" />}
                  {idStatus}
                </div>
              )}
            </div>

            <div className="input-container">
              <p className="password-label">ㅤ비밀번호<span className="required"> *필수</span></p>

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
