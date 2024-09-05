import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryDelete.css';

const MemoryDelete = ({ onClose }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        navigate('/myfeed');
  };

  return (
    <div className="memory-delete-modal-overlay" onClick={onClose}>
      <div className="memory-delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="memory-delete-close-btn" onClick={onClose}>x</button>
        <h2>추억 삭제</h2>
        <p className="memory-delete-question">추억을 삭제하시겠어요?</p>
        <div className="modal-actions">
          <button className="memory-delete-delete-btn" onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default MemoryDelete;
