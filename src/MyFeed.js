import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import './MyFeed.css';

function Feed() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '사용자 이름',
    id: '@user_id',
    feedName: '피드 이름',
    description: '이곳에 줄글 소개가 들어갑니다.',
    profilePic: '/profile.png'
  });

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false); // 모달 닫기
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
          <img src={profile.profilePic} alt="Profile" className="profilepic" />
          <div className="profile-info">
            <div className="name-id">
              <p>codeit</p>
              <p className="profile-id">&ensp;|&ensp;@codeit</p>
            </div>
            <div className="profile-feed">
              <p className="profile-feed-name">{profile.feedName}</p>
              <p className="profile-stats">게시물 50 | 구독자 200</p>
            </div>
            <p className="profile-description">
              {profile.description}
            </p>
          </div>
          <div className="profile-actions">
            <div className="profile-edit">
              <a href="#" className="edit-profile-link" onClick={() => setIsEditing(true)}>프로필 수정</a>
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

      {isEditing && <ProfileEdit profile={profile} onClose={() => setIsEditing(false)} onProfileUpdate={handleProfileUpdate} />}
    </div>
  );
}

export default Feed;
