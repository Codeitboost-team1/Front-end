import React, { useState } from 'react';
import './Comment.css';

const Comment = ({ onClose }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Perform comment submission logic here
    console.log('Comment submitted:', comment);

    // Close the modal after submission
    onClose();
  };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="comment-modal-header">댓글 등록</h2>
        <label htmlFor="comment-modal-textarea" className="comment-label">댓글</label>
        <textarea
          id="comment-modal-textarea"
          className="comment-modal-textarea"
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <button className="comment-modal--submit-btn" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
};

export default Comment;
