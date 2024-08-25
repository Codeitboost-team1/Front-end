import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React 18에서는 `createRoot` 메서드를 사용하여 ReactDOM을 생성합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// App 컴포넌트를 Router로 감싸서 라우팅 기능을 추가합니다.
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// 성능 측정 또는 기타 로그를 위한 설정
reportWebVitals();
