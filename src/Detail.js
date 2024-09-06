import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';
import MemoryDelete from './MemoryDelete';
import Comment from './Comment';
import MemoryEdit from './MemoryEdit';  // Import the MemoryEdit component

const Detail = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);  // State for MemoryEdit modal
    const [isLiked, setIsLiked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [memoryData, setMemoryData] = useState({
        title: '제목 1',
        location: '장소1',
        date: '2024-09-01',
        tags: '#태그1',
        likes: 120,
        comments: 2
    });
    const [comments, setComments] = useState([
        { user: '사용자1', date: '24.09.01 21:50', text: '댓글1' },
        { user: '사용자2', date: '24.09.02 12:30', text: '댓글2' },
    ]);


    // Handlers for MemoryDelete modal
    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteMemory = () => {
        // Handle the memory delete action here
        setShowDeleteModal(false);
    };

    // Handlers for Comment modal
    const handleCommentClick = () => {
        setShowCommentModal(true);
    };

    const handleCloseCommentModal = () => {
        setShowCommentModal(false);
    };

    const handleAddComment = (newComment) => {
        setComments([...comments, newComment]);
        setShowCommentModal(false);
    };

    // Handlers for MemoryEdit modal
    const handleEditClick = () => {
        setShowEditModal(true);  // Open the MemoryEdit modal
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditMemory = (updatedMemory) => {
        setMemoryData(updatedMemory);  // Update memory data
        setShowEditModal(false);  // Close the MemoryEdit modal
    };

    // Like button handler
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    // Pagination handler
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
                        <h1>{memoryData.title}</h1>
                        <div className="detail-tags">
                            <span>{memoryData.tags}</span>
                        </div>
                        <div className="post-details">
                            <span>{memoryData.location}</span> · <span>{memoryData.date}</span> · <span className="likes">{memoryData.likes}</span> · <span className="comments-count">{comments.length}</span>
                        </div>
                    </div>
                    <div className="detail-right-content">
                        <div className="detail-actions">
                            <button className="detail-action-btn" onClick={handleEditClick}>추억 수정하기</button> 
                            <button className="detail-action-btn" onClick={handleDeleteClick}>추억 삭제하기</button>
                            {showDeleteModal && (
                                <MemoryDelete onClose={handleCloseDeleteModal} onDelete={handleDeleteMemory} />
                            )}
                            {showEditModal && (
                                <MemoryEdit 
                                    onClose={handleCloseEditModal} 
                                    onEdit={handleEditMemory} 
                                    initialData={memoryData}  // Pass initial data to MemoryEdit
                                />
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
                    <h2>댓글 {comments.length}</h2>
                    <hr className="comment-divider" />
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <strong>{comment.user}</strong> <span className="comment-date">&ensp;{comment.date}</span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    ))}
                </section>

                <button id="commentButton" className="comment-btn" onClick={handleCommentClick}>댓글 등록하기</button>

                {showCommentModal && (
                    <Comment onClose={handleCloseCommentModal} onAddComment={handleAddComment} />
                )}

                <div className="pagination">
                    {[1, 2, 3, 4, 5].map(page => (
                        <a 
                            key={page} 
                            href="#" 
                            className={`pagination-link ${currentPage === page ? 'active' : ''}`} 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                        >
                            {page}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Detail;
