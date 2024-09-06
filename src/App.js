import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp'; 
import MyFeed from './MyFeed';
import Main from './Main';
import Detail from './Detail';

function App() {
  const [id, setId] = useState(''); // 이메일로 변경할 예정
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: id, password: password }), // 이메일과 패스워드를 전송
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 토큰과 userId 저장
        localStorage.setItem('token', data.token); // 백엔드에서 받은 JWT 토큰을 저장
        localStorage.setItem('userId', data.userId); // 로그인된 사용자의 userId도 저장
        navigate('/myfeed'); // MyFeed 페이지로 이동
      } else {
        setError('잘못된 아이디 또는 비밀번호입니다.');
      }
    } catch (error) {
      setError('서버에 문제가 있습니다.');
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <img src="/logo.png" alt="Site Logo" className="logo" />
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="이메일"
                  value={id}
                  onChange={(e) => setId(e.target.value)} // 이메일 입력 필드로 변경
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>} 
              <button type="submit">로그인</button>
              <div className="signup-link">
                계정이 없으신가요?&ensp; <Link to="/signup" className="signup-link-text">회원가입하기</Link>
              </div>
            </form>
          </div>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/myfeed" element={<MyFeed />} /> 
      <Route path="/main" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/login" element={<App />} /> {/* 경로명 수정 */}
    </Routes>
  );
}

export default App;
