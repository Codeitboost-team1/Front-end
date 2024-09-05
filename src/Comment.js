import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ onClose,onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = () => {
        const newComment = {
            user: '사용자3',  // Adjust this as needed
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            text: commentText,
        };
        onAddComment(newComment);
        setCommentText('');
    };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="comment-modal-header">댓글 등록</h2>
        <label htmlFor="comment-modal-textarea" className="comment-label">댓글</label>
        <textarea
          id="comment-modal-textarea"
          className="comment-modal-textarea"
          value={commentText}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <button className="comment-modal--submit-btn" onClick={handleAddComment}>등록하기</button>
      </div>
    </div>
  );
};

export default Comment;
