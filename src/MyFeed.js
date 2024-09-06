import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import FeedCard from './FeedCard';
import MemoryModal from './MemoryModal';
import './MyFeed.css';

function Feed() {
    const [isPublic, setIsPublic] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: '사용자 이름',
        id: '@user_id',
        feedName: '피드 이름',
        description: '이곳에 줄글 소개가 들어갑니다.',
        profilePic: '/profile.png',
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [feedCount, setFeedCount]               = useState(12);
    const [searchQuery, setSearchQuery]           = useState('');
    const [filteredFeedData, setFilteredFeedData] = useState([]);
    const [sortOption, setSortOption]             = useState('newest');
    const [feedData, setFeedData]                 = useState([]);
    
    // 게시글 조회 함수
    const fetchPosts = async () => {
      //const userId = localStorage.getItem('userId');
      try {
        const token  = localStorage.getItem('token');
          // 공개 또는 비공개 게시글을 구분하지 않고 모든 게시글을 가져오는 요청
          const response = await fetch(`http://localhost:3001/api/posts`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Include JWT for private posts
              }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
          const data = await response.json();

          const transformedData = data.map(post => ({
            id: post._id,
            title: post.title,
            tags: post.tags.join(', '),  // 배열을 문자열로 변환
            locationDate: `${post.location || '위치 정보 없음'} | ${post.date ? new Date(post.date).toISOString().split('T')[0] : '날짜 정보 없음'}`,
            likes: post.likes,
            comments: post.comments || 0,
            isPublic: post.isPublic,
            thumbnail: post.image_name || '/_.jpeg'  
          }));

          setFeedData(transformedData); // Set fetched data
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };

    useEffect(() => {
      fetchPosts();
  }, []);
    
    useEffect(() => {
        handleSearch();
    }, [feedData, searchQuery, sortOption]);

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
            e.preventDefault();
            handleSearch();
        }
    };

    const loadMoreFeeds = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/posts?offset=${feedCount}&limit=12`, { // URL 수정
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include JWT for private posts
            }
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const newPosts = await response.json();
          console.log('New posts:', newPosts); // 응답 데이터 로그
      
          if (Array.isArray(newPosts)) {
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
          } else {
            console.error('Expected an array of posts, but got:', newPosts);
          }
        } catch (error) {
          console.error('Error loading more posts:', error);
        }
      };
      


    const addNewFeedItem = (newFeedItem) => {
        setFeedData([newFeedItem, ...feedData]);
        handleSearch();
        closeModal(); // Close the modal
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
            {isModalOpen && <MemoryModal onAddNewFeedItem={addNewFeedItem} onClose={closeModal} />}  {/* Pass the close function to MemoryModal */}

            <hr className="divider" />

            <section className="feed-controls">
                <div className="feed-header">
                    <h1 className="feed-title">추억 목록</h1>
                    <button className="upload-memory-btn" onClick={() => setIsModalOpen(true)}>추억 올리기</button>
                    
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
                )) : feedData.map((feed, index) => (
                    <FeedCard key={index} {...feed} />
                ))}
            </section>
            <button className="more_btn" onClick={loadMoreFeeds}>더보기</button>
        </div>
    );
}

export default Feed;
