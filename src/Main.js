import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedCard from './FeedCard';
import './Main.css';

function Feed() {
  const [feedCount, setFeedCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    handleSearch(); // feedCount나 sortOption 변경 시에만 검색 실행
  }, [feedCount, sortOption]);

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
      locationDate: `장소 ${index + 1} | 2024-09-0${index + 1}`,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      isPublic: Math.random() > 0.5 // 무작위로 공개/비공개 설정
    }));

    const filteredData = feedData.filter(feed =>
      feed.title.toLowerCase().includes(searchQuery) ||
      feed.tags.toLowerCase().includes(searchQuery)
    );

    // 정렬
    const sortedData = [...filteredData].sort((a, b) => {
      switch (sortOption) {
        case 'likes':
          return b.likes - a.likes;
        case 'comments':
          return b.comments - a.comments;
        case 'newest':
        default:
          return new Date(b.locationDate) - new Date(a.locationDate);
      }
    });

    setFilteredFeedData(sortedData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      handleSearch(); // Enter 키를 누를 때만 검색 실행
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
    locationDate: `장소 ${index + 1} | 2024-09-0${index + 1}`,
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

      <section className="feed-controls">
        <div className="filter-controls">
        <input
            type="text"
            className="search-input"
            placeholder="태그 혹은 제목을 입력해주세요"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
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