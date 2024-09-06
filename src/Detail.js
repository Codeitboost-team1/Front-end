import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported
import './Detail.css';
import MemoryDelete from './MemoryDelete';
import Comment from './Comment';
import MemoryEdit from './MemoryEdit';

const Detail = () => {
    const { id } = useParams();  // Get post ID from URL
    const [post, setPost] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setPost(response.data.post);
                setComments(response.data.post.comments || []);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [id]);

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
        // Handle the memory edit action here
        setShowEditModal(false);
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
                {post && (
                    <>
                        <header className="detail-header">
                            <div className="detail-left-content">
                                <div className="detail-user-info">
                                    <span>{post.username}</span> | <span>@{post.userHandle}</span>
                                </div>
                                <h1>{post.title}</h1>
                                <div className="detail-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag}>#{tag}</span>
                                    ))}
                                </div>
                                <div className="post-details">
                                    <span>{post.location}</span> · <span>{new Date(post.date).toLocaleDateString()}</span> · <span className="likes">{post.likes}</span> · <span className="comments-count">{comments.length}</span>
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
                                        <MemoryEdit onClose={handleCloseEditModal} onEdit={handleEditMemory} /> 
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
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.content}</p>
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
                    </>
                )}
            </section>
        </div>
    );
}

export default Detail;
