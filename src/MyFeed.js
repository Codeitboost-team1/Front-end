import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './MyFeed.css';

function Feed() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
  };
  return (
    <div className="feed-page">
      <nav className="navbar">
        <Link to="/main"> 
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
      </nav>

      <section className="profile-section">
        <div className="profile-header">
          <img src="/profile.png" alt="Profile" className="profilepic" />
          <div className="profile-info">
            <div className="name-id">
              <p>사용자 이름</p>
              <p className="profile-id">&ensp;|&ensp;@user_id</p>
            </div>
            <div className="profile-feed">
              <p className="profile-feed-name">피드 이름</p>
              <p className="profile-stats">게시물 50 | 구독자 200</p>
            </div>
            <p className="profile-description">
              이곳에 줄글 소개가 들어갑니다. 사용자에 대한 짧은 설명이나 소개 글을 여기에 추가합니다.
            </p>
          </div>
          <div className="profile-actions">
            <div className="profile-edit">
              <a href="#" className="edit-profile-link">프로필 수정</a>
              <Link to="/"> <p className="logout-link">&ensp;로그아웃</p></Link>
            </div>
            <button 
              className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={handleSubscribeClick}
            >
              {isSubscribed ? '구독중' : '구독하기'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feed;
