import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import FeedCard from './FeedCard';
import './MyFeed.css';
import MemoryModal from './MemoryModal';

function Feed() {
  const [isPublic, setIsPublic] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profile, setProfile] = useState({
    name: '사용자 이름',
    id: '@user_id',
    feedName: '피드 이름',
    description: '이곳에 줄글 소개가 들어갑니다.',
    profilePic: '/profile.png',
  });

  const [feedCount, setFeedCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    handleSearch(); // 초기 로딩 시 검색을 통해 데이터 필터링
  }, [feedCount, sortOption]);

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handlePrivacyChange = (privacy) => {
    setIsPublic(privacy === 'public');
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleFilterChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const feedData = Array.from({ length: feedCount }, (_, index) => ({
      thumbnail: '/_.jpeg',
      name: `사용자 ${index + 1}`,
      id: `user_${index + 1}`,
      title: `제목 ${index + 1}`,
      tags: `#태그${index + 1}`,
      location: `장소 ${index + 1}`,
      date: `2024-09-0${index + 1}`,  // 날짜를 별도의 필드로 분리
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      isPublic: Math.random() > 0.5 // 무작위로 공개/비공개 설정
    }));

    const filteredData = feedData.filter(feed =>
      feed.title.toLowerCase().includes(searchQuery) || 
      feed.tags.toLowerCase().includes(searchQuery)
    );

    const sortedData = [...filteredData].sort((a, b) => {
      switch (sortOption) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredFeedData(sortedData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      handleSearch();
    }
  };

  const loadMoreFeeds = () => {
    setFeedCount(feedCount + 12);
  };

  // 초기 피드 데이터
  const initialFeedData = Array.from({ length: feedCount }, (_, index) => ({
    thumbnail: '/_.jpeg',
    name: `사용자 ${index + 1}`,
    id: `user_${index + 1}`,
    title: `제목 ${index + 1}`,
    tags: `#태그${index + 1}`,
    location: `장소 ${index + 1}`,
    date: `2024-09-0${index + 1}`,  // 날짜를 별도의 필드로 분리
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    isPublic: Math.random() > 0.5 // 무작위로 공개/비공개 설정
  }));

  return (
    <div className="feed-page">
      <nav className="navbar">
        <Link to="/main">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/myfeed">
          <p className="navbar-myfeed">내 피드</p>
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
      {isUploading && <MemoryModal MemoryModal={MemoryModal} onClose={() => setIsUploading(false)} />}

      <hr className="divider" />

      <section className="feed-controls">
        <div className="feed-header">
          <h1 className="feed-title">추억 목록</h1>
          <button className="upload-memory-btn" onClick={() => setIsUploading(true)}>추억 올리기</button>
        </div>
        <div className="filter-controls">
          <div className="privacy-options">
            <button
              className={`privacy-btn ${isPublic ? 'selected' : ''}`}
              onClick={() => handlePrivacyChange('public')}
            >
              공개
            </button>
            <button
              className={`privacy-btn ${!isPublic ? 'selected' : ''}`}
              onClick={() => handlePrivacyChange('private')}
            >
              비공개
            </button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="태그 혹은 제목을 입력해주세요"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <select className="filter-select" onChange={handleFilterChange} value={sortOption}>
            <option value="newest">최신순</option>
            <option value="likes">공감순</option>
            <option value="comments">댓글순</option>
          </select>
        </div>
      </section>

      <section className="feed-grid">
        {filteredFeedData.length > 0 ? filteredFeedData.map((feed, index) => (
          <FeedCard key={index} {...feed} />
        )) : initialFeedData.map((feed, index) => (
          <FeedCard key={index} {...feed} />
        ))}
      </section>
      <button className="more_btn" onClick={loadMoreFeeds}>더보기</button>
    </div>
  );
}

export default Feed;
