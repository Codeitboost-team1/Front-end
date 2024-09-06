import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp'; 
import MyFeed from './MyFeed';
import Main from './Main';
import Detail from './Detail';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-url/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: id, password: password }), // id를 email로 설정
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 토큰 저장
        localStorage.setItem('token', data.token); // 백엔드에서 받은 토큰을 저장
        navigate('/myfeed');
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
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
      <Route path="/login" elemet={<App />} />
    </Routes>
  );
}

export default App;
