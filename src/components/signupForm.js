import React, { useState, useEffect } from 'react';
import './signupForm.css';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [email, setEmail] = useState('');  // 이메일 상태 추가
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [memoryBoxName, setMemoryBoxName] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const navigate = useNavigate();

  const handleUsernameCheck = () => {
    setIsUsernameChecked(true);
    if (username === "codeit123") {
      setUsernameMessage("이미 사용중인 아이디입니다.");
    } else {
      setUsernameMessage("사용가능한 아이디입니다.");
    }
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMessage('');
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,          // 이메일 추가
      username,
      password,
      name,
      memoryBoxName,
    };

    try {
      const response = await fetch('http://localhost:3001/api/register', {  // 백엔드 URL을 localhost:3001로 설정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setFormSuccessMessage('회원가입이 성공적으로 완료되었습니다!');
      navigate('/');  // 회원가입 성공 후 리다이렉트
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container">
      <img src="/logo.png" alt="logo" className="logo" />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="아이디">아이디</label>
          <div className="input-with-button">
            <input
              type="text"
              id="아이디"
              name="아이디"
              placeholder="아이디를 입력해 주세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="button" className="check-btn" onClick={handleUsernameCheck}>
              중복 확인
            </button>
          </div>
          {isUsernameChecked && usernameMessage && (
            <p className={username === "codeit123" ? "error" : "success"}>{usernameMessage}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="비밀번호">비밀번호</label>
          <input
            type="password"
            id="비밀번호"
            name="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="비밀번호확인">비밀번호 재확인</label>
          <input
            type="password"
            id="비밀번호확인"
            name="비밀번호확인"
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMessage && <p className="error">{passwordMessage}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="이름">이름</label>
          <input
            type="text"
            id="이름"
            name="이름"
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="추억보관소이름">추억보관소 이름</label>
          <input
            type="text"
            id="추억보관소이름"
            name="추억보관소이름"
            placeholder="추억보관소 이름을 입력해 주세요"
            value={memoryBoxName}
            onChange={(e) => setMemoryBoxName(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">가입하기</button>
      </form>

      {formSuccessMessage && <p className="success">{formSuccessMessage}</p>}
    </div>
  );
}

export default SignupForm;
