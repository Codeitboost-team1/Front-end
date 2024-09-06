import React, { useState } from 'react';
import './MemoryModal.css';

const MemoryModal = ({ onAddNewFeedItem, onClose }) => {
  const [fileName, setFileName] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const addTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim()) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // localStorage에서 userId 가져오기

    const newFeedItem = {
      title,
      content,
      image_name: fileName,
      location,
      date,
      tags,
      userId  // userId를 본문에 포함
    };

    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // JWT 토큰을 헤더에 추가
        },
        body: JSON.stringify(newFeedItem)
      });

      const data = await response.json();
      if (response.ok) {
        onAddNewFeedItem(data.post);  // 성공 시 처리
        onClose();
      } else {
        console.error(data.message);  // 서버 에러 처리
      }
    } catch (error) {
      console.error("Error posting data:", error);  // 네트워크 에러 처리
    }
  };

  return (
    <div className="memory-modal-overlay">
        <div className="memory-modal-content">
            <div className="memory-modal-header">
                <h1>추억 올리기</h1>
                <button className="memory-modal-close-btn" onClick={onClose}>x</button>
            </div>
            <form className="memory-form">
                <div className="form-left">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="제목을 입력해 주세요"
                        className="input-box"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="image">이미지</label>
                    <div className="image-input">
                        <input
                            type="text"
                            id="file-name"
                            value={fileName}
                            placeholder="파일을 선택해 주세요"
                            readOnly
                            className="image-box"
                        />
                        <label htmlFor="image-upload" className="file-select-btn">파일 선택</label>
                        <input
                            type="file"
                            id="image-upload"
                            className="file-input"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>

                    <label htmlFor="location">장소</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="장소를 입력해 주세요"
                        className="input-box"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <label htmlFor="content">본문</label>
                    <textarea
                        id="content"
                        placeholder="본문 내용을 입력해 주세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-right">
                    <label htmlFor="tags">태그</label>
                    <input
                        type="text"
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="태그를 입력해 주세요"
                        className="input-box"
                        onKeyDown={addTag}
                    />
                    <div className="tag-list">
                        {tags.map((tag, index) => (
                            <span key={index}>
                                #{tag}
                                <span className="remove-tag" onClick={() => removeTag(tag)}>x</span>
                            </span>
                        ))}
                    </div>

                    <label htmlFor="date">추억의 순간</label>
                    <input
                        type="date"
                        id="date"
                        placeholder="YYYY-MM-DD"
                        className="input-box"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </form>
            <button type="button" className="submit-btn" onClick={handleSubmit}>올리기</button>
        </div>
    </div>
);
};

export default MemoryModal;
