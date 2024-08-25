import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp'; 
import Main from './Main';

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (id === 'codeit' && password === '1234') {
      navigate('/main'); //
    } else {
      setError('잘못된 아이디 또는 비밀번호입니다.');
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
              {error && <p className="error-message">{error}</p>} {/* 오류 메시지 표시 */}
              <button type="submit">로그인</button>
              <div className="signup-link">
                계정이 없으신가요?&ensp; <Link to="/signup" className="signup-link-text">회원가입하기</Link>
              </div>
            </form>
          </div>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} /> {/* 메인 페이지 경로 추가 */}
    </Routes>
  );
}

export default App;
