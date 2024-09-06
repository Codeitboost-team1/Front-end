import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedCard from './FeedCard';
import './Main.css';

function Feed() {
  const [feedCount, setFeedCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedData, setFilteredFeedData] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 데이터를 불러옴
  }, []);

  useEffect(() => {
    handleSearch(); // feedCount 나 sortOption 변경 시에만 검색 실행
  }, [feedCount, sortOption, feedData, searchQuery]);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/posts`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // JWT 포함
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const transformedData = data.map(post => ({
        id: post._id,
        title: post.title,
        tags: post.tags.join(', '),
        locationDate: `${post.location || '위치 정보 없음'} | ${post.date ? new Date(post.date).toISOString().split('T')[0] : '날짜 정보 없음'}`,
        likes: post.likes,
        comments: post.comments || 0,
        isPublic: post.isPublic,
        thumbnail: post.image_name || '/_.jpeg'
      }));

      setFeedData(transformedData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
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
          return new Date(b.locationDate) - new Date(a.locationDate);
      }
    });

    setFilteredFeedData(sortedData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const loadMoreFeeds = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts?offset=${feedCount}&limit=12`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT 포함
        }
      });

      const newPosts = await response.json();

      const transformedNewPosts = newPosts.map(post => ({
        id: post._id,
        title: post.title,
        tags: post.tags.join(', '),
        locationDate: `${post.location || '위치 정보 없음'} | ${post.date ? new Date(post.date).toISOString().split('T')[0] : '날짜 정보 없음'}`,
        likes: post.likes,
        comments: post.comments || 0,
        isPublic: post.isPublic,
        thumbnail: post.image_name || '/_.jpeg'
      }));

      setFeedData(prevFeedData => [...prevFeedData, ...transformedNewPosts]);
      setFeedCount(prevCount => prevCount + 12);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

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
          <select className="filter-select" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="newest">최신순</option>
            <option value="likes">공감순</option>
            <option value="comments">댓글순</option>
          </select>
        </div>
      </section>

      <section className="feed-grid">
        {filteredFeedData.length > 0 ? filteredFeedData.map((feed, index) => (
          <FeedCard key={index} {...feed} />
        )) : feedData.map((feed, index) => (
          <FeedCard key={index} {...feed} />
        ))}
      </section>
      <button className="more_btn" onClick={loadMoreFeeds}>더보기</button>
    </div>
  );
}

export default Feed;
