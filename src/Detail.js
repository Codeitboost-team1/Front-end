import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';
import MemoryDelete from './MemoryDelete';

const DetailPage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
      };
    
      const handleCloseModal = () => {
        setShowDeleteModal(false);
      };
    
      const handleDeleteMemory = () => {
        setShowDeleteModal(false);
      };
    
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="DetailPage">
            <nav className="navbar">
                <Link to="/main">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
                <Link to="/myfeed">
                    <p className="navbar-myfeed">내 피드</p>
                </Link>
            </nav>
            <section className="postcontainer">
                <header className="detail-header">
                    <div className="detail-left-content">
                        <div className="detail-user-info">
                            <span>codeit</span> | <span>@codeit</span>
                        </div>
                        <h1>제목 1</h1>
                        <div className="detail-tags">
                            <span>#태그1</span>
                        </div>
                        <div className="post-details">
                            <span>장소1</span> · <span>2024-09-01</span> · <span className="likes">120</span> · <span className="comments-count">8</span>
                        </div>
                    </div>
                    <div className="detail-right-content">
                        <div className="detail-actions">
                            <button className="detail-action-btn">추억 수정하기</button>
                            <button className="detail-action-btn" onClick={handleDeleteClick}>추억 삭제하기</button>
                            {showDeleteModal && (
                                <MemoryDelete onClose={handleCloseModal} onDelete={handleDeleteMemory} />
                            )}
                        </div>
                        <button 
                            className={`detail-share-btn ${isLiked ? 'liked' : ''}`} 
                            onClick={handleLikeClick}
                        >
                            {isLiked ? '공감 완료' : '공감 보내기'}
                        </button>
                    </div>
                </header>

                <section className="post-content">
                    <img src="/_.jpeg" alt="Fishing" className="post-image" />
                    <p>
                        본문내용1<br />
                        본문내용2<br /><br />
                        본문내용3<br />
                        본문내용4<br /><br />
                        본문내용5
                    </p>
                </section>

                <section className="comments-section">
                    <h2>댓글 8</h2>
                    <hr className="comment-divider" />
                    <div className="comment">
                        <div className="comment-header">
                            <strong>사용자1</strong> <span className="comment-date">&ensp;24.09.01 21:50</span>
                        </div>
                        <p className="comment-text">댓글1</p>
                    </div>
                    <div className="comment">
                        <div className="comment-header">
                            <strong>사용자2</strong> <span className="comment-date">&ensp; 24.09.02 12:30</span>
                        </div>
                        <p className="comment-text">댓글2</p>
                    </div>
                    {/* 추가 댓글을 여기서 렌더링 */}
                </section>

                <button id="commentButton" className="comment-btn">댓글 등록하기</button>

                <div className="pagination">
                    {[1, 2, 3, 4, 5].map(page => (
                        <a 
                            key={page} 
                            href="#" 
                            className={`pagination-link ${currentPage === page ? 'active' : ''}`} 
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default DetailPage;
